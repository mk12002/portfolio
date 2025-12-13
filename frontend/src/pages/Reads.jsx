import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { FaBook, FaFileAlt, FaExternalLinkAlt, FaBookOpen, FaFilter } from 'react-icons/fa'
import GlowCard from '../components/GlowCard'
import { useReads } from '../hooks/useApi'

function BookCard({ book, index }) {
  if (!book) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <GlowCard glowColor="vision">
        <div className="flex items-start gap-4">
          <motion.div
            className="w-12 h-16 rounded-lg bg-gradient-to-br from-vision/30 to-vision/10 flex items-center justify-center flex-shrink-0"
            whileHover={{ rotateY: 15 }}
          >
            <FaBook className="text-vision text-xl" />
          </motion.div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg leading-tight">{book.title || 'Untitled'}</h3>
            <p className="text-gray-400 text-sm mt-1">{book.author || 'Unknown Author'}</p>
            
            <div className="flex items-center gap-4 mt-2 flex-wrap">
              <span className="px-2 py-1 rounded-full bg-vision/20 text-vision text-xs">
                {book.category}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                book.status === 'completed' 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-audio/20 text-audio'
              }`}>
                {book.status === 'completed' ? 'Completed' : 'Reading'}
              </span>
            </div>
          </div>
        </div>
      </GlowCard>
    </motion.div>
  )
}

function PaperCard({ paper, index }) {
  if (!paper) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <GlowCard glowColor="reasoning">
        <div className="flex items-start gap-4">
          <motion.div
            className="w-12 h-12 rounded-lg bg-gradient-to-br from-reasoning/30 to-reasoning/10 flex items-center justify-center flex-shrink-0"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <FaFileAlt className="text-reasoning text-xl" />
          </motion.div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold leading-tight">{paper.title || 'Untitled Paper'}</h3>
            <p className="text-gray-400 text-sm mt-1">
              {paper.authors || 'Unknown'} ({paper.year || 'N/A'})
            </p>
            
            <div className="flex items-center gap-3 mt-2 flex-wrap">
              <span className="px-2 py-1 rounded-full bg-reasoning/20 text-reasoning text-xs">
                {paper.category}
              </span>
              <span className="text-xs text-gray-500">{paper.venue}</span>
            </div>
            
            {paper.notes && (
              <p className="text-gray-400 text-sm mt-3">{paper.notes}</p>
            )}
            
            {paper.link && (
              <a
                href={paper.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-3 text-sm text-reasoning hover:text-vision transition-colors"
              >
                Read Paper <FaExternalLinkAlt size={12} />
              </a>
            )}
          </div>
        </div>
      </GlowCard>
    </motion.div>
  )
}

export default function Reads() {
  const { data, loading, error } = useReads()
  const [activeTab, setActiveTab] = useState('books')
  const [selectedCategory, setSelectedCategory] = useState('All')

  // Ensure books and papers are always arrays
  const books = Array.isArray(data?.books) ? data.books : []
  const papers = Array.isArray(data?.papers) ? data.papers : []

  // Extract unique categories from books
  const bookCategories = useMemo(() => {
    if (!books.length) return ['All']
    const cats = books
      .map(b => b?.category)
      .filter(Boolean)
    return ['All', ...Array.from(new Set(cats))]
  }, [books])

  // Filter books by selected category
  const filteredBooks = useMemo(() => {
    if (!books.length) return []
    if (selectedCategory === 'All') return books
    return books.filter(book => book?.category === selectedCategory)
  }, [books, selectedCategory])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <motion.div
          className="w-16 h-16 border-4 border-vision border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <p className="text-red-400 mb-4">Error loading reads data</p>
          <p className="text-gray-500 text-sm">{error.message}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="inline-block mb-6"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-vision to-reasoning flex items-center justify-center mx-auto">
              <FaBookOpen className="text-4xl text-white" />
            </div>
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="gradient-text">Reading List</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Books and research papers that have shaped my understanding of machine learning, 
            software engineering, and building intelligent systems.
          </p>
        </motion.div>

        <div className="flex justify-center gap-4 mb-8">
          {[
            { id: 'books', label: 'Books', icon: FaBook, count: books.length },
            { id: 'papers', label: 'Research Papers', icon: FaFileAlt, count: papers.length }
          ].map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id)
                setSelectedCategory('All')
              }}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-vision to-reasoning text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <tab.icon />
              {tab.label}
              <span className="px-2 py-0.5 rounded-full bg-white/20 text-xs">
                {tab.count}
              </span>
            </motion.button>
          ))}
        </div>

        {activeTab === 'books' && bookCategories.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <FaFilter className="text-gray-500" />
              {bookCategories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-vision/20 text-vision border border-vision/50'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        <div className="grid gap-6">
          {activeTab === 'books' ? (
            filteredBooks.length > 0 ? (
              filteredBooks.map((book, i) => (
                <BookCard key={`book-${i}-${book?.title}`} book={book} index={i} />
              ))
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-500">
                  {selectedCategory === 'All' 
                    ? 'No books added yet.'
                    : `No books found in "${selectedCategory}" category.`
                  }
                </p>
              </div>
            )
          ) : (
            papers.length > 0 ? (
              papers.map((paper, i) => (
                <PaperCard key={`paper-${i}-${paper?.title}`} paper={paper} index={i} />
              ))
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-500">No papers added yet.</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}
