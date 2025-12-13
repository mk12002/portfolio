# Mohit Kumar Portfolio

## Overview

This is a personal portfolio website for Mohit Kumar, a Machine Learning Systems Engineer. The application showcases research projects, publications, work experiences, certifications, and contact information. The portfolio is designed with a modern, visually appealing dark theme featuring gradient accents and 3D elements.

The site serves as a comprehensive professional presence highlighting expertise in hybrid AI architectures, computer vision, audio processing, legal AI, and multi-agent systems.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 19 with Vite as the build tool
- **Styling**: Tailwind CSS with custom theme configuration (dark theme with cyan, orange, purple accent colors)
- **Animations**: Framer Motion for smooth transitions and interactions
- **3D Graphics**: React Three Fiber (@react-three/fiber) with Drei helpers for 3D visual elements
- **Routing**: React Router DOM for client-side navigation
- **State Management**: React hooks with custom API hooks for data fetching
- **HTTP Client**: Axios for API communication

### Backend Architecture
- **Framework**: Java-based backend (Maven project structure visible in `backend/target/classes`)
- **API Pattern**: RESTful API serving JSON content at `/api/*` endpoints
- **Content Storage**: Static JSON files in `content/` directory for portfolio data
- **Proxy Configuration**: Vite dev server proxies `/api` requests to backend on port 8080

### Data Architecture
- **Content-Driven**: All portfolio content stored as JSON files in `/content` directory
- **Content Types**:
  - `profile.json` - Personal information, tagline, social links
  - `resume.json` - Education, skills, experience details
  - `projects.json` - Project showcase with detailed descriptions
  - `publications.json` - Research publications and papers
  - `experiences.json` - Work experience entries
  - `certificates.json` - Professional certifications
  - `events.json` - Conferences, workshops, competitions
  - `contact.json` - Contact form configuration
  - `buymeacoffee.json` - Donation/support page config

### Design Patterns
- **Component-Based**: React functional components with hooks
- **Custom Hooks**: `useApi.js` provides reusable data fetching hooks (`useProfile`, `useResume`, `useProjects`, etc.)
- **Path Aliasing**: `@` maps to `./src`, `@assets` maps to `./public/assets`

## External Dependencies

### Frontend Dependencies
- **React Ecosystem**: react, react-dom, react-router-dom
- **3D Rendering**: three.js, @react-three/fiber, @react-three/drei
- **Animation**: framer-motion
- **Icons**: react-icons
- **Notifications**: react-toastify
- **HTTP**: axios

### Development Tools
- **Build**: Vite 7.x
- **CSS**: Tailwind CSS 3.x, PostCSS, Autoprefixer
- **React Plugin**: @vitejs/plugin-react

### External Services
- **Social Links**: GitHub, LinkedIn
- **Donations**: Buy Me a Coffee, UPI payment support
- **Fonts**: Google Fonts (Inter, JetBrains Mono)

### Backend Resources
- Content served from `backend/src/main/resources/content/` directory
- Static assets expected at `/assets/` and `/resume/` paths