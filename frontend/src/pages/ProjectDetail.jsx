import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaArrowLeft, FaCode, FaChartLine, FaLightbulb, FaCogs, FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import GlowCard from '../components/GlowCard'
import TableBlock from '../components/TableBlock'
import { useProjects } from '../hooks/useApi'

export default function ProjectDetail() {
  const { slug } = useParams()
  const { data, loading } = useProjects()

  const project = data?.projects?.find(p => p.slug === slug)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="w-16 h-16 border-4 border-vision border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20">
        <h1 className="text-2xl font-bold mb-4">Project not found</h1>
        <Link to="/projects" className="text-vision hover:underline">
          Back to Projects
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
          >
            <FaArrowLeft /> Back to Projects
          </Link>

          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-reasoning/20 text-reasoning">
                {project.category}
              </span>
              {project.type && (
                <span className="px-3 py-1 rounded-full text-sm bg-white/10 text-gray-400">
                  {project.type}
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{project.title}</h1>
            <p className="text-xl text-gray-400 mb-4">{project.tagline}</p>
            
            {/* External Links */}
            <div className="flex gap-3 flex-wrap">
              {project.publicationUrl && (
                <motion.a
                  href={project.publicationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-lg hover:border-purple-500/60 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaExternalLinkAlt /> Read Article
                </motion.a>
              )}
              {project.githubUrl && (
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaGithub /> View on GitHub
                </motion.a>
              )}
              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-vision to-reasoning rounded-lg hover:opacity-90 transition-opacity"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaExternalLinkAlt /> Live Demo
                </motion.a>
              )}
            </div>
          </div>

          {project.metric && (
            <GlowCard glowColor="vision" className="mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text mb-2">{project.metric}</div>
                {project.precision && (
                  <div className="text-lg text-gray-400">Precision: {project.precision}</div>
                )}
              </div>
            </GlowCard>
          )}

          <GlowCard glowColor="mixed" className="mb-8">
            <article className="prose prose-invert prose-lg max-w-none">
              {/* Overview Section */}
              <section className="mb-10">
                <h2 className="text-3xl font-bold mb-6 text-white border-b border-vision/30 pb-3">
                  Overview
                </h2>
                <p className="text-gray-300 leading-relaxed text-base mb-4">
                  {project.description}
                </p>
                {project.overview && (
                  <p className="text-gray-300 leading-relaxed text-base">
                    {project.overview}
                  </p>
                )}
                {project.homepageUI && (
                  <div className="mt-8 p-6 bg-dark-900/50 rounded-lg border border-white/20">
                    <img 
                      src={project.homepageUI.src} 
                      alt={project.homepageUI.alt}
                      className="w-full h-auto rounded-lg"
                    />
                    <p className="text-center text-sm text-gray-400 mt-4 italic">
                      {project.homepageUI.caption}
                    </p>
                  </div>
                )}
                {project.systemArchitectureDiagram && (
                  <div className="mt-8 p-6 bg-dark-900/50 rounded-lg border border-white/20">
                    <img 
                      src={project.systemArchitectureDiagram.src} 
                      alt={project.systemArchitectureDiagram.alt}
                      className="w-full h-auto rounded-lg"
                    />
                    <p className="text-center text-sm text-gray-400 mt-4 italic">
                      {project.systemArchitectureDiagram.caption}
                    </p>
                  </div>
                )}
                {project.systemWorkflowDiagram && (
                  <div className="mt-8 p-6 bg-dark-900/50 rounded-lg border border-white/20">
                    <img 
                      src={project.systemWorkflowDiagram.src} 
                      alt={project.systemWorkflowDiagram.alt}
                      className="w-full h-auto rounded-lg"
                    />
                    <p className="text-center text-sm text-gray-400 mt-4 italic">
                      {project.systemWorkflowDiagram.caption}
                    </p>
                  </div>
                )}
              </section>

              {/* Problem Statement */}
              <section className="mb-10">
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-white border-b border-audio/30 pb-3">
                  <FaLightbulb className="text-audio" /> Problem Statement
                </h2>
                <p className="text-gray-300 leading-relaxed text-base">
                  {project.problem || project.description}
                </p>
              </section>

              {/* Motivation & Background */}
              {project.motivation && (
                <section className="mb-10">
                  <h2 className="text-3xl font-bold mb-6 text-white border-b border-reasoning/30 pb-3">
                    Motivation & Background
                  </h2>
                  <div className="text-gray-300 leading-relaxed text-base space-y-4">
                    {typeof project.motivation === 'string' ? (
                      <p>{project.motivation}</p>
                    ) : Array.isArray(project.motivation) ? (
                      project.motivation.map((para, i) => <p key={i}>{para}</p>)
                    ) : null}
                  </div>
                  {project.backboneArchitectureDiagram && (
                    <div className="mt-8 p-6 bg-dark-900/50 rounded-lg border border-white/20">
                      <img 
                        src={project.backboneArchitectureDiagram.src} 
                        alt={project.backboneArchitectureDiagram.alt}
                        className="w-full h-auto rounded-lg"
                      />
                      <p className="text-center text-sm text-gray-400 mt-4 italic">
                        {project.backboneArchitectureDiagram.caption}
                      </p>
                    </div>
                  )}
                </section>
              )}

              {/* Key Metrics */}
              {(project.keyMetrics || project.performanceMetrics) && (
                <section className="mb-10">
                  <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-white border-b border-vision/30 pb-3">
                    <FaChartLine className="text-vision" /> Key Metrics
                  </h2>
                  {Array.isArray(project.keyMetrics) && project.keyMetrics.length > 0 && (
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      {project.keyMetrics.map((metric, i) => (
                        <div key={i} className="p-4 bg-white/5 rounded-lg border border-white/10">
                          <div className="text-sm text-gray-400 mb-1">{metric.name}</div>
                          <div className="text-2xl font-bold gradient-text">{metric.value}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  {project.metricsDescription && (
                    <p className="text-gray-300 leading-relaxed text-base">
                      {project.metricsDescription}
                    </p>
                  )}
                  {project.metricsTablePlaceholder && (
                    <div className="mt-6 p-6 bg-amber-500/10 border-2 border-amber-500/30 rounded-lg">
                      <h4 className="text-lg font-semibold text-amber-400 mb-2">
                        {project.metricsTablePlaceholder.label}
                      </h4>
                      <p className="text-sm text-gray-400 italic mb-3">
                        {project.metricsTablePlaceholder.caption}
                      </p>
                      <div className="p-4 bg-dark-900/50 border border-dashed border-amber-500/20 rounded text-center">
                        <p className="text-amber-300 font-mono text-sm">
                          📊 {project.metricsTablePlaceholder.note}
                        </p>
                      </div>
                    </div>
                  )}
                </section>
              )}

              {/* Approach & Methodology */}
              {project.approach && (
                <section className="mb-10">
                  <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-white border-b border-audio/30 pb-3">
                    <FaCogs className="text-audio" /> Approach & Methodology
                  </h2>
                  <div className="text-gray-300 leading-relaxed text-base space-y-4">
                    {typeof project.approach === 'string' ? (
                      <p>{project.approach}</p>
                    ) : typeof project.approach === 'object' && project.approach.description ? (
                      <>
                        <p className="mb-4">{project.approach.description}</p>
                        {Array.isArray(project.approach.steps) && project.approach.steps.length > 0 && (
                          <div className="mt-6 space-y-3">
                            {project.approach.steps.map((step, i) => (
                              <div key={i} className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-8 h-8 bg-audio/20 rounded-full flex items-center justify-center text-audio font-bold text-sm">
                                  {i + 1}
                                </span>
                                <p className="text-gray-300 pt-1">{step}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    ) : Array.isArray(project.approach) ? (
                      project.approach.map((para, i) => <p key={i}>{para}</p>)
                    ) : null}
                  </div>
                  {Array.isArray(project.approachSteps) && project.approachSteps.length > 0 && (
                    <div className="mt-6 space-y-4">
                      {project.approachSteps.map((step, i) => (
                        typeof step === 'string' ? (
                          <div key={i} className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-8 h-8 bg-reasoning/20 rounded-full flex items-center justify-center text-reasoning font-bold text-sm">
                              {i + 1}
                            </span>
                            <p className="text-gray-300 pt-1">{step}</p>
                          </div>
                        ) : (
                          <div key={i} className="p-6 bg-white/5 rounded-lg border-l-4 border-reasoning">
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0 w-10 h-10 bg-reasoning/20 rounded-full flex items-center justify-center text-reasoning font-bold">
                                {step.step || i + 1}
                              </div>
                              <div>
                                <h4 className="font-semibold text-reasoning mb-2">{step.name}</h4>
                                <p className="text-gray-400 text-sm">{step.description}</p>
                              </div>
                            </div>
                          </div>
                        )
                      ))}
                    </div>
                  )}
                  {project.researchProcessingUI && (
                    <div className="mt-8 p-6 bg-dark-900/50 rounded-lg border border-white/20">
                      <img 
                        src={project.researchProcessingUI.src} 
                        alt={project.researchProcessingUI.alt}
                        className="w-full h-auto rounded-lg"
                      />
                      <p className="text-center text-sm text-gray-400 mt-4 italic">
                        {project.researchProcessingUI.caption}
                      </p>
                    </div>
                  )}
                  {project.structuredResultsUI && (
                    <div className="mt-8 p-6 bg-dark-900/50 rounded-lg border border-white/20">
                      <img 
                        src={project.structuredResultsUI.src} 
                        alt={project.structuredResultsUI.alt}
                        className="w-full h-auto rounded-lg"
                      />
                      <p className="text-center text-sm text-gray-400 mt-4 italic">
                        {project.structuredResultsUI.caption}
                      </p>
                    </div>
                  )}
                  {project.methodologyDiagram && (
                    <div className="mt-8 p-6 bg-dark-900/50 rounded-lg border border-white/20">
                      <img 
                        src={project.methodologyDiagram.src} 
                        alt={project.methodologyDiagram.alt}
                        className="w-full h-auto rounded-lg"
                      />
                      <p className="text-center text-sm text-gray-400 mt-4 italic">
                        {project.methodologyDiagram.caption}
                      </p>
                    </div>
                  )}
                  {project.flowDiagram && (
                    <div className="mt-8 p-6 bg-dark-900/50 rounded-lg border border-white/20">
                      <img 
                        src={project.flowDiagram.src} 
                        alt={project.flowDiagram.alt}
                        className="w-full h-auto rounded-lg"
                      />
                      <p className="text-center text-sm text-gray-400 mt-4 italic">
                        {project.flowDiagram.caption}
                      </p>
                    </div>
                  )}
                </section>
              )}

              {/* System Architecture */}
              {project.architecture && (
                <section className="mb-10">
                  <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-white border-b border-reasoning/30 pb-3">
                    <FaCode className="text-reasoning" /> System Architecture
                  </h2>
                  {project.architectureDescription && (
                    <p className="text-gray-300 leading-relaxed text-base mb-6">
                      {project.architectureDescription}
                    </p>
                  )}
                  <div className="p-6 bg-dark-900/50 rounded-lg font-mono text-sm text-gray-300 overflow-x-auto border border-white/10 mb-6">
                    {Array.isArray(project.architecture) ? (
                      <div className="space-y-4">
                        {project.architecture.map((tier, i) => (
                          <div key={i} className="p-4 bg-white/5 rounded-lg border-l-4 border-reasoning">
                            <h4 className="font-semibold text-reasoning mb-2">{tier.tier}</h4>
                            <p className="text-gray-300 text-sm">{tier.description}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <pre className="whitespace-pre-wrap">{project.architecture}</pre>
                    )}
                  </div>
                  {Array.isArray(project.architectureComponents) && project.architectureComponents.length > 0 && (
                    <div className="space-y-4">
                      {project.architectureComponents.map((comp, i) => (
                        <div key={i} className="p-4 bg-white/5 rounded-lg border-l-4 border-vision">
                          <h4 className="font-semibold text-vision mb-2">{comp.name}</h4>
                          <p className="text-gray-400 text-sm">{comp.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {project.fullPipelineDiagram && (
                    <div className="mt-8 p-6 bg-dark-900/50 rounded-lg border border-white/20">
                      <img 
                        src={project.fullPipelineDiagram.src} 
                        alt={project.fullPipelineDiagram.alt}
                        className="w-full h-auto rounded-lg"
                      />
                      <p className="text-center text-sm text-gray-400 mt-4 italic">
                        {project.fullPipelineDiagram.caption}
                      </p>
                    </div>
                  )}
                  {project.architectureDiagram && (
                    <div className="mt-8 p-6 bg-dark-900/50 rounded-lg border border-white/20">
                      <img 
                        src={project.architectureDiagram.src} 
                        alt={project.architectureDiagram.alt}
                        className="w-full h-auto rounded-lg"
                      />
                      <p className="text-center text-sm text-gray-400 mt-4 italic">
                        {project.architectureDiagram.caption}
                      </p>
                    </div>
                  )}
                  {project.settingsPageUI && (
                    <div className="mt-8 p-6 bg-dark-900/50 rounded-lg border border-white/20">
                      <img 
                        src={project.settingsPageUI.src} 
                        alt={project.settingsPageUI.alt}
                        className="w-full h-auto rounded-lg"
                      />
                      <p className="text-center text-sm text-gray-400 mt-4 italic">
                        {project.settingsPageUI.caption}
                      </p>
                    </div>
                  )}
                </section>
              )}

              {/* Model Architecture */}
              {project.modelArchitecture && (
                <section className="mb-10">
                  <h2 className="text-3xl font-bold mb-6 text-white border-b border-vision/30 pb-3">
                    Model Architecture
                  </h2>
                  <div className="text-gray-300 leading-relaxed text-base space-y-4">
                    {typeof project.modelArchitecture === 'string' ? (
                      <p>{project.modelArchitecture}</p>
                    ) : Array.isArray(project.modelArchitecture) ? (
                      project.modelArchitecture.map((section, i) => (
                        <div key={i}>
                          {section.title && <h4 className="font-semibold text-vision mb-2">{section.title}</h4>}
                          <p>{section.content}</p>
                        </div>
                      ))
                    ) : null}
                    {project.modelArchitectureDiagram && (
                      <div className="mt-8 p-6 bg-dark-900/50 rounded-lg border border-white/20">
                        <img 
                          src={project.modelArchitectureDiagram.src} 
                          alt={project.modelArchitectureDiagram.alt}
                          className="w-full h-auto rounded-lg"
                        />
                        <p className="text-center text-sm text-gray-400 mt-4 italic">
                          {project.modelArchitectureDiagram.caption}
                        </p>
                      </div>
                    )}
                    {project.modelArchitectureDiagram1 && (
                      <div className="mt-8 p-6 bg-dark-900/50 rounded-lg border border-white/20">
                        <img 
                          src={project.modelArchitectureDiagram1.src} 
                          alt={project.modelArchitectureDiagram1.alt}
                          className="w-full h-auto rounded-lg"
                        />
                        <p className="text-center text-sm text-gray-400 mt-4 italic">
                          {project.modelArchitectureDiagram1.caption}
                        </p>
                      </div>
                    )}
                    {project.modelArchitectureDiagram2 && (
                      <div className="mt-8 p-6 bg-dark-900/50 rounded-lg border border-white/20">
                        <img 
                          src={project.modelArchitectureDiagram2.src} 
                          alt={project.modelArchitectureDiagram2.alt}
                          className="w-full h-auto rounded-lg"
                        />
                        <p className="text-center text-sm text-gray-400 mt-4 italic">
                          {project.modelArchitectureDiagram2.caption}
                        </p>
                      </div>
                    )}
                    {project.modelArchitectureDiagram3 && (
                      <div className="mt-8 p-6 bg-dark-900/50 rounded-lg border border-white/20">
                        <img 
                          src={project.modelArchitectureDiagram3.src} 
                          alt={project.modelArchitectureDiagram3.alt}
                          className="w-full h-auto rounded-lg"
                        />
                        <p className="text-center text-sm text-gray-400 mt-4 italic">
                          {project.modelArchitectureDiagram3.caption}
                        </p>
                      </div>
                    )}
                    {project.generatorArchitectureDiagram && (
                      <div className="mt-8 p-6 bg-dark-900/50 rounded-lg border border-white/20">
                        <img 
                          src={project.generatorArchitectureDiagram.src} 
                          alt={project.generatorArchitectureDiagram.alt}
                          className="w-full h-auto rounded-lg"
                        />
                        <p className="text-center text-sm text-gray-400 mt-4 italic">
                          {project.generatorArchitectureDiagram.caption}
                        </p>
                      </div>
                    )}
                    {project.discriminatorArchitectureDiagram && (
                      <div className="mt-8 p-6 bg-dark-900/50 rounded-lg border border-white/20">
                        <img 
                          src={project.discriminatorArchitectureDiagram.src} 
                          alt={project.discriminatorArchitectureDiagram.alt}
                          className="w-full h-auto rounded-lg"
                        />
                        <p className="text-center text-sm text-gray-400 mt-4 italic">
                          {project.discriminatorArchitectureDiagram.caption}
                        </p>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* Algorithm Details */}
              {project.algorithmDetails && (
                <section className="mb-10">
                  <h2 className="text-3xl font-bold mb-6 text-white border-b border-audio/30 pb-3">
                    Algorithm Details
                  </h2>
                  <div className="space-y-6">
                    {Array.isArray(project.algorithmDetails) && project.algorithmDetails.map((algo, i) => (
                      <div key={i} className="p-5 bg-white/5 rounded-lg border border-white/10">
                        <h4 className="font-semibold text-audio mb-3 text-lg">{algo.name}</h4>
                        <p className="text-gray-300 text-base mb-3">{algo.description}</p>
                        {Array.isArray(algo.steps) && algo.steps.length > 0 && (
                          <ol className="list-decimal list-inside space-y-2 text-gray-400 text-sm">
                            {algo.steps.map((step, j) => <li key={j}>{step}</li>)}
                          </ol>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Dataset Information */}
              {project.datasetInfo && (
                <section className="mb-10">
                  <h2 className="text-3xl font-bold mb-6 text-white border-b border-reasoning/30 pb-3">
                    Dataset Information
                  </h2>
                  <div className="text-gray-300 leading-relaxed text-base space-y-4">
                    {typeof project.datasetInfo === 'string' ? (
                      <p>{project.datasetInfo}</p>
                    ) : (
                      <>
                        {project.datasetInfo.description && <p className="mb-4">{project.datasetInfo.description}</p>}
                        {project.datasetInfo.highlights && (
                          <ul className="list-disc list-inside space-y-2 text-gray-400">
                            {project.datasetInfo.highlights.map((highlight, i) => <li key={i}>{highlight}</li>)}
                          </ul>
                        )}
                        {project.datasetInfo.details && (
                          <ul className="list-disc list-inside space-y-2 text-gray-400">
                            {project.datasetInfo.details.map((detail, i) => <li key={i}>{detail}</li>)}
                          </ul>
                        )}
                      </>
                    )}
                  </div>
                  {project.datasetExamplesFigure && (
                    <div className="mt-8 p-6 bg-dark-900/50 rounded-lg border border-white/20">
                      {project.datasetExamplesFigure.images ? (
                        <>
                          <div className="flex flex-wrap justify-center gap-4 mb-4">
                            {project.datasetExamplesFigure.images.slice(0, 3).map((img, idx) => (
                              <img 
                                key={idx}
                                src={img.src} 
                                alt={img.alt}
                                className="rounded-lg"
                                style={{ width: img.width || '32%' }}
                              />
                            ))}
                          </div>
                          {project.datasetExamplesFigure.images.length > 3 && (
                            <div className="flex flex-wrap justify-center gap-4">
                              {project.datasetExamplesFigure.images.slice(3).map((img, idx) => (
                                <img 
                                  key={idx + 3}
                                  src={img.src} 
                                  alt={img.alt}
                                  className="rounded-lg"
                                  style={{ width: img.width || '48%' }}
                                />
                              ))}
                            </div>
                          )}
                          <p className="text-center text-sm text-gray-400 mt-4 italic">
                            {project.datasetExamplesFigure.caption}
                          </p>
                        </>
                      ) : (
                        <>
                          <img 
                            src={project.datasetExamplesFigure.src} 
                            alt={project.datasetExamplesFigure.alt}
                            className="w-full h-auto rounded-lg"
                          />
                          <p className="text-center text-sm text-gray-400 mt-4 italic">
                            {project.datasetExamplesFigure.caption}
                          </p>
                        </>
                      )}
                    </div>
                  )}
                </section>
              )}

              {/* Training Process */}
              {project.trainingProcess && (
                <section className="mb-10">
                  <h2 className="text-3xl font-bold mb-6 text-white border-b border-vision/30 pb-3">
                    Training Process
                  </h2>
                  <div className="space-y-6">
                    {typeof project.trainingProcess === 'string' ? (
                      <p className="text-gray-300 leading-relaxed text-base">{project.trainingProcess}</p>
                    ) : typeof project.trainingProcess === 'object' && project.trainingProcess.description ? (
                      <>
                        <p className="text-gray-300 leading-relaxed text-base mb-4">{project.trainingProcess.description}</p>
                        {Array.isArray(project.trainingProcess.details) && project.trainingProcess.details.length > 0 && (
                          <div className="p-5 bg-white/5 rounded-lg border-l-4 border-vision">
                            <ul className="space-y-2 text-gray-300 text-base">
                              {project.trainingProcess.details.map((detail, i) => (
                                <li key={i}>• {detail}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </>
                    ) : Array.isArray(project.trainingProcess) ? (
                      project.trainingProcess.map((phase, i) => (
                        <div key={i} className="p-5 bg-white/5 rounded-lg border-l-4 border-audio">
                          <h4 className="font-semibold text-audio mb-3 text-lg">{phase.name}</h4>
                          {Array.isArray(phase.details) && phase.details.length > 0 && (
                            <ul className="space-y-2 text-gray-300 text-sm">
                              {phase.details.map((detail, j) => <li key={j}>• {detail}</li>)}
                            </ul>
                          )}
                        </div>
                      ))
                    ) : null}
                  </div>
                  {/* Training Pipeline Diagram */}
                  {project.trainingPipelineDiagram && (
                    <div className="mt-8 p-6 bg-dark-900/50 rounded-lg border border-white/20">
                      <img 
                        src={project.trainingPipelineDiagram.src} 
                        alt={project.trainingPipelineDiagram.alt}
                        className="w-full h-auto rounded-lg"
                      />
                      <p className="text-center text-sm text-gray-400 mt-4 italic">
                        {project.trainingPipelineDiagram.caption}
                      </p>
                    </div>
                  )}
                </section>
              )}

              {/* Results & Impact */}
              {project.results && (
                <section className="mb-10">
                  <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-white border-b border-audio/30 pb-3">
                    <FaChartLine className="text-audio" /> Results & Impact
                  </h2>
                  <div className="text-gray-300 leading-relaxed text-base space-y-4">
                    {typeof project.results === 'string' ? (
                      <p>{project.results}</p>
                    ) : Array.isArray(project.results) ? (
                      project.results.map((para, i) => <p key={i}>{para}</p>)
                    ) : project.results?.description ? (
                      <p>{project.results.description}</p>
                    ) : null}
                  </div>
                  {Array.isArray(project.resultsHighlights) && project.resultsHighlights.length > 0 && (
                    <div className="mt-6 grid md:grid-cols-2 gap-4">
                      {project.resultsHighlights.map((highlight, i) => (
                        <div key={i} className="p-4 bg-vision/10 rounded-lg border border-vision/30">
                          <div className="text-vision font-semibold mb-1">{highlight.label}</div>
                          <div className="text-gray-300">{highlight.value}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  {Array.isArray(project.results?.highlights) && project.results.highlights.length > 0 && (
                    <div className="mt-6 space-y-3">
                      <ul className="list-disc list-inside space-y-2 text-gray-300">
                        {project.results.highlights.map((highlight, i) => (
                          <li key={i}>{highlight}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {/* Paired Result Figure */}
                  {project.pairedResultFigure && (
                    <div className="mt-8 p-6 bg-dark-900/50 rounded-lg border border-white/20">
                      <img 
                        src={project.pairedResultFigure.src} 
                        alt={project.pairedResultFigure.alt}
                        className="w-full h-auto rounded-lg"
                      />
                      <p className="text-center text-sm text-gray-400 mt-4 italic">
                        {project.pairedResultFigure.caption}
                      </p>
                    </div>
                  )}
                  {/* Unpaired Result Figure */}
                  {project.unpairedResultFigure && (
                    <div className="mt-8 p-6 bg-dark-900/50 rounded-lg border border-white/20">
                      <img 
                        src={project.unpairedResultFigure.src} 
                        alt={project.unpairedResultFigure.alt}
                        className="w-full h-auto rounded-lg"
                      />
                      <p className="text-center text-sm text-gray-400 mt-4 italic">
                        {project.unpairedResultFigure.caption}
                      </p>
                    </div>
                  )}
                  {/* HAR-GCNN Results Table */}
                  {project.harGcnnResultsTable && (
                    <div className="mt-8 p-6 bg-green-500/10 border-2 border-green-500/30 rounded-lg">
                      <h4 className="text-lg font-semibold text-green-400 mb-4">
                        {project.harGcnnResultsTable.label}
                      </h4>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-sm">
                          <thead>
                            <tr className="border-b border-green-500/30">
                              {project.harGcnnResultsTable.columns.map((col, i) => (
                                <th key={i} className="text-left p-3 text-green-300 font-semibold">
                                  {col}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {project.harGcnnResultsTable.rows.map((row, i) => (
                              <tr key={i} className="border-b border-white/10 hover:bg-green-500/5 transition-colors">
                                <td className="p-3 text-gray-300">{row.activities}</td>
                                <td className="p-3 text-gray-300">{row.f1Score}</td>
                                <td className="p-3 text-green-400 font-semibold">{row.accuracy}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                  {/* CNN vs LSTM Comparison Table */}
                  {project.cnnLstmComparisonTable && (
                    <div className="mt-8 p-6 bg-cyan-500/10 border-2 border-cyan-500/30 rounded-lg">
                      <h4 className="text-lg font-semibold text-cyan-400 mb-4">
                        {project.cnnLstmComparisonTable.label}
                      </h4>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-sm">
                          <thead>
                            <tr className="border-b border-cyan-500/30">
                              {project.cnnLstmComparisonTable.columns.map((col, i) => (
                                <th key={i} className="text-left p-3 text-cyan-300 font-semibold">
                                  {col}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {project.cnnLstmComparisonTable.rows.map((row, i) => (
                              <tr key={i} className="border-b border-white/10 hover:bg-cyan-500/5 transition-colors">
                                <td className="p-3 text-gray-300">{row.activities}</td>
                                <td className="p-3 text-gray-300">{row.cnnF1}</td>
                                <td className="p-3 text-gray-300">{row.cnnAccuracy}</td>
                                <td className="p-3 text-gray-300">{row.lstmF1}</td>
                                <td className="p-3 text-cyan-400 font-semibold">{row.lstmAccuracy}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                  {/* All Models Comparison Table */}
                  {project.allModelsComparisonTable && (
                    <div className="mt-8 p-6 bg-purple-500/10 border-2 border-purple-500/30 rounded-lg">
                      <h4 className="text-lg font-semibold text-purple-400 mb-4">
                        {project.allModelsComparisonTable.label}
                      </h4>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-sm">
                          <thead>
                            <tr className="border-b border-purple-500/30">
                              {project.allModelsComparisonTable.columns.map((col, i) => (
                                <th key={i} className="text-left p-3 text-purple-300 font-semibold">
                                  {col}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {project.allModelsComparisonTable.rows.map((row, i) => (
                              <tr key={i} className={`border-b border-white/10 hover:bg-purple-500/5 transition-colors ${row.model === 'GCNN' ? 'bg-purple-500/10' : ''}`}>
                                <td className="p-3 text-gray-300 font-medium">{row.model}</td>
                                <td className="p-3 text-purple-400 font-semibold">{row.accuracy}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                  {project.qualitativeResultsFigure && (
                    <div className="mt-8 p-6 bg-dark-900/50 rounded-lg border border-white/20">
                      {project.qualitativeResultsFigure.images ? (
                        <div className="space-y-4">
                          {/* Top row: 2 images (60% + 35%) */}
                          <div className="flex gap-4 items-start">
                            {project.qualitativeResultsFigure.images.slice(0, 2).map((img, i) => (
                              <div key={i} style={{width: img.width}} className="flex-shrink-0">
                                <img 
                                  src={img.src} 
                                  alt={img.alt}
                                  className="w-full h-auto rounded-lg border border-white/10"
                                />
                              </div>
                            ))}
                          </div>
                          {/* Bottom row: 3 images (35% + 32% + 30%) */}
                          <div className="flex gap-4 items-start">
                            {project.qualitativeResultsFigure.images.slice(2, 5).map((img, i) => (
                              <div key={i} style={{width: img.width}} className="flex-shrink-0">
                                <img 
                                  src={img.src} 
                                  alt={img.alt}
                                  className="w-full h-auto rounded-lg border border-white/10"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <img 
                          src={project.qualitativeResultsFigure.src} 
                          alt={project.qualitativeResultsFigure.alt}
                          className="w-full h-auto rounded-lg"
                        />
                      )}
                      <p className="text-center text-sm text-gray-400 mt-4 italic">
                        {project.qualitativeResultsFigure.caption}
                      </p>
                    </div>
                  )}
                </section>
              )}

              {/* Performance Metrics */}
              {project.performanceMetrics && (
                <section className="mb-10">
                  <h2 className="text-3xl font-bold mb-6 text-white border-b border-reasoning/30 pb-3">
                    Performance Metrics
                  </h2>
                  <div className="text-gray-300 leading-relaxed text-base mb-6">
                    {project.performanceMetrics.description}
                  </div>
                  {project.performanceMetrics.evaluationTable && (
                    <div className="mb-6 p-6 bg-cyan-500/10 border-2 border-cyan-500/30 rounded-lg">
                      <h4 className="text-lg font-semibold text-cyan-400 mb-2">
                        {project.performanceMetrics.evaluationTable.label}
                      </h4>
                      <p className="text-sm text-gray-400 italic mb-4">
                        {project.performanceMetrics.evaluationTable.caption}
                      </p>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="border-b border-cyan-500/30">
                              {project.performanceMetrics.evaluationTable.columns.map((col, i) => (
                                <th key={i} className="text-left p-3 text-cyan-300 font-semibold text-sm">
                                  {col}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {project.performanceMetrics.evaluationTable.rows.map((row, i) => (
                              <tr key={i} className="border-b border-white/10 hover:bg-cyan-500/5 transition-colors">
                                <td className="p-3 text-gray-300 font-medium">{row.metric}</td>
                                <td className="p-3 text-gray-400">{row.threshold}</td>
                                <td className="p-3 text-vision font-bold text-lg">{row.result}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                  {project.performanceMetrics.metricsTable && (
                    <div className="mb-8 p-6 bg-cyan-500/10 border-2 border-cyan-500/30 rounded-lg">
                      <h4 className="text-lg font-semibold text-cyan-400 mb-4">
                        Performance Metrics
                      </h4>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-sm">
                          <thead>
                            <tr className="border-b border-cyan-500/30">
                              <th className="text-left p-3 text-cyan-300 font-semibold">Metric</th>
                              <th className="text-left p-3 text-cyan-300 font-semibold">Value</th>
                              <th className="text-left p-3 text-cyan-300 font-semibold">Notes</th>
                            </tr>
                          </thead>
                          <tbody>
                            {project.performanceMetrics.metricsTable.map((metric, i) => (
                              <tr key={i} className="border-b border-white/10 hover:bg-cyan-500/5 transition-colors">
                                <td className="p-3 text-gray-300">{metric.metric}</td>
                                <td className="p-3 text-cyan-400 font-semibold">{metric.value}</td>
                                <td className="p-3 text-gray-400">{metric.notes}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                  {/* CNN vs LSTM Comparison Table */}
                  {project.performanceMetrics.cnnLstmComparisonTable && (
                    <div className="mb-8 p-6 bg-cyan-500/10 border-2 border-cyan-500/30 rounded-lg">
                      <h4 className="text-lg font-semibold text-cyan-400 mb-4">
                        {project.performanceMetrics.cnnLstmComparisonTable.label}
                      </h4>
                      <p className="text-sm text-gray-400 italic mb-4">
                        {project.performanceMetrics.cnnLstmComparisonTable.caption}
                      </p>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-sm">
                          <thead>
                            <tr className="border-b border-cyan-500/30">
                              {project.performanceMetrics.cnnLstmComparisonTable.columns.map((col, i) => (
                                <th key={i} className="text-left p-3 text-cyan-300 font-semibold">
                                  {col}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {project.performanceMetrics.cnnLstmComparisonTable.rows.map((row, i) => (
                              <tr key={i} className="border-b border-white/10 hover:bg-cyan-500/5 transition-colors">
                                <td className="p-3 text-gray-300">{row.activities}</td>
                                <td className="p-3 text-gray-300">{row.cnnF1}</td>
                                <td className="p-3 text-gray-300">{row.cnnAccuracy}</td>
                                <td className="p-3 text-gray-300">{row.lstmF1}</td>
                                <td className="p-3 text-cyan-400 font-semibold">{row.lstmAccuracy}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                  {/* All Models Comparison Table */}
                  {project.performanceMetrics.allModelsComparisonTable && (
                    <div className="mb-8 p-6 bg-purple-500/10 border-2 border-purple-500/30 rounded-lg">
                      <h4 className="text-lg font-semibold text-purple-400 mb-4">
                        {project.performanceMetrics.allModelsComparisonTable.label}
                      </h4>
                      <p className="text-sm text-gray-400 italic mb-4">
                        {project.performanceMetrics.allModelsComparisonTable.caption}
                      </p>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-sm">
                          <thead>
                            <tr className="border-b border-purple-500/30">
                              {project.performanceMetrics.allModelsComparisonTable.columns.map((col, i) => (
                                <th key={i} className="text-left p-3 text-purple-300 font-semibold">
                                  {col}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {project.performanceMetrics.allModelsComparisonTable.rows.map((row, i) => (
                              <tr key={i} className={`border-b border-white/10 hover:bg-purple-500/5 transition-colors ${row.model === 'GCNN' ? 'bg-purple-500/10' : ''}`}>
                                <td className="p-3 text-gray-300 font-medium">{row.model}</td>
                                <td className="p-3 text-purple-400 font-semibold">{row.accuracy}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                  {project.performanceMetrics.figures && (
                    <div className="space-y-6 mb-6">
                      {project.performanceMetrics.figures.map((fig, i) => (
                        <div key={i} className="p-6 bg-dark-900/50 rounded-lg border border-white/20">
                          <img 
                            src={fig.src} 
                            alt={fig.alt}
                            className="w-full h-auto rounded-lg"
                          />
                          <p className="text-center text-sm text-gray-400 mt-4 italic">
                            {fig.caption}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                  {project.performanceMetrics.figurePlaceholders && (
                    <div className="space-y-4">
                      {project.performanceMetrics.figurePlaceholders.map((fig, i) => (
                        <div key={i} className="p-6 bg-dark-900/50 border-2 border-dashed border-white/20 rounded-lg text-center">
                          <p className="text-gray-400 italic">[Figure: {fig}]</p>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              )}

              {/* Comparative Analysis */}
              {project.comparativeAnalysis && (
                <section className="mb-10">
                  <h2 className="text-3xl font-bold mb-6 text-white border-b border-vision/30 pb-3">
                    Comparative Analysis
                  </h2>
                  {project.comparisonTable && (
                    <div className="mb-8 p-6 bg-green-500/10 border-2 border-green-500/30 rounded-lg">
                      <h4 className="text-lg font-semibold text-green-400 mb-2">
                        {project.comparisonTable.label}
                      </h4>
                      <p className="text-sm text-gray-400 italic mb-4">
                        {project.comparisonTable.caption}
                      </p>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-sm">
                          <thead>
                            <tr className="border-b border-green-500/30">
                              {project.comparisonTable.columns.map((col, i) => (
                                <th key={i} className="text-left p-3 text-green-300 font-semibold">
                                  {col}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {project.comparisonTable.rows.map((row, i) => {
                              const isHighlighted = row.method?.includes('proposed') || row.model?.includes('AgriCure') || row.model?.includes('MobileNet');
                              return (
                                <tr key={i} className={`border-b border-white/10 hover:bg-green-500/5 transition-colors ${isHighlighted ? 'bg-green-500/10' : ''}`}>
                                  {Object.values(row).map((value, j) => (
                                    <td key={j} className={`p-3 ${j === 0 ? 'text-gray-300 font-medium' : 'text-gray-400'}`}>
                                      {value}
                                    </td>
                                  ))}
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                  <div className="mb-8 p-6 bg-purple-500/10 border-2 border-purple-500/30 rounded-lg">
                    <h4 className="text-lg font-semibold text-purple-400 mb-4">
                      Comparative Analysis
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse text-sm">
                        <thead>
                          <tr className="border-b border-purple-500/30">
                            <th className="text-left p-3 text-purple-300 font-semibold">System</th>
                            <th className="text-left p-3 text-purple-300 font-semibold">Strength</th>
                            <th className="text-left p-3 text-purple-300 font-semibold">Weakness</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Array.isArray(project.comparativeAnalysis) && project.comparativeAnalysis.map((comparison, i) => (
                            <tr key={i} className={`border-b border-white/10 hover:bg-purple-500/5 transition-colors ${comparison.approach.includes('Nexus') || comparison.approach.includes('Hybrid') ? 'bg-purple-500/10' : ''}`}>
                              <td className="p-3 text-gray-300 font-medium">{comparison.approach}</td>
                              <td className="p-3 text-green-400">{comparison.strength}</td>
                              <td className="p-3 text-red-400">{comparison.weakness}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {project.comparativeConclusion && (
                      <div className="mt-6 p-4 bg-reasoning/10 rounded-lg border-l-4 border-reasoning">
                        <p className="text-gray-300 font-semibold">✅ {project.comparativeConclusion}</p>
                      </div>
                    )}
                  </div>
                  {project.comparisonFigure && (
                    <div className="mt-8 p-6 bg-dark-900/50 rounded-lg border border-white/20">
                      <img 
                        src={project.comparisonFigure.src} 
                        alt={project.comparisonFigure.alt}
                        className="w-full h-auto rounded-lg"
                      />
                      <p className="text-center text-sm text-gray-400 mt-4 italic">
                        {project.comparisonFigure.caption}
                      </p>
                    </div>
                  )}
                </section>
              )}

              {/* Ablation Studies */}
              {project.ablationStudies && (
                <section className="mb-10">
                  <h2 className="text-3xl font-bold mb-6 text-white border-b border-audio/30 pb-3">
                    Ablation Studies
                  </h2>
                  <p className="text-gray-300 leading-relaxed text-base mb-6">
                    {project.ablationStudies.description}
                  </p>
                  {project.ablationStudies.findings && (
                    <ul className="space-y-3 mb-6">
                      {project.ablationStudies.findings.map((finding, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-300">
                          <span className="text-vision font-bold">→</span>
                          <span>{finding}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  {/* Ablation Table Image */}
                  {project.ablationStudies.tableImage && (
                    <div className="mt-8 p-6 bg-dark-900/50 rounded-lg border border-white/20">
                      <img 
                        src={project.ablationStudies.tableImage.src} 
                        alt={project.ablationStudies.tableImage.alt}
                        className="w-full h-auto rounded-lg"
                      />
                      <p className="text-center text-sm text-gray-400 mt-4 italic">
                        {project.ablationStudies.tableImage.caption}
                      </p>
                    </div>
                  )}
                  
                  {project.ablationTable && (
                    <div className="mt-6 p-6 bg-purple-500/10 border-2 border-purple-500/30 rounded-lg">
                      <h4 className="text-lg font-semibold text-purple-400 mb-2">
                        {project.ablationTable.label}
                      </h4>
                      <p className="text-sm text-gray-400 italic mb-4">
                        {project.ablationTable.caption}
                      </p>
                      {project.ablationTable.rows ? (
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="border-b border-purple-500/30">
                                {project.ablationTable.columns.map((col, i) => (
                                  <th key={i} className="text-left p-3 text-purple-300 font-semibold text-sm">
                                    {col}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {project.ablationTable.rows.map((row, i) => (
                                <tr key={i} className="border-b border-white/10 hover:bg-purple-500/5 transition-colors">
                                  <td className="p-3 text-gray-300 font-medium">{row.configuration}</td>
                                  <td className="p-3 text-gray-400 text-sm">{row.components}</td>
                                  <td className="p-3 text-vision font-semibold">{row.performance}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <div className="p-4 bg-dark-900/50 border border-dashed border-purple-500/20 rounded text-center">
                          <p className="text-purple-300 font-mono text-sm">
                            📊 {project.ablationTable.note}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {project.ablationStudies.figurePlaceholders && (
                    <div className="mt-4 space-y-4">
                      {project.ablationStudies.figurePlaceholders.map((fig, i) => (
                        <div key={i} className="p-6 bg-dark-900/50 border-2 border-dashed border-white/20 rounded-lg text-center">
                          <p className="text-gray-400 italic">[Figure: {fig}]</p>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              )}

              {/* Use Cases */}
              {project.useCases && (
                <section className="mb-10">
                  <h2 className="text-3xl font-bold mb-6 text-white border-b border-reasoning/30 pb-3">
                    Use Cases
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {Array.isArray(project.useCases) && project.useCases.map((useCase, i) => (
                      <div key={i} className="p-5 bg-white/5 rounded-lg border border-white/10 hover:border-vision/50 transition-colors">
                        <h4 className="font-semibold text-vision mb-2">{useCase.title}</h4>
                        <p className="text-gray-400 text-sm">{useCase.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </article>
          </GlowCard>

          <div className="space-y-8">

            {project.techStack && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Tech Stack</h2>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(project.techStack) && project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 bg-secondary/50 rounded-lg text-gray-300 border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h2 className="text-xl font-semibold mb-4">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {Array.isArray(project.tags) && project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-reasoning/20 rounded-full text-sm text-reasoning"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
