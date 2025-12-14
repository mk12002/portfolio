import { Helmet } from 'react-helmet-async'

export default function SEO({ 
  title = "Mohit Kumar | ML Systems Engineer",
  description = "ML Systems Engineer specializing in Computer Vision, NLP, Multi-Agent Systems, and Legal AI. Expertise in PyTorch, Transformers, GNN, and production ML systems.",
  keywords = "Machine Learning, ML Engineer, Computer Vision, NLP, PyTorch, Transformers, AI, Neural Networks, Deep Learning, Legal AI, Multi-Agent Systems",
  ogImage = "/og-image.png",
  pathname = "/"
}) {
  const siteUrl = "https://mohitkumar-mu.vercel.app"
  const canonicalUrl = `${siteUrl}${pathname}`

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      
      {/* Twitter */}
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={`${siteUrl}${ogImage}`} />
      
      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Mohit Kumar",
          "url": siteUrl,
          "jobTitle": "ML Systems Engineer",
          "description": description,
          "knowsAbout": [
            "Machine Learning",
            "Computer Vision",
            "Natural Language Processing",
            "PyTorch",
            "Deep Learning",
            "Neural Networks",
            "Multi-Agent Systems",
            "Legal AI"
          ],
          "sameAs": [
            "https://github.com/mk12002",
            "https://www.linkedin.com/in/mohitkumar111/"
          ]
        })}
      </script>
    </Helmet>
  )
}
