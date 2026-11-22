// Only skills that are on your resume. Add a skill here only after you have really used it.
// Held back until confirmed: LangChain and pgvector (the public FinLens repo does not use them).
export const skillGroups: { title: string; skills: string[] }[] = [
  {
    title: 'Frontend',
    skills: ['React.js', 'React Native', 'Next.js', 'JavaScript', 'TypeScript', 'Redux', 'Redux Toolkit', 'RTK Query', 'Material UI', 'Bootstrap'],
  },
  { title: 'Backend', skills: ['Node.js', 'Express.js', 'NestJS', 'REST APIs', 'Socket.IO', 'WebSockets'] },
  { title: 'Databases', skills: ['MongoDB', 'PostgreSQL', 'Prisma', 'Redis'] },
  { title: 'AI', skills: ['Python', 'RAG', 'Ollama', 'MCP', 'Agentic AI'] },
  { title: 'Integrations', skills: ['Stripe', 'Google Drive', 'OneDrive', 'Confluence', 'AWS S3'] },
  { title: 'Tools', skills: ['GitHub', 'Jira', 'VS Code', 'Claude Code', 'Antigravity'] },
];
