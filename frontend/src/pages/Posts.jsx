import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaArrowRight, FaClock, FaCalendar } from 'react-icons/fa'
import GlowCard from '../components/GlowCard'
import SEO from '../components/SEO'
import { usePosts } from '../hooks/useApi'

const categories = ['All', 'AI Architecture', 'Multi-Agent Systems', 'Computer Vision', 'NLP']

const categoryColors = {
  'AI Architecture': 'reasoning',
  'Multi-Agent Systems': 'vision',
  'Computer Vision': 'vision',
  'NLP': 'audio'
}

export default function Posts() {
  const { data, loading } = usePosts()
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredPosts = selectedCategory === 'All' 
    ? data?.posts || []
    : data?.posts?.filter(post => post.category === selectedCategory) || []

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

  return (
    <>
      <SEO 
        title="Blog & Posts | Mohit Kumar - ML & AI Technical Insights"
        description="Technical blog posts on ML systems, hybrid AI, multi-agent systems, computer vision, and NLP. Deep dives into real-world AI implementations."
        keywords="ML Blog, AI Blog, Machine Learning Articles, Computer Vision Blog, NLP Articles, Multi-Agent Systems, Technical Writing"
        pathname="/posts"
      />
      <div className="min-h-screen pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Blog & <span className="gradient-text">Insights</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Deep dives into ML systems, hybrid AI, and real-world implementations
            </p>
          </motion.div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-reasoning text-white shadow-lg shadow-reasoning/25'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {cat}
              </motion.button>
            ))}
          </div>

          {/* Blog Posts Grid or Coming Soon */}
          {filteredPosts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="max-w-2xl mx-auto">
                <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-vision/20 via-reasoning/20 to-audio/20 rounded-full flex items-center justify-center">
                  <span className="text-6xl">✍️</span>
                </div>
                <h2 className="text-3xl font-bold mb-4">
                  <span className="gradient-text">Coming Soon</span>
                </h2>
                <p className="text-gray-400 text-lg mb-2">
                  Technical blog posts and insights are on the way!
                </p>
                <p className="text-gray-500">
                  I'm currently working on in-depth articles about ML systems, hybrid AI architectures, and real-world implementations.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              layout
            >
              {filteredPosts.map((post, i) => (
                <GlowCard
                  key={post.slug}
                  glowColor={categoryColors[post.category] || 'mixed'}
                  delay={i * 0.1}
                  className="flex flex-col h-full"
                >
                  {/* Post Image Placeholder */}
                  <div className="w-full h-48 bg-gradient-to-br from-vision/20 via-reasoning/20 to-audio/20 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-6xl opacity-30">📝</span>
                  </div>

                  {/* Category & Date */}
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium bg-${categoryColors[post.category] || 'reasoning'}/20 text-${categoryColors[post.category] || 'reasoning'}`}>
                      {post.category}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <FaCalendar size={10} />
                      {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>

                  {/* Title & Excerpt */}
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 flex-grow">{post.excerpt}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags?.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-white/5 rounded text-xs text-gray-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Read Time & Link */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <FaClock size={12} />
                      {post.readTime}
                    </div>
                    <Link
                      to={`/posts/${post.slug}`}
                      className="inline-flex items-center gap-2 text-vision hover:text-white transition-colors text-sm"
                    >
                      Read More <FaArrowRight size={12} />
                    </Link>
                  </div>
                </GlowCard>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </>
  )
}
