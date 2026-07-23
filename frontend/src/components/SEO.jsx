import { Helmet } from 'react-helmet-async'

const MIME = { png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', webp: 'image/webp', svg: 'image/svg+xml' }

export default function SEO({
  title = "Mohit Kumar | Cybersecurity & AI Engineer",
  description = "Cybersecurity & AI Engineer at ITC Infotech — building AI-native defense systems: multi-agentic email security, VAPT, SOC operations, and open-source security tooling. Deep ML background in PyTorch, Transformers, and GNN.",
  keywords = "Cybersecurity Engineer, AI Engineer, Security Engineer, AI for Security, Security for AI, VAPT, SOC Operations, Adversarial ML, Threat Detection, Multi-Agent Systems, PyTorch, Mohit Kumar",
  ogImage = "/og-image.png",
  pathname = "/"
}) {
  const siteUrl = "https://mohitkumar-mu.vercel.app"
  const canonicalUrl = `${siteUrl}${pathname}`
  const resolvedOgImage = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`
  const ext = resolvedOgImage.split('.').pop().split('?')[0].toLowerCase()
  const ogImageType = MIME[ext] || 'image/png'
  // Only the default share card is a known 1200x630; per-project screenshots
  // have arbitrary dimensions, so don't declare a size we can't guarantee.
  const isDefaultCard = resolvedOgImage.endsWith('/og-image.png')

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Mohit Kumar" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="Mohit Kumar Portfolio" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={resolvedOgImage} />
      <meta property="og:image:secure_url" content={resolvedOgImage} />
      <meta property="og:image:type" content={ogImageType} />
      {isDefaultCard && <meta property="og:image:width" content="1200" />}
      {isDefaultCard && <meta property="og:image:height" content="630" />}
      <meta property="og:image:alt" content={title} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@mohitkr111" />
      <meta name="twitter:creator" content="@mohitkr111" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={resolvedOgImage} />
      <meta name="twitter:image:alt" content={title} />

      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Mohit Kumar",
          "url": siteUrl,
          "image": `${siteUrl}/og-image.png`,
          "jobTitle": "Cybersecurity & AI Engineer",
          "description": description,
          "worksFor": {
            "@type": "Organization",
            "name": "ITC Infotech"
          },
          "alumniOf": {
            "@type": "CollegeOrUniversity",
            "name": "VIT Chennai"
          },
          "knowsAbout": [
            "Cybersecurity",
            "AI for Security",
            "Security for AI",
            "VAPT",
            "SOC Operations",
            "Threat Detection",
            "Adversarial Machine Learning",
            "Multi-Agent Systems",
            "AI Supply Chain Security",
            "Post-Quantum Cryptography",
            "Machine Learning",
            "PyTorch",
            "Deep Learning"
          ],
          "sameAs": [
            "https://github.com/mk12002",
            "https://www.linkedin.com/in/mohitkumar111/",
            "https://x.com/mohitkr111",
            "https://dev.to/mohit_kumar1",
            "https://www.instagram.com/mohit__kr_/"
          ]
        })}
      </script>
    </Helmet>
  )
}
