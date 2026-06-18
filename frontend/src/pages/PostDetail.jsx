import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { FaArrowLeft, FaCalendar, FaClock } from 'react-icons/fa'
import SEO from '../components/SEO'
import { getPost } from '../data/postsData'

const mdComponents = {
  h2: ({ children }) => <h2 className="text-2xl font-bold mt-10 mb-3 text-text">{children}</h2>,
  h3: ({ children }) => <h3 className="text-xl font-semibold mt-8 mb-2 text-text">{children}</h3>,
  p: ({ children }) => <p className="text-gray-300 leading-relaxed mb-4">{children}</p>,
  ul: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-1.5 text-gray-300">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-1.5 text-gray-300">{children}</ol>,
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  a: ({ href, children }) => {
    const internal = href?.startsWith('/')
    return internal ? (
      <Link to={href} className="text-accent hover:underline">{children}</Link>
    ) : (
      <a href={href} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">{children}</a>
    )
  },
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-accent pl-4 my-5 text-gray-400 italic">{children}</blockquote>
  ),
  code: ({ inline, children }) =>
    inline ? (
      <code className="px-1.5 py-0.5 rounded bg-white/10 text-accent font-mono text-[0.85em]">{children}</code>
    ) : (
      <code className="block bg-[#0d1117] border border-white/10 rounded-lg p-4 my-5 overflow-x-auto font-mono text-sm text-emerald-300">{children}</code>
    ),
  strong: ({ children }) => <strong className="text-text font-semibold">{children}</strong>,
}

export default function PostDetail() {
  const { slug } = useParams()
  const post = getPost(slug)

  if (!post) {
    return (
      <div className="min-h-screen pt-28 px-4 text-center">
        <p className="text-gray-400 mb-4">Post not found.</p>
        <Link to="/posts" className="text-accent hover:underline">← Back to all posts</Link>
      </div>
    )
  }

  // Externally-hosted post reached directly — send the reader to the source.
  if (post.url && !post.content) {
    return (
      <div className="min-h-screen pt-28 px-4 text-center max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-3">{post.title}</h1>
        <p className="text-gray-400 mb-6">{post.excerpt}</p>
        <a href={post.url} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-vision to-reasoning text-primary rounded-lg font-semibold">
          Read the full article ↗
        </a>
        <div className="mt-6">
          <Link to="/posts" className="text-accent hover:underline text-sm">← Back to all posts</Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <SEO
        title={`${post.title} | Mohit Kumar`}
        description={post.excerpt}
        keywords={post.tags?.join(', ')}
        pathname={`/posts/${post.slug}`}
      />
      <article className="min-h-screen pt-28 pb-20 px-4">
        <div className="max-w-2xl mx-auto">
          <Link to="/posts" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-accent transition-colors mb-8">
            <FaArrowLeft size={12} /> All posts
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-3 leading-tight">{post.title}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-8 pb-8 border-b border-white/10">
              <span className="flex items-center gap-1.5"><FaCalendar size={12} />
                {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              {post.readTime && <span className="flex items-center gap-1.5"><FaClock size={12} /> {post.readTime}</span>}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
              {post.content}
            </ReactMarkdown>

            <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-white/10">
              {post.tags?.map((t) => (
                <span key={t} className="px-2.5 py-1 bg-white/5 rounded-md text-xs text-gray-400 border border-white/5">{t}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </article>
    </>
  )
}
