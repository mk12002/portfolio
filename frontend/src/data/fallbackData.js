/**
 * Fallback data for when the backend API is unavailable.
 * This ensures the portfolio is always viewable by recruiters,
 * even if the Java backend isn't running.
 *
 * IMPORTANT: Keep this in sync with backend JSON content files.
 */

export const fallbackProfile = {
  name: "Mohit Kumar",
  tagline: "Cybersecurity Engineer | AI for Security & Security for AI",
  shortIntro: "Cybersecurity Engineer building AI-powered defense systems. Currently at ITC Infotech — engineering multi-agentic email threat neutralization, conducting VAPT, and running SOC operations. Deep ML background across adversarial robustness, multi-agent systems, and neural-symbolic reasoning.",
  longIntro: "I'm a Cybersecurity Engineer at ITC Infotech, focused on AI for Security and Security for AI. I specialize in building intelligent defense systems — from multi-agentic email threat neutralization to SOC-grade anomaly detection — while researching adversarial robustness to secure AI from attack. My security toolkit spans VAPT (Burp Suite, Nmap, sqlmap, Nessus), SOC operations (Splunk, Microsoft Sentinel, Defender EDR/XDR), cloud security (AWS Shared Responsibility, IAM hardening), and DevSecOps. Before pivoting to security, I built production-grade ML systems — Legal AI (HybEx-Law, 98.5% F1), multi-agent research platforms (Nexus), lung surgery digital twins (LUNA), and computer vision systems (98.99% mAP). I believe the future of security is AI-native — and the future of AI must be secure.",
  interests: [
    "AI for Security",
    "Security for AI",
    "Cybersecurity",
    "Adversarial ML",
    "Threat Detection",
    "Multi-Agent Systems",
    "Machine Learning",
    "Computer Vision",
    "Deep Learning",
    "NLP"
  ],
  profilePicture: "/assets/profile.jpg",
  socialLinks: {
    github: "https://github.com/mk12002",
    linkedin: "https://www.linkedin.com/in/mohitkumar111/",
    instagram: "https://www.instagram.com/mohit__kr_/",
    email: "mailto:mohit.kr1103@gmail.com",
    resumeDownload: "/resume/Mohit_Kumar.pdf"
  }
}

export const fallbackResume = {
  name: "Mohit Kumar",
  title: "Cybersecurity Engineer | AI for Security & Security for AI | VIT Chennai",
  email: "mohit.kr1103@gmail.com",
  phone: "9973395247",
  location: "Bengaluru, India",
  summary: "Cybersecurity Engineer specializing in AI-powered defense systems, VAPT, and SOC operations. Currently building multi-agentic email threat neutralization at ITC Infotech. Deep ML background with 4 research publications, expertise in adversarial robustness, multi-agent systems, and neural-symbolic reasoning. Production experience across PyTorch, Transformers, GNN, and computer vision. Research internships at Shantou University, Samsung PRISM, Annam.AI, CCPS and CHAIR at VIT Chennai.",
  education: [
    { degree: "B.Tech in Electronics and Computer Engineering", institution: "VIT Chennai", cgpa: "9.09 / 10.0", duration: "2022 – 2026", location: "Chennai, India" },
    { degree: "Higher Secondary Education (Class XII)", institution: "Radiant International School", percentage: "95.6%", duration: "2021", location: "Patna, India" },
    { degree: "Secondary Education (Class X)", institution: "Radiant International School", percentage: "94.2%", duration: "2019", location: "Patna, India" }
  ],
  skills: {
    cybersecurity: ["Burp Suite", "Nmap", "sqlmap", "Nessus", "Metasploit", "Wireshark", "Splunk", "Microsoft Sentinel", "Defender EDR/XDR", "OWASP Top 10", "VAPT", "SOC Operations", "Incident Response", "Cloud Security (AWS)"],
    machineLearning: ["Neural Networks", "Transformers", "Vision Models", "Audio Models", "Hybrid AI", "Digital Twin Modeling", "Graph Neural Networks", "Deep Learning"],
    frameworks: ["PyTorch", "TensorFlow", "scikit-learn", "LangGraph", "LangChain", "FastAPI", "Flask", "OpenCV"],
    tools: ["Docker", "Git/GitHub", "Jupyter", "VS Code", "Postman", "Streamlit", "Unity", "Anaconda"],
    cloud: ["Azure AI Engineer (AI-102)", "Azure Data Scientist (DP-100)", "OCI GenAI Professional", "AWS"],
    languages: ["Python", "Java", "C/C++", "SQL", "MongoDB"]
  },
  coursework: ["Calculus", "Differential Equations and Transforms", "Complex Variables and Linear Algebra", "Probability and Statistics", "Computer Programming Python", "Structured and Object-Oriented Programming", "Computer Programming Java", "Discrete Mathematics and Graph Theory", "Data Structures and Algorithms", "Design and Analysis of Algorithms", "Computer Architecture and Organization", "Operating Systems", "Computer Networks", "Database Systems", "Theory of Computation", "Compiler Design", "Digital Systems", "Microprocessors and Microcontrollers", "Signal Processing", "Artificial Intelligence and Machine Learning", "Robotics and Automation", "Computer Vision", "Natural Language Processing", "Deep Learning", "Embedded C Programming"],
  achievements: [
    "Qualified for Final round of IEEE IC Hackathon 2.0 with AIR 7 out of 600 teams",
    "Managed Bihar's first Atal Tinkering Lab funded by Niti Aayog",
    "Organized technical fest events with 200+ participants",
    "Secured 2nd position in State-level Science Exhibition at Governor's house, Patna"
  ],
  languages: ["English (Professional)", "Hindi (Native)", "Bengali (Native)", "French (Elementary)", "German (Elementary)"],
  resumeFile: "/resume/Mohit_Kumar.pdf"
}

export const fallbackExperiences = {
  experiences: [
    { id: "itc-infotech", organization: "ITC Infotech", role: "Cybersecurity Intern", duration: "February 2026 – Present", location: "Bangalore, India (On-Site)", project: "Email Security Evolution", problem: "Combat sophisticated email-borne exploits that evade traditional security controls, requiring advanced threat intelligence and behavioral analysis.", approach: "Completed intensive cybersecurity training covering OSI model, TCP/IP, DMZ design, VAPT (Burp Suite, Nmap, sqlmap, Nessus), OWASP Top 10 remediation (SQLi, XSS, Broken Access Control), SOC operations (Microsoft Sentinel, Splunk SPL, Defender EDR/XDR), AWS Shared Responsibility Model, MFA/SSO (SAML/OAuth 2.0), DevSecOps Shift-Left practices, and OS hardening. Engineering a multi-agentic AI system to autonomously orchestrate real-time threat intelligence and behavioral analysis.", impact: "Building advanced email security solution to neutralize threats before reaching end-users while developing expertise in security operations, cloud security, and AI-driven defense systems.", tags: ["Cybersecurity", "VAPT", "SOC Operations", "Multi-Agent AI", "Email Security", "Microsoft Sentinel", "Splunk", "AWS Security", "DevSecOps", "OWASP"], certificateImage: null },
    { id: "shantou", organization: "Shantou University & CHAIR VIT Chennai", role: "Research Intern", duration: "May 2025 – July 2025", location: "Shantou, China (Remote)", project: "Gated Multi-Domain CUT Model", projectSlug: "xray-normalization", problem: "Develop efficient X-ray normalization across multiple intensity levels using a single unified generator.", approach: "Designed a novel Gated Multi-Domain CUT model with attention-based architecture and hybrid contrastive loss for high anatomical fidelity.", impact: "Outperformed baselines (CycleGAN, StarGAN, CUT) achieving SSIM of 0.9858.", tags: ["Medical Imaging", "GANs", "CUT", "X-ray Normalization", "Deep Learning"], certificateImage: "/certificates/CHAIR.jpeg" },
    { id: "annam", organization: "Annam.AI (IIT Ropar)", role: "Project Intern", duration: "May 2025 – July 2025", location: "IIT Ropar, Punjab (Remote)", project: "Sanchalak", projectSlug: "sanchalak", problem: "Bridge the information gap between farmers and 50+ government welfare schemes through voice-driven AI.", approach: "Built FastAPI backend with Prolog-based rule engine, end-to-end pipeline using Whisper, Azure Translator/TTS, and Gemma LLM for personalized voice interactions.", impact: "Achieved <5s latency per query with 100% deterministic eligibility checks via hybrid Prolog+LLM architecture.", tags: ["Voice AI", "Prolog", "FastAPI", "Multilingual", "LLM", "AgriTech"], certificateImage: "/certificates/ANNAM.AI.png" },
    { id: "samsung", organization: "Samsung R&D Institute India (PRISM)", role: "Research Intern", duration: "July 2024 – February 2025", location: "Chennai, India (On-Site)", project: "Medical Audio Classification", projectSlug: "medical-audio", problem: "Enable zero-shot analysis of medical body sounds (heart, respiratory, bowel) for healthcare diagnostics.", approach: "Fine-tuned CLAP and CLIP on 20k+ medical audio samples from PhysioNet, BHIC, AudioSet, VGG-Sound. Built annotation + preprocessing pipeline with t-SNE visualization.", impact: "Enabled zero-shot analysis across 10+ body sound classes with, high embedding quality.", tags: ["Audio AI", "CLIP", "CLAP", "Healthcare", "Zero-Shot Learning"], certificateImage: "/certificates/Prism_cert.png" },
    { id: "ccps", organization: "CCPS, VIT Chennai", role: "Research Intern", duration: "June 2024 – August 2024", location: "Chennai, India (Hybrid)", project: "HAR-GCNN", projectSlug: "har-gcnn", problem: "Improve Human Activity Recognition accuracy with graph-based spatiotemporal modeling.", approach: "Developed HAR-GCNN model using Graph Convolutional Networks on PAMAP2 sensor dataset with robustness to 66% missing labels.", impact: "Achieved 99.99% accuracy, outperforming CNN (99.75%) and LSTM (98.10%) across 3-25 activity classes.", tags: ["GNN", "HAR", "Signal Processing", "Time-Series", "Sensor Data"], certificateImage: "/certificates/CCPS_Internship.png" },
    { id: "dsc", organization: "Data Science Club VIT Chennai", role: "Research Team Member", duration: "May 2023 – June 2024", location: "Chennai, India", project: "ML Research & Development", problem: "Contribute to ML research projects and knowledge sharing within the university.", approach: "Participated in research initiatives, collaborated on ML projects, and contributed to team knowledge base.", impact: "Built foundation in applied ML research and collaborative development.", tags: ["Research", "ML", "Collaboration"] }
  ]
}

export const fallbackPublications = {
  publications: [
    { title: "AgriCure: An AWS S3-Integrated Deep Learning Platform for Automated Crop Disease Detection", authors: ["V. Ananthakrishnan", "Sounak Shome", "Mohit Kumar", "Suryakiran R", "Dr. Tharaga Sharmilan", "Dr. Gnana Swathika O. V"], venue: "IEEE i-PACT 2025", year: 2025, date: "December 2025", abstract: "A lightweight MobileNet-based disease classification system integrated with AWS S3 for automated tomato plant disease detection, achieving >90% accuracy with <150ms inference latency on mobile devices.", tags: ["Deep Learning", "AgriTech", "AWS S3", "Disease Detection", "MobileNet", "Computer Vision"], url: "https://ieeexplore.ieee.org/document/11307938", link: "https://ieeexplore.ieee.org/document/11307938" },
    { title: "HybEx-Law: A Hybrid Neural-Symbolic System for Legal Aid Eligibility Determination", authors: ["Mohit Kumar", "Diya Ravishankar", "Yuganshu Kumar", "Sudhakaran G"], venue: "Under Review", year: 2025, abstract: "A system blending neural models with rule-based reasoning to determine legal aid eligibility, achieving F1-score of 0.985.", tags: ["Legal AI", "Hybrid Neural-Symbolic", "GNN", "Prolog"] },
    { title: "High-Precision Polygonal Parking Slot Detection via SwinMask2Former and Dynamic Gap Analysis", authors: ["Diya Ravishankar", "Mohit Kumar", "Yuganshu Kumar", "Vijayarajan Rajangam", "Sangeetha Nagarajan"], venue: "Under Review", year: 2024, abstract: "Novel end-to-end framework for layout-free parking vacancy detection achieving mAP50 of 98.99%.", tags: ["Computer Vision", "Swin Transformer", "Instance Segmentation"] },
    { title: "Advancing Human Activity Recognition: A Comparative Analysis of Graph Convolutional Networks and Masked Autoencoders", authors: ["Dr. Balasundaram A", "Diya Ravishankar", "Mohit Kumar", "Aditi Bhargav"], venue: "Under Review", year: 2024, abstract: "Comparative study achieving 99.99% accuracy with HAR-GCNN on PAMAP2 dataset.", tags: ["GNN", "HAR", "MetaMAE", "Time-Series"] }
  ]
}

export const fallbackCertificates = {
  certificates: [
    { name: "IBM Cybersecurity Analyst Professional Certificate", issuer: "IBM (Delivered via Coursera)", category: "Cybersecurity", icon: "shield", credentialId: "RKIJVQMBZ3N5", earnedDate: "March 2026", link: "https://www.coursera.org/account/accomplishments/specialization/RKIJVQMBZ3N5", description: "A comprehensive 14-course professional certificate program providing a foundation for entry-level cybersecurity analyst roles." },
    { name: "Cyber Security Fundamentals", issuer: "University of London via Coursera", category: "Cybersecurity", icon: "shield", earnedDate: "January 19, 2026", link: "https://coursera.org/share/41ae000d50e2502a39c4c17e39b36ca6", description: "Foundational certification covering essential cybersecurity concepts." },
    { name: "Microsoft Certified: Azure AI Engineer Associate", issuer: "Microsoft", category: "Cloud", icon: "microsoft", credentialId: "FB7576BAB685E9BE", earnedDate: "June 17, 2025", link: "https://learn.microsoft.com/en-us/users/mohitkumar-5451/credentials/fb7576bab685e9be", description: "Demonstrates expertise in designing and implementing AI solutions using Azure Cognitive Services." },
    { name: "Microsoft Certified: Azure Data Scientist Associate", issuer: "Microsoft", category: "Cloud", icon: "microsoft", credentialId: "2117BF954DCDC5A5", earnedDate: "June 18, 2025", link: "https://learn.microsoft.com/en-us/users/mohitkumar-5451/credentials/2117bf954dcdc5a5", description: "Validates skills in applying machine learning techniques using Azure Machine Learning." },
    { name: "Microsoft Certified: Azure AI Fundamentals", issuer: "Microsoft", category: "Cloud", icon: "microsoft", earnedDate: "July 12, 2024", link: "https://www.credly.com/badges/502f6d52-f56b-4bd7-8b4c-e3364c5acc8b/linked_in_profile", description: "Foundational knowledge of ML and AI concepts and related Microsoft Azure services." },
    { name: "Oracle Cloud Infrastructure 2024 Generative AI Certified Professional", issuer: "Oracle", category: "Cloud", icon: "oracle", earnedDate: "July 29, 2024", link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=CBA45575ECD2EA410B506FCD77CA2328F3CC8F54EE1EC201032A8490BDB46348", description: "Professional certification for Oracle Cloud Infrastructure Generative AI services." },
    { name: "Core Designer Certificate", issuer: "Dataiku Academy", category: "Data Science", icon: "dataiku", credentialId: "vfqzv2gg6mt3", earnedDate: "December 27, 2025", description: "Professional certification in designing data science workflows using Dataiku." },
    { name: "ML Practitioner Certificate", issuer: "Dataiku Academy", category: "Data Science", icon: "dataiku", credentialId: "rj3rtcpoywfo", earnedDate: "December 27, 2025", description: "Validates hands-on skills in building ML models using Dataiku." },
    { name: "Python for Data Science", issuer: "IBM", category: "Data Science", icon: "python", earnedDate: "December 23, 2025", description: "Foundational Python for data analysis certification." },
    { name: "Data Structures and Algorithms", issuer: "GeeksForGeeks", category: "Programming", icon: "code" },
    { name: "Figma Essential Training", issuer: "LinkedIn Learning", category: "Design", icon: "figma" }
  ]
}

export const fallbackEvents = {
  events: [
    { title: "IEEE IC Hackathon 2.0 - Finals", year: 2024, description: "Qualified with AIR 7 out of 600 teams", type: "competition" },
    { title: "CVIA Workshop", year: 2024, description: "Computer Vision and Image Analysis workshop participation", type: "workshop" },
    { title: "AI Expo India", year: 2023, description: "Participated in India's premier AI exposition", type: "conference" },
    { title: "State-level Science Exhibition", year: 2021, description: "Secured 2nd position at Governor's house, Patna", type: "competition" },
    { title: "Atal Tinkering Lab Management", year: 2020, description: "Managed Bihar's first ATL funded by Niti Aayog", type: "leadership" }
  ]
}

export const fallbackContactInfo = {
  title: "Contact Me",
  description: "Feel free to reach out for collaborations, internships, research discussions, or project inquiries. I'm always excited to connect!",
  fields: ["name", "email", "message"],
  successMessage: "Thanks for reaching out! I'll get back to you soon.",
  email: "mohit.kr1103@gmail.com",
  location: "Bengaluru, India"
}

export const fallbackPosts = {
  posts: [
    { title: "Nexus: A Three-Pronged Agentic AI System for Intelligent Research and Analysis", authors: ["Mohit Kumar", "Diya Ravishankar"], date: "2025-03-11", category: "AI Research", excerpt: "Multi-agent system for automated research discovery and synthesis using LangGraph.", tags: ["Multi-Agent", "LangGraph", "Research Automation"], readTime: "10 min read", url: "https://app.readytensor.ai/publications/nexus-a-three-pronged-agentic-ai-system-for-intelligent-research-and-analysis-Y06tMJMVmNjI" },
    { title: "Sanchalak: Revolutionizing Rural Welfare Access", authors: ["Mohit Kumar"], date: "2025-08-11", category: "Social Impact", excerpt: "A comprehensive system designed to streamline access to government welfare schemes in rural India.", tags: ["Social Impact", "Government Tech", "Rural Development", "AI for Good"], readTime: "8 min read", url: "https://annam.ai/2025/08/11/sanchalak-revolutionizing-rural-welfare-access/" }
  ]
}

export const fallbackBuyMeACoffee = {
  title: "Buy Me a Coffee",
  description: "If you enjoy my work, research, or projects, consider supporting me with a coffee! It keeps me energized to build more security tools and open-source projects.",
  upiId: "mkd1112002@okicici",
  qrCodeImage: "/assets/coffee-qr.jpg",
  buttonText: "Buy Me a Coffee"
}

// Reads data omitted from fallback for size — will show empty state gracefully
export const fallbackReads = { books: [], papers: [] }

// Projects fallback contains only minimal data for listing — full project detail
// will show a "connect to backend for full details" message
export const fallbackProjects = { projects: [] }
