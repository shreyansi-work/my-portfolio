export type Job = {
  company: string;
  role: string;
  period: string;
  location?: string;
  highlights: string[];
  workedOn?: string[]; // project names (must match names in projects.ts)
};

// Text follows your resume. The Bigscal entry deliberately has no backend claims.
export const jobs: Job[] = [
  {
    company: 'WebOsmotic Private Limited',
    role: 'Full Stack Developer',
    period: 'January 2024 – Present',
    location: 'Surat, Gujarat',
    highlights: [
      'Delivered end-to-end product features across frontend and backend with React.js, React Native, TypeScript, Node.js, Express.js and NestJS, owning API contracts, business logic, database integration and client-side implementation, with reusable frontend components and backend services.',
      'Built REST APIs and backend services with Node.js and NestJS over MongoDB and PostgreSQL, covering authentication, authorization, validation, pagination, filtering, business workflows and data access using Prisma.',
      'Implemented production workflows for real-time communication, payments, subscriptions, orders, inventory and notifications using Socket.IO, Stripe, OTP/social authentication and external REST APIs, and integrated AWS S3, Google Drive, OneDrive, Confluence and other third-party services.',
      'Improved application performance through code splitting, lazy loading, memoization and fewer unnecessary re-renders, and diagnosed and resolved production issues across frontend, backend, APIs, databases and integrations.',
      'Applied AI-assisted development with Claude Code CLI and Antigravity, using agents, skills, rules and hooks for consistent results.',
    ],
    workedOn: ['Paid', 'Mabel', 'Narad', 'Real-Time Dashboard'],
  },
  {
    company: 'Bigscal Technologies Pvt. Ltd.',
    role: 'Full Stack Developer',
    period: 'January 2022 – December 2023',
    location: 'Surat, Gujarat',
    highlights: [
      'Developed frontend features for an Electron.js desktop application using React.js.',
      'Developed reusable React components and management interfaces using Redux Toolkit and RTK Query.',
      'Managed client-side state with Redux and integrated REST APIs into React.js screens.',
      'Built responsive user interfaces with Material UI and Bootstrap.',
    ],
  },
];
