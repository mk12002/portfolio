import { Helmet } from 'react-helmet-async'

export default function SEO({ 
  title = "Mohit Kumar | ML Systems Engineer",
  description = "ML Systems Engineer specializing in Computer Vision, NLP, Multi-Agent Systems, and Legal AI. Expertise in PyTorch, Transformers, GNN, and production ML systems.",
  keywords = "Machine Learning, ML Engineer, Computer Vision, NLP, PyTorch, Transformers, AI, Neural Networks, Deep Learning, Legal AI, Multi-Agent Systems",
  ogImage = "/assets/profile.jpg",
  pathname = "/"
}) {
  const siteUrl = "https://mohitkumar-mu.vercel.app"
  const canonicalUrl = `${siteUrl}${pathname}`
  const resolvedOgImage = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="Mohit Kumar Portfolio" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={resolvedOgImage} />
      <meta property="og:image:secure_url" content={resolvedOgImage} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:alt" content="Mohit Kumar profile photo" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={resolvedOgImage} />
      <meta name="twitter:image:alt" content="Mohit Kumar profile photo" />
      
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
