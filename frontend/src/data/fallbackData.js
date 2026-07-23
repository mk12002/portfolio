/**
 * Fallback data for when the backend API is unavailable.
 * This ensures the portfolio is always viewable by recruiters,
 * even if the Java backend isn't running (or is cold-starting).
 *
 * Every fallback below is imported from a snapshot of the backend content JSON
 * (frontend/src/data/*Content.json). The backend content JSON is the single
 * source of truth; the snapshots are regenerated from it by
 * `scripts/sync-content.mjs`, which runs on every `npm run build` (prebuild) —
 * or on demand via `npm run sync-content`. Edit the backend JSON (in
 * backend/src/main/resources/content/) and the snapshot follows; there is no
 * second hand-maintained copy to keep in sync.
 */
import projectsContent from './projectsContent.json'
import readsContent from './readsContent.json'
import profileContent from './profileContent.json'
import resumeContent from './resumeContent.json'
import experiencesContent from './experiencesContent.json'
import certificatesContent from './certificatesContent.json'
import eventsContent from './eventsContent.json'
import publicationsContent from './publicationsContent.json'
import contactContent from './contactContent.json'
import buymeacoffeeContent from './buymeacoffeeContent.json'

export const fallbackProfile = profileContent
export const fallbackResume = resumeContent
export const fallbackExperiences = experiencesContent
export const fallbackPublications = publicationsContent
export const fallbackCertificates = certificatesContent
export const fallbackEvents = eventsContent
export const fallbackContactInfo = contactContent
export const fallbackBuyMeACoffee = buymeacoffeeContent
export const fallbackReads = readsContent
export const fallbackProjects = projectsContent

// Legacy fallback for the usePosts() hook. The live blog is rendered from
// src/data/postsData.js (see Posts.jsx); this only backs the /posts API shape.
export const fallbackPosts = {
  posts: [
    { title: "Nexus: A Three-Pronged Agentic AI System for Intelligent Research and Analysis", authors: ["Mohit Kumar", "Diya Ravishankar"], date: "2025-03-11", category: "AI Research", excerpt: "Multi-agent system for automated research discovery and synthesis using LangGraph.", tags: ["Multi-Agent", "LangGraph", "Research Automation"], readTime: "10 min read", url: "https://app.readytensor.ai/publications/nexus-a-three-pronged-agentic-ai-system-for-intelligent-research-and-analysis-Y06tMJMVmNjI" },
    { title: "Sanchalak: Revolutionizing Rural Welfare Access", authors: ["Mohit Kumar"], date: "2025-08-11", category: "Social Impact", excerpt: "A comprehensive system designed to streamline access to government welfare schemes in rural India.", tags: ["Social Impact", "Government Tech", "Rural Development", "AI for Good"], readTime: "8 min read", url: "https://annam.ai/2025/08/11/sanchalak-revolutionizing-rural-welfare-access/" }
  ]
}
