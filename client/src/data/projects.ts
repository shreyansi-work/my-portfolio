export type ProjectLink = { label: string; href: string };

export type Project = {
  name: string;
  subtitle: string;
  category: string;
  summary: string;
  tech: string[];
  points: string[]; // key contributions / features
  note?: string; // honest caveat shown under the card text
  links?: ProjectLink[]; // ONLY real, public links
  accent: 'indigo' | 'violet' | 'sky' | 'emerald';
};

// ---------------------------------------------------------------------------------------------
// Professional projects (built at WebOsmotic and Bigscal). Employer products: no public links, no
// screenshots, no customer names and no metrics are shown. Text follows your resume.
// ---------------------------------------------------------------------------------------------
export const professionalProjects: Project[] = [
  {
    name: 'Narad',
    subtitle: 'AI-Powered Third-Party Risk Management Platform',
    category: 'Risk & compliance',
    summary:
      'A Third-Party Risk Management (TPRM) platform that helps organizations assess and manage vendor security and compliance risks through centralized assessments, documentation, approval workflows and compliance tracking.',
    tech: ['React.js', 'Node.js', 'TypeScript', 'MongoDB', 'Material UI', 'AWS', 'Socket.IO', 'RTK Query', 'Python', 'Agentic AI'],
    points: [
      'Implemented checker-maker approval workflows to support controlled and secure business operations.',
      'Integrated Google Drive, OneDrive and Confluence to enable centralized cloud-storage and collaboration workflows.',
      'Developed reusable React components, optimized state management using RTK Query, and maintained real-time communication using Socket.IO.',
      'Developed an AI RAG chatbot service with a Python RAG pipeline that answers users’ policy questions from uploaded policy documents.',
      'Contributed to the TPRM AI implementation in Python with agentic AI workflows.',
    ],
    accent: 'indigo',
  },
  {
    name: 'Real-Time Dashboard',
    subtitle: 'Live Event Monitoring Platform',
    category: 'Real-time web & mobile',
    summary:
      'A real-time dashboard for monitoring and managing live events across web and mobile platforms, with dynamic updates, audience interactions and AI-powered functionality.',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Redis', 'WebSockets', 'Socket.IO', 'REST APIs'],
    points: [
      'Built features including live polling, audience reactions and dynamic display-wall functionality.',
      'Implemented WebSocket and Socket.IO-based live updates for dashboard information and audience interactions.',
      'Developed responsive dashboards for real-time event monitoring and management across web and mobile platforms.',
      'Integrated AI-powered prompt services to support automated content generation and enhanced user interactions.',
    ],
    accent: 'sky',
  },
  {
    name: 'Mabel',
    subtitle: 'Food Ordering and Collection App',
    category: 'Mobile app',
    summary:
      'A cross-platform food ordering and collection application supporting authentication, ordering, payments, inventory synchronization, real-time communication and notifications. Live in production.',
    tech: ['React Native', 'NestJS', 'PostgreSQL', 'Stripe', 'Socket.IO', 'AWS', 'Deep Linking'],
    points: [
      'Implemented complete user workflows: authentication, OTP verification, password recovery, profile management, cart, checkout and order management.',
      'Developed backend APIs and business logic using NestJS and PostgreSQL.',
      'Integrated Stripe payment workflows for secure checkout and transaction processing.',
      'Implemented real-time chat and notifications with Socket.IO, plus inventory synchronization and deep linking for navigation and order workflows.',
    ],
    note: 'Built with AI-driven development.',
    accent: 'emerald',
  },
  {
    name: 'Paid',
    subtitle: 'Website Management, Payments and POS SaaS Platform',
    category: 'SaaS platform',
    summary:
      'A SaaS platform for website management, payments, subscriptions, inventory, POS operations and analytics, with real-time updates, authentication, third-party integrations and data persistence.',
    tech: ['React.js', 'TypeScript', 'Redux Toolkit', 'RTK Query', 'Node.js', 'Express.js', 'Socket.IO'],
    points: [
      'Developed core website management, payment, subscription, inventory and POS workflows across frontend and backend.',
      'Improved frontend performance using lazy loading, memoization, code optimization and Web Workers.',
      'Built analytics and management interfaces with React.js, Redux Toolkit and RTK Query, using Socket.IO real-time updates to keep application data in sync.',
    ],
    accent: 'violet',
  },
  {
    name: 'BigDesk',
    subtitle: 'Employee Activity Tracking Desktop Application',
    category: 'Desktop app',
    summary:
      'A desktop application for employee activity tracking and work-time monitoring, enabling organizations to monitor employee activities through real-time updates and dual-monitor screenshot capture.',
    tech: ['Electron.js', 'React.js', 'Node.js', 'Express.js', 'MongoDB', 'Socket.IO', 'Redux Toolkit'],
    points: [
      'Developed desktop application features using Electron.js and React.js.',
      'Implemented dual-monitor screenshot capture to record employee screen activity.',
      'Integrated real-time activity updates using Socket.IO.',
      'Integrated frontend components with backend APIs for activity data exchange.',
      'Worked on application state management and desktop application functionality.',
    ],
    accent: 'indigo',
  },
];
