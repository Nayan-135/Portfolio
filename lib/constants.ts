/**
 * Application Constants
 * Update these values to customize your portfolio
 */

export const PORTFOLIO_CONFIG = {
  // Profile Information
  name: process.env.NEXT_PUBLIC_PROFILE_NAME || "Your Name",
  title: process.env.NEXT_PUBLIC_PROFILE_TITLE || "Full-Stack Developer",
  email: process.env.NEXT_PUBLIC_PROFILE_EMAIL || "your.email@example.com",
  location: process.env.NEXT_PUBLIC_PROFILE_LOCATION || "Your Location",

  // Social Links
  github: process.env.NEXT_PUBLIC_GITHUB_PROFILE || "https://github.com",
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_PROFILE || "https://linkedin.com",
  twitter: process.env.NEXT_PUBLIC_TWITTER_PROFILE || "https://twitter.com",

  // GitHub API
  githubUsername: process.env.NEXT_PUBLIC_GITHUB_USERNAME || "octocat",

  // Profile Image
  profileImage: "/placeholder-user.jpg",

  // Application Info
  osName: "Portfolio OS",
  osVersion: "1.0",
  buildDate: new Date().toLocaleDateString(),
}

export const SKILLS = {
  frontend: ["React", "TypeScript", "Next.js", "Tailwind CSS", "HTML/CSS", "Vue.js"],
  backend: ["Node.js", "Express", "Python", "PostgreSQL", "MongoDB", "GraphQL"],
  tools: ["Git", "Docker", "AWS", "Vercel", "VS Code", "Figma"],
}

export const PROJECTS = [
  {
    name: "Project Name",
    description: "Brief description of your project",
    technologies: ["React", "TypeScript", "Tailwind"],
    github: "https://github.com/your-username/project",
    live: "https://project-demo.com",
  },
  // Add more projects...
]

export const EXPERIENCE = [
  {
    company: "Company Name",
    position: "Job Title",
    period: "2023 - Present",
    description: "What you did and achieved",
    technologies: ["React", "Node.js"],
  },
  // Add more experiences...
]

export const CERTIFICATES = [
  {
    name: "Certification Name",
    issuer: "Issuing Organization",
    date: "Month Year",
    link: "https://certificate-link.com",
  },
  // Add more certificates...
]
