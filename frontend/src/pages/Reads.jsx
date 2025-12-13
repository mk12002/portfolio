import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBook, FaFileAlt, FaStar, FaExternalLinkAlt, FaBookOpen, FaChevronDown, FaFilter } from 'react-icons/fa'
import GlowCard from '../components/GlowCard'
import { useReads } from '../hooks/useApi'

function StarRating({ rating }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          className={star <= rating ? 'text-yellow-400' : 'text-gray-600'}
          size={14}
        />
      ))}
    </div>
  )
}

function BookCard({ book, index }) {
  const [isExpanded, setIsExpanded] = useState(false)

  if (!book) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <GlowCard glowColor="vision" className="cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-start gap-4">
          <motion.div
            className="w-12 h-16 rounded-lg bg-gradient-to-br from-vision/30 to-vision/10 flex items-center justify-center flex-shrink-0"
            whileHover={{ rotateY: 15 }}
          >
            <FaBook className="text-vision text-xl" />
          </motion.div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-lg leading-tight">{book.title || 'Untitled'}</h3>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                className="text-gray-400 flex-shrink-0"
              >
                <FaChevronDown />
              </motion.div>
            </div>
            
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
              {book.rating && <StarRating rating={book.rating} />}
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && book.notes && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-4 pt-4 border-t border-white/10"
            >
              <p className="text-gray-300 text-sm">{book.notes}</p>
            </motion.div>
          )}
        </AnimatePresence>
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

  // BULLETPROOF: Ensure books and papers are always arrays
  const books = Array.isArray(data?.books) ? data.books : []
  const papers = Array.isArray(data?.papers) ? data.papers : []

  // Extract unique categories for books (SAFE VERSION)
  const bookCategories = useMemo(() => {
    if (!Array.isArray(books) || books.length === 0) return ["All"]

    const categories = books
      .map(b => (typeof b?.category === "string" ? b.category.trim() : null))
      .filter(Boolean)

    return ["All", ...new Set(categories)].sort((a, b) =>
      a.localeCompare(b)
    )
  }, [books])

  // Filter books by category (SAFE VERSION)
  const filteredBooks = useMemo(() => {
    if (!Array.isArray(books)) return []
    if (books.length === 0) return []
    if (selectedCategory === 'All') return books
    return books.filter(book => 
      typeof book?.category === "string" &&
      book.category.trim() === selectedCategory
    )
  }, [books, selectedCategory])

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

        {activeTab === 'books' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <FaFilter className="text-gray-500" />
              {bookCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-vision/20 text-vision border border-vision/50'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + selectedCategory}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid gap-6"
          >
            {activeTab === 'books' ? (
              filteredBooks && filteredBooks.length > 0 ? (
                filteredBooks.map((book, i) => (
                  <BookCard key={`book-${i}-${book?.title}`} book={book} index={i} />
                ))
              ) : (
                <div className="text-center py-20">
                  <p className="text-gray-500">
                    {selectedCategory !== 'All' 
                      ? `No books found in ${selectedCategory} category.`
                      : 'No books added yet.'
                    }
                  </p>
                </div>
              )
            ) : (
              papers && papers.length > 0 ? (
                papers.map((paper, i) => (
                  <PaperCard key={`paper-${i}-${paper?.title}`} paper={paper} index={i} />
                ))
              ) : (
                <div className="text-center py-20">
                  <p className="text-gray-500">No papers added yet.</p>
                </div>
              )
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
