import { motion } from 'framer-motion'
import { FaMicrosoft, FaAws, FaCode, FaCloud, FaLightbulb, FaExternalLinkAlt, FaCalendarAlt, FaCertificate } from 'react-icons/fa'
import { SiOracle } from 'react-icons/si'
import { useCertificates } from '../hooks/useApi'

const categoryIcons = {
  Cloud: FaCloud,
  Programming: FaCode,
  Design: FaLightbulb,
  Innovation: FaLightbulb
}

const issuerIcons = {
  Microsoft: FaMicrosoft,
  Oracle: SiOracle,
  AWS: FaAws
}

const categoryColors = {
  Cloud: 'vision',
  Programming: 'reasoning',
  Design: 'audio',
  Innovation: 'audio'
}

export default function Certificates() {
  const { data, loading } = useCertificates()
  const certificates = data?.certificates || []

  const grouped = certificates.reduce((acc, cert) => {
    const cat = cert.category || 'Other'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(cert)
    return acc
  }, {})

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="w-16 h-16 border-4 border-vision border-t-transparent rounded-full animate-spin" />
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Certifications</span>
          </h1>
          <p className="text-gray-400">Professional certifications in cloud, AI, and software development</p>
        </motion.div>

        {Object.entries(grouped).map(([category, certs], catIndex) => {
          const CategoryIcon = categoryIcons[category] || FaCode
          const color = categoryColors[category] || 'vision'

          return (
            <motion.section
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.1 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <CategoryIcon className={`text-${color}`} />
                {category}
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {certs.map((cert, i) => {
                  const IssuerIcon = issuerIcons[cert.issuer] || FaCode
                  
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="group"
                    >
                      <div className={`
                        relative p-6 rounded-xl
                        bg-gradient-to-br from-${color}/10 to-transparent
                        border border-white/10 hover:border-${color}/50
                        transition-all duration-300
                        h-full flex flex-col
                      `}>
                        <div className="flex items-start justify-between mb-4">
                          <IssuerIcon className={`text-4xl text-${color}`} />
                          {cert.link && (
                            <a
                              href={cert.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`text-${color} hover:scale-110 transition-transform`}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <FaExternalLinkAlt size={16} />
                            </a>
                          )}
                        </div>

                        <h3 className="font-semibold text-lg mb-2">{cert.name}</h3>
                        <p className="text-sm text-gray-500 mb-3">{cert.issuer}</p>
                        
                        {cert.description && (
                          <p className="text-sm text-gray-400 mb-4 flex-grow">{cert.description}</p>
                        )}

                        <div className="space-y-2 text-sm">
                          {cert.credentialId && (
                            <div className="flex items-center gap-2 text-gray-400">
                              <FaCertificate className={`text-${color}`} size={14} />
                              <span className="text-xs">ID: {cert.credentialId}</span>
                            </div>
                          )}
                          {cert.certificationNumber && (
                            <div className="flex items-center gap-2 text-gray-400">
                              <FaCertificate className={`text-${color}`} size={14} />
                              <span className="text-xs">Cert #: {cert.certificationNumber}</span>
                            </div>
                          )}
                          {cert.earnedDate && (
                            <div className="flex items-center gap-2 text-gray-400">
                              <FaCalendarAlt className={`text-${color}`} size={14} />
                              <span className="text-xs">Earned: {cert.earnedDate}</span>
                            </div>
                          )}
                          {cert.expiryDate && (
                            <div className="flex items-center gap-2 text-gray-400">
                              <FaCalendarAlt className={`text-${color}`} size={14} />
                              <span className="text-xs">Expires: {cert.expiryDate}</span>
                            </div>
                          )}
                        </div>

                        <div className={`
                          absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20
                          bg-gradient-to-r from-${color} to-transparent
                          blur-xl transition-opacity duration-300 pointer-events-none
                        `} />
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.section>
          )
        })}
      </div>
    </div>
  )
}
