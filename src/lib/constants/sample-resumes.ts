import { ResumeData, ResumeTemplateId } from "../types/resume";
import { SAMPLE_RESUME } from "./sample-data";

/**
 * High-quality, profession-tailored sample resumes for all 30 templates.
 * Provides realistic achievements, skills, and industry terminology.
 */

// Category A: Students & Early Careers
const STUDENT_SAMPLE: ResumeData = {
  ...SAMPLE_RESUME,
  id: "sample-student",
  title: "Computer Science Undergraduate Resume",
  personalInfo: {
    fullName: "Rohan Sharma",
    jobTitle: "Computer Science Student & Tech Enthusiast",
    email: "rohan.sharma@university.edu",
    phone: "+91 98123 45678",
    location: "Bengaluru, Karnataka",
    photoUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80",
    github: "https://github.com/rohansharma",
    linkedin: "https://linkedin.com/in/rohansharma-cs",
  },
  summary:
    "Motivated third-year Computer Science undergraduate with a 9.1 GPA and hands-on experience in full-stack web development and algorithms. Built 4 production-grade academic applications and served as lead organizer for campus Hackathon with 300+ participants.",
  experiences: [
    {
      id: "exp-stu-1",
      jobTitle: "Software Engineering Intern",
      company: "InnovateTech Labs",
      location: "Bengaluru, Karnataka",
      startDate: "2025-05",
      endDate: "2025-07",
      current: false,
      highlights: [
        "Developed responsive dashboard widgets using React, TypeScript, and Chart.js, reducing page load by 28%.",
        "Assisted senior engineers in refactoring REST API endpoints and writing unit tests with Jest (85% coverage).",
      ],
    },
    {
      id: "exp-stu-2",
      jobTitle: "Computer Science Teaching Assistant",
      company: "Department of Computer Science",
      location: "Bengaluru, Karnataka",
      startDate: "2024-08",
      endDate: "2025-04",
      current: false,
      highlights: [
        "Mentored 60+ first-year students in Data Structures, Object-Oriented Programming, and C++ problem-solving.",
        "Conducted bi-weekly debugging clinics and evaluated weekly programming assignments.",
      ],
    },
  ],
  education: [
    {
      id: "edu-stu-1",
      degree: "B.Tech in Computer Science and Engineering",
      institution: "National Institute of Technology (NIT)",
      location: "Karnataka, India",
      startDate: "2022-08",
      endDate: "2026-05",
      current: true,
      gpa: "9.1 / 10.0",
      highlights: [
        "Relevant Coursework: Data Structures & Algorithms, Database Systems, Computer Networks, Operating Systems",
        "Dean's Merit List for Academic Excellence (Top 5% of batch)",
      ],
    },
  ],
  skillCategories: [
    {
      id: "cat-stu-1",
      categoryName: "Programming Languages",
      skills: ["C++", "Java", "Python", "JavaScript", "TypeScript", "SQL"],
    },
    {
      id: "cat-stu-2",
      categoryName: "Web & Frameworks",
      skills: ["React.js", "Node.js", "Express", "Tailwind CSS", "HTML5", "Git/GitHub"],
    },
    {
      id: "cat-stu-3",
      categoryName: "Core Concepts",
      skills: ["Object-Oriented Design", "Data Structures", "RESTful APIs", "Relational Databases"],
    },
  ],
  projects: [
    {
      id: "proj-stu-1",
      title: "Campus Peer Mentorship Portal",
      description: "Full-stack matching platform connecting junior students with verified senior mentors based on subject interests.",
      technologies: ["React", "Node.js", "PostgreSQL", "Socket.io"],
      githubUrl: "https://github.com/rohansharma/mentor-hub",
    },
    {
      id: "proj-stu-2",
      title: "Automated Algorithmic Code Grader",
      description: "Sandboxed execution runner using Docker containers to benchmark runtime speed and memory usage of student submissions.",
      technologies: ["Python", "Docker", "FastAPI", "Redis"],
      githubUrl: "https://github.com/rohansharma/code-judge",
    },
  ],
  certifications: [
    {
      id: "cert-stu-1",
      name: "Meta Front-End Developer Specialization",
      issuer: "Coursera / Meta",
      issueDate: "2024-09",
    },
  ],
  settings: {
    ...SAMPLE_RESUME.settings,
    template: "student",
    accentColor: "#2563eb",
  },
};

const FRESHER_SAMPLE: ResumeData = {
  ...STUDENT_SAMPLE,
  id: "sample-fresher",
  title: "Software Engineer Fresher Resume",
  personalInfo: {
    fullName: "Priya Nair",
    jobTitle: "Associate Software Engineer",
    email: "priya.nair@example.com",
    phone: "+91 97456 12345",
    location: "Pune, Maharashtra",
    photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    github: "https://github.com/priyanair-dev",
    linkedin: "https://linkedin.com/in/priyanair",
  },
  summary:
    "Proactive Computer Science graduate seeking an entry-level Software Engineer role to leverage solid foundations in algorithms, modern JavaScript frameworks, and database architecture. Recognized for quick learning and collaborative team communication.",
  settings: {
    ...SAMPLE_RESUME.settings,
    template: "fresher",
    accentColor: "#4f46e5",
  },
};

const INTERNSHIP_SAMPLE: ResumeData = {
  ...STUDENT_SAMPLE,
  id: "sample-internship",
  title: "Engineering Internship Resume",
  personalInfo: {
    fullName: "Aryan Verma",
    jobTitle: "Summer Engineering Intern Candidate",
    email: "aryan.verma@college.edu",
    phone: "+91 98223 99887",
    location: "Mumbai, Maharashtra",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    github: "https://github.com/aryanverma",
    linkedin: "https://linkedin.com/in/aryan-verma",
  },
  summary:
    "Energetic sophomore student pursuing B.E. in Information Technology with demonstrated problem-solving skills in competitive programming and front-end development. Looking for a summer 2026 software engineering internship to contribute to impactful real-world software products.",
  settings: {
    ...SAMPLE_RESUME.settings,
    template: "internship",
    accentColor: "#0284c7",
  },
};

const GRADUATE_SAMPLE: ResumeData = {
  ...STUDENT_SAMPLE,
  id: "sample-graduate",
  title: "Master's Graduate Resume",
  personalInfo: {
    fullName: "Neha Kulkarni",
    jobTitle: "M.S. Computer Science Graduate",
    email: "neha.kulkarni@gatech.edu",
    phone: "+1 (404) 555-0182",
    location: "Atlanta, GA / Remote",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    linkedin: "https://linkedin.com/in/neha-kulkarni-ms",
    github: "https://github.com/nehakulkarni",
  },
  summary:
    "Master of Science in Computer Science graduate with specialization in Machine Learning and Cloud Computing. Authored research thesis on edge inferencing models and developed enterprise analytics microservices during graduate assistantship.",
  settings: {
    ...SAMPLE_RESUME.settings,
    template: "graduate",
    accentColor: "#0f766e",
  },
};

const CAREER_CHANGE_SAMPLE: ResumeData = {
  ...SAMPLE_RESUME,
  id: "sample-career-change",
  title: "Career Transition to Tech Resume",
  personalInfo: {
    fullName: "Vikram Malhotra",
    jobTitle: "Product Specialist / Transitioning Full Stack Developer",
    email: "vikram.malhotra@example.com",
    phone: "+91 98888 11223",
    location: "Gurugram, Haryana",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    linkedin: "https://linkedin.com/in/vikram-malhotra",
    github: "https://github.com/v-malhotra",
  },
  summary:
    "Accomplished Business Operations professional with 5 years of cross-functional leadership, now transitioning into Full-Stack Software Engineering following completion of an intensive 800-hour software engineering curriculum. Combines commercial acumen with modern TypeScript and React technical capabilities.",
  settings: {
    ...SAMPLE_RESUME.settings,
    template: "career-change",
    accentColor: "#7c3aed",
  },
};

// Category B: Business and Management
const BUSINESS_ANALYST_SAMPLE: ResumeData = {
  ...SAMPLE_RESUME,
  id: "sample-business-analyst",
  title: "Lead Business Analyst Resume",
  personalInfo: {
    fullName: "Ananya Deshmukh",
    jobTitle: "Senior Business Analyst",
    email: "ananya.deshmukh@example.com",
    phone: "+91 98451 22334",
    location: "Bengaluru, Karnataka",
    photoUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
    linkedin: "https://linkedin.com/in/ananya-deshmukh-ba",
  },
  summary:
    "Analytical Business Analyst with 6+ years of experience bridging technical teams and executive business units. Proven track record of translating complex stakeholder requirements into clear user stories, process flows, and automated BI reporting dashboards that unlocked $1.8M in operational efficiencies.",
  experiences: [
    {
      id: "exp-ba-1",
      jobTitle: "Senior Business Analyst",
      company: "Cognitive FinTech Solutions",
      location: "Bengaluru, Karnataka",
      startDate: "2022-04",
      endDate: "",
      current: true,
      highlights: [
        "Led requirement elicitation workshops with C-suite stakeholders across 4 countries for an automated loan origination platform.",
        "Authored 120+ comprehensive BRDs, FRDs, and user journey stories in Jira, maintaining 96% sprint acceptance rate.",
        "Engineered executive Power BI dashboards connected to SQL Server data warehouse, reducing month-end reporting time by 75%.",
        "Conducted root-cause analysis on customer drop-off points, boosting conversion rate by 18% over two quarters.",
      ],
    },
    {
      id: "exp-ba-2",
      jobTitle: "Business Systems Analyst",
      company: "Apex Global Consulting",
      location: "Mumbai, Maharashtra",
      startDate: "2019-06",
      endDate: "2022-03",
      current: false,
      highlights: [
        "Mapped AS-IS and TO-BE enterprise workflows using BPMN 2.0 and Visio for supply chain digital transformation.",
        "Facilitated User Acceptance Testing (UAT) with 200+ business users across 5 geographical hubs.",
      ],
    },
  ],
  skillCategories: [
    {
      id: "cat-ba-1",
      categoryName: "Business Analysis",
      skills: ["Requirements Gathering", "BRD / FRD Documentation", "Agile / Scrum", "BPMN Process Modeling", "Gap Analysis", "UAT Coordination"],
    },
    {
      id: "cat-ba-2",
      categoryName: "Analytics & Tools",
      skills: ["SQL", "Power BI", "Tableau", "Advanced Excel (VBA/Macros)", "Jira", "Confluence", "Figma Wireframing"],
    },
  ],
  settings: {
    ...SAMPLE_RESUME.settings,
    template: "business-analyst",
    accentColor: "#0f766e",
  },
};

const PROJECT_MANAGER_SAMPLE: ResumeData = {
  ...SAMPLE_RESUME,
  id: "sample-project-manager",
  title: "Senior Project Manager (PMP) Resume",
  personalInfo: {
    fullName: "Marcus Sterling",
    jobTitle: "Senior Technical Project Manager (PMP, CSM)",
    email: "marcus.sterling@example.com",
    phone: "+1 (415) 555-0198",
    location: "San Francisco, CA",
    photoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80",
    linkedin: "https://linkedin.com/in/marcussterling-pmp",
  },
  summary:
    "PMP-certified Senior Project Manager with 8+ years of experience leading multi-million dollar digital transformations and SaaS delivery lifecycles. Managed cross-functional squads of 35+ engineers, designers, and QA across three time zones, consistently completing 94% of projects on time and 12% under budget.",
  experiences: [
    {
      id: "exp-pm-1",
      jobTitle: "Lead Technical Project Manager",
      company: "Stratosphere Cloud Platforms",
      location: "San Francisco, CA",
      startDate: "2021-08",
      endDate: "",
      current: true,
      highlights: [
        "Directed end-to-end execution of a $4.2M cloud migration program across 4 cross-functional engineering squads.",
        "Instituted risk-governance framework that prevented critical milestone delays across 18 consecutive sprints.",
        "Managed resource allocations, sprint capacity planning, and vendor contracts saving $240K in external contractor spend.",
        "Reported sprint burn-down, velocity, and milestone health directly to C-level stakeholders in weekly SteerCo meetings.",
      ],
    },
  ],
  skillCategories: [
    {
      id: "cat-pm-1",
      categoryName: "Methodologies & Management",
      skills: ["Agile / Scrum / Kanban", "Waterfall / Hybrid", "Budgeting & P&L ($5M+)", "Risk Mitigation", "Stakeholder Alignment"],
    },
    {
      id: "cat-pm-2",
      categoryName: "Tools & Certifications",
      skills: ["PMP® Certified", "Certified ScrumMaster (CSM)", "Jira Software", "Asana", "Smartsheet", "MS Project"],
    },
  ],
  settings: {
    ...SAMPLE_RESUME.settings,
    template: "project-manager",
    accentColor: "#1e40af",
  },
};

const PRODUCT_MANAGER_SAMPLE: ResumeData = {
  ...SAMPLE_RESUME,
  id: "sample-product-manager",
  title: "Senior Product Manager Resume",
  personalInfo: {
    fullName: "Sophia Chang",
    jobTitle: "Principal Product Manager",
    email: "sophia.chang@example.com",
    phone: "+1 (650) 555-0144",
    location: "Seattle, WA / Remote",
    photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    linkedin: "https://linkedin.com/in/sophiachang-pm",
  },
  summary:
    "Product leader with 7+ years of experience driving product vision, discovery, roadmaps, and GTM execution for B2B SaaS platforms. Scaled flagship product line from $3M to $18M ARR, increasing user retention by 22% through customer-centric experimentation and data-informed roadmap prioritization.",
  experiences: [
    {
      id: "exp-prod-1",
      jobTitle: "Senior Product Manager",
      company: "Pulse Analytics Suite",
      location: "Seattle, WA",
      startDate: "2021-01",
      endDate: "",
      current: true,
      highlights: [
        "Spearheaded product strategy and release of AI-driven forecasting tool, reaching 60,000 MAUs within 90 days of launch.",
        "Conducted 100+ user interviews, transforming qualitative friction points into high-impact feature backlog items.",
        "Partnered with Engineering and UX leads to optimize onboarding flow, lifting 30-day user activation from 34% to 58%.",
      ],
    },
  ],
  skillCategories: [
    {
      id: "cat-prod-1",
      categoryName: "Product Management",
      skills: ["Product Vision & Roadmap", "User Research & Discovery", "GTM Strategy", "A/B Testing", "OKRs & KPIs", "PRD Authoring"],
    },
    {
      id: "cat-prod-2",
      categoryName: "Analytics & Prototyping",
      skills: ["Amplitude", "Mixpanel", "SQL", "Figma", "Jira", "Segment", "FullStory"],
    },
  ],
  settings: {
    ...SAMPLE_RESUME.settings,
    template: "product-manager",
    accentColor: "#4f46e5",
  },
};

const BUSINESS_DEV_SAMPLE: ResumeData = {
  ...SAMPLE_RESUME,
  id: "sample-biz-dev",
  title: "Head of Business Development Resume",
  personalInfo: {
    fullName: "Rajesh Kannan",
    jobTitle: "Director of Business Development",
    email: "rajesh.kannan@example.com",
    phone: "+91 98400 55667",
    location: "Chennai, Tamil Nadu",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    linkedin: "https://linkedin.com/in/rajeshkannan-bd",
  },
  summary:
    "High-energy Business Development leader with 9+ years generating $25M+ in enterprise sales pipeline and strategic alliance partnerships across APAC and EMEA. Proven closer with deep expertise in contract negotiations and channel partner ecosystems.",
  settings: {
    ...SAMPLE_RESUME.settings,
    template: "business-development",
    accentColor: "#059669",
  },
};

const OPERATIONS_MGR_SAMPLE: ResumeData = {
  ...SAMPLE_RESUME,
  id: "sample-ops-mgr",
  title: "Operations Manager Resume",
  personalInfo: {
    fullName: "David Miller",
    jobTitle: "Senior Operations Manager",
    email: "david.miller@example.com",
    phone: "+1 (312) 555-0177",
    location: "Chicago, IL",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    linkedin: "https://linkedin.com/in/davidmiller-ops",
  },
  summary:
    "Operations leader with Lean Six Sigma Black Belt certification and 8+ years optimizing manufacturing, logistics, and corporate business workflows. Reduced annual operating expenditures by $1.4M while boosting on-time order fulfillment to 99.4%.",
  settings: {
    ...SAMPLE_RESUME.settings,
    template: "operations-manager",
    accentColor: "#334155",
  },
};

// Category C: Marketing & Creative
const DIGITAL_MARKETING_SAMPLE: ResumeData = {
  ...SAMPLE_RESUME,
  id: "sample-digital-marketing",
  title: "Digital Marketing Specialist Resume",
  personalInfo: {
    fullName: "Chloe Martinez",
    jobTitle: "Performance Marketing & Growth Lead",
    email: "chloe.martinez@example.com",
    phone: "+1 (212) 555-0155",
    location: "New York, NY",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    linkedin: "https://linkedin.com/in/chloemartinez-growth",
    website: "https://chloemartinez.marketing",
  },
  summary:
    "Data-driven Digital Marketing Strategist with 6+ years managing $3.5M+ annual ad budgets across Google, Meta, and LinkedIn Ads. Scaled customer acquisition while dropping Blended CPA by 34% and sustaining an average 4.8x ROAS for high-growth e-commerce and SaaS brands.",
  experiences: [
    {
      id: "exp-dm-1",
      jobTitle: "Lead Performance Marketing Manager",
      company: "Vantage Growth Agency",
      location: "New York, NY",
      startDate: "2022-02",
      endDate: "",
      current: true,
      highlights: [
        "Scaled monthly paid media spend from $40K to $220K while improving ROAS from 2.9x to 5.2x.",
        "Built multi-touch attribution dashboards in GA4 and BigQuery to trace full-funnel LTV.",
        "Executed 45+ creative A/B experiments across video reels and static banners, increasing CTR by 42%.",
      ],
    },
  ],
  skillCategories: [
    {
      id: "cat-dm-1",
      categoryName: "Channels & Acquisition",
      skills: ["Google Ads (Search/PMax)", "Meta Ads Manager", "SEO / Organic Search", "LinkedIn Ads", "Email Automation (Klaviyo)"],
    },
    {
      id: "cat-dm-2",
      categoryName: "Analytics & CRO",
      skills: ["Google Analytics 4", "Google Tag Manager", "Hotjar", "Optimizely", "Semrush", "Ahrefs"],
    },
  ],
  settings: {
    ...SAMPLE_RESUME.settings,
    template: "digital-marketing",
    accentColor: "#ea580c",
  },
};

const SOCIAL_MEDIA_MGR_SAMPLE: ResumeData = {
  ...SAMPLE_RESUME,
  id: "sample-social-media",
  title: "Social Media Manager Resume",
  personalInfo: {
    fullName: "Aanya Gupta",
    jobTitle: "Senior Social Media Strategist",
    email: "aanya.gupta@example.com",
    phone: "+91 99112 33445",
    location: "Mumbai, Maharashtra",
    photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    linkedin: "https://linkedin.com/in/aanyagupta",
    website: "https://aanyasocial.co",
  },
  summary:
    "Creative Social Media Manager who has scaled organic brand communities to over 750K combined followers across Instagram, TikTok, and LinkedIn. Proven talent for viral short-form storytelling and community engagement resulting in 180% year-over-year follower growth.",
  settings: {
    ...SAMPLE_RESUME.settings,
    template: "social-media-manager",
    accentColor: "#db2777",
  },
};

const SALES_EXECUTIVE_SAMPLE: ResumeData = {
  ...SAMPLE_RESUME,
  id: "sample-sales-exec",
  title: "Enterprise Sales Executive Resume",
  personalInfo: {
    fullName: "James Peterson",
    jobTitle: "Senior Enterprise Account Executive",
    email: "james.peterson@example.com",
    phone: "+1 (303) 555-0128",
    location: "Denver, CO",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    linkedin: "https://linkedin.com/in/jamespeterson-sales",
  },
  summary:
    "Top-performing Enterprise Account Executive with 7 consecutive years exceeding annual quota (average 132% attainment). Closed $14M in ARR contracts with Fortune 500 accounts utilizing MEDDPICC qualification and consultative solution selling.",
  settings: {
    ...SAMPLE_RESUME.settings,
    template: "sales-executive",
    accentColor: "#059669",
  },
};

const UI_UX_DESIGNER_SAMPLE: ResumeData = {
  ...SAMPLE_RESUME,
  id: "sample-ui-ux",
  title: "Senior UI/UX Product Designer Resume",
  personalInfo: {
    fullName: "Elena Rostova",
    jobTitle: "Senior Product & UI/UX Designer",
    email: "elena.rostova@design.io",
    phone: "+1 (415) 555-0112",
    location: "San Francisco, CA / Remote",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    linkedin: "https://linkedin.com/in/elenarostova-ux",
    website: "https://elenarostova.design",
  },
  summary:
    "Human-centered UI/UX Designer with 6+ years creating intuitive digital products across mobile and web. Architect of comprehensive design systems adopted by 40+ engineers, improving feature release speed by 30% while maintaining WCAG 2.1 AA accessibility standards.",
  experiences: [
    {
      id: "exp-ux-1",
      jobTitle: "Staff Product Designer",
      company: "Luminary Cloud Apps",
      location: "San Francisco, CA",
      startDate: "2022-03",
      endDate: "",
      current: true,
      highlights: [
        "Redesigned enterprise collaborative workspace resulting in a 44% decrease in customer support tickets.",
        "Built modular component library in Figma with autolayout and design tokens synced directly to code.",
        "Facilitated 24 remote usability testing sessions and translated findings into iterative design prototypes.",
      ],
    },
  ],
  skillCategories: [
    {
      id: "cat-ux-1",
      categoryName: "Design & Prototyping",
      skills: ["Figma (Design Systems, Auto Layout)", "Wireframing & Prototyping", "Information Architecture", "Micro-interactions", "User Journey Mapping"],
    },
    {
      id: "cat-ux-2",
      categoryName: "Research & Strategy",
      skills: ["Usability Testing", "User Interviews", "Heuristic Evaluation", "A/B Concept Testing", "WCAG AA Accessibility"],
    },
  ],
  settings: {
    ...SAMPLE_RESUME.settings,
    template: "ui-ux-designer",
    accentColor: "#e11d48",
  },
};

const GRAPHIC_DESIGNER_SAMPLE: ResumeData = {
  ...SAMPLE_RESUME,
  id: "sample-graphic-designer",
  title: "Brand & Graphic Designer Resume",
  personalInfo: {
    fullName: "Liam O'Connor",
    jobTitle: "Senior Brand & Visual Designer",
    email: "liam.oconnor@creative.com",
    phone: "+1 (512) 555-0164",
    location: "Austin, TX",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    linkedin: "https://linkedin.com/in/liamoconnor-art",
    website: "https://liamdesign.portfolio.com",
  },
  summary:
    "Award-winning Visual Designer specializing in corporate brand identities, editorial layout, and packaging. Expert across Adobe Creative Cloud (Photoshop, Illustrator, InDesign) with a portfolio of 50+ launched commercial brand identity programs.",
  settings: {
    ...SAMPLE_RESUME.settings,
    template: "graphic-designer",
    accentColor: "#8b5cf6",
  },
};

// Category D: Data, AI & Tech
const DATA_ANALYST_SAMPLE: ResumeData = {
  ...SAMPLE_RESUME,
  id: "sample-data-analyst",
  title: "Lead Data Analyst Resume",
  personalInfo: {
    fullName: "Tanya Sen",
    jobTitle: "Senior Business Intelligence & Data Analyst",
    email: "tanya.sen@example.com",
    phone: "+91 98301 77665",
    location: "Kolkata, West Bengal",
    photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    linkedin: "https://linkedin.com/in/tanyasen-data",
    github: "https://github.com/tanyasen-analytics",
  },
  summary:
    "Data Analyst with 5+ years building scalable SQL data models, automated ETL workflows, and interactive Tableau dashboards. Extracted insights across 50M+ customer transactional records, identifying $2.3M in revenue expansion opportunities.",
  experiences: [
    {
      id: "exp-da-1",
      jobTitle: "Lead Data Analyst",
      company: "DataMatrix Technologies",
      location: "Kolkata, West Bengal",
      startDate: "2021-06",
      endDate: "",
      current: true,
      highlights: [
        "Wrote complex SQL queries, window functions, and CTEs to structure reporting tables in Snowflake.",
        "Created 15 executive dashboards in Tableau used weekly by 200+ decision makers to monitor churn metrics.",
        "Automated recurring Python data validation pipelines, reducing manual Excel reporting hours by 85%.",
      ],
    },
  ],
  skillCategories: [
    {
      id: "cat-da-1",
      categoryName: "Technical & Databases",
      skills: ["SQL (PostgreSQL, Snowflake, BigQuery)", "Python (Pandas, NumPy)", "ETL / Data Modeling", "Git"],
    },
    {
      id: "cat-da-2",
      categoryName: "BI & Visualization",
      skills: ["Tableau", "Power BI", "Excel (VBA, Power Query)", "Looker", "Cohort & Funnel Analysis"],
    },
  ],
  settings: {
    ...SAMPLE_RESUME.settings,
    template: "data-analyst",
    accentColor: "#0284c7",
  },
};

const DATA_SCIENTIST_SAMPLE: ResumeData = {
  ...SAMPLE_RESUME,
  id: "sample-data-scientist",
  title: "Senior Data Scientist Resume",
  personalInfo: {
    fullName: "Dr. Ethan Wright",
    jobTitle: "Principal Data Scientist",
    email: "ethan.wright@example.com",
    phone: "+1 (617) 555-0193",
    location: "Boston, MA",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    linkedin: "https://linkedin.com/in/ethanwright-phd",
    github: "https://github.com/ethanwright-ml",
  },
  summary:
    "Ph.D. Data Scientist with 7+ years developing predictive machine learning algorithms, customer lifetime value models, and causal inference frameworks. Deployed recommendation engines serving 10M+ daily predictions with 99.9% uptime.",
  settings: {
    ...SAMPLE_RESUME.settings,
    template: "data-scientist",
    accentColor: "#0f766e",
  },
};

const AI_ML_ENGINEER_SAMPLE: ResumeData = {
  ...SAMPLE_RESUME,
  id: "sample-ai-ml",
  title: "Machine Learning & AI Engineer Resume",
  personalInfo: {
    fullName: "Aarav Mehta",
    jobTitle: "Senior AI & Machine Learning Engineer",
    email: "aarav.mehta@ai-labs.io",
    phone: "+91 99000 88776",
    location: "Hyderabad, Telangana",
    photoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80",
    github: "https://github.com/aaravmehta-ai",
    linkedin: "https://linkedin.com/in/aaravmehta",
  },
  summary:
    "AI Engineer with 5+ years training and serving production deep learning models and LLM agent architectures. Built low-latency inference pipelines with vLLM, TensorRT, and PyTorch, processing 400 requests/sec with under 50ms p95 latency.",
  experiences: [
    {
      id: "exp-aiml-1",
      jobTitle: "Lead AI Engineer",
      company: "NeuralPulse Systems",
      location: "Hyderabad, Telangana",
      startDate: "2022-07",
      endDate: "",
      current: true,
      highlights: [
        "Fine-tuned open-source LLMs (Llama 3, Mistral) on domain-specific datasets using LoRA and QLoRA.",
        "Architected Retrieval-Augmented Generation (RAG) vector search pipelines using LangChain, pgvector, and FastAPI.",
        "Reduced inference latency by 45% through 4-bit quantization and model pruning.",
      ],
    },
  ],
  skillCategories: [
    {
      id: "cat-aiml-1",
      categoryName: "Deep Learning & AI",
      skills: ["PyTorch", "TensorFlow", "Transformers (Hugging Face)", "LLM Fine-Tuning (LoRA)", "LangChain / LlamaIndex", "Vector DBs (Milvus, pgvector)"],
    },
    {
      id: "cat-aiml-2",
      categoryName: "MLOps & Cloud",
      skills: ["Docker", "Kubernetes", "vLLM", "Triton Inference Server", "MLflow", "AWS SageMaker", "CUDA"],
    },
  ],
  settings: {
    ...SAMPLE_RESUME.settings,
    template: "ai-ml-engineer",
    accentColor: "#6366f1",
  },
};

const CYBERSECURITY_SAMPLE: ResumeData = {
  ...SAMPLE_RESUME,
  id: "sample-cybersecurity",
  title: "Cybersecurity Analyst Resume",
  personalInfo: {
    fullName: "Nikhil Joshi",
    jobTitle: "Senior Cybersecurity & SOC Analyst (CISSP, CEH)",
    email: "nikhil.joshi@secops.net",
    phone: "+91 97234 55667",
    location: "Pune, Maharashtra",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    linkedin: "https://linkedin.com/in/nikhiljoshi-sec",
  },
  summary:
    "Certified Information Systems Security Professional (CISSP) with 6+ years defending enterprise infrastructures. Monitored SIEM log pipelines, mitigated 140+ active threat incidents, and spearheaded ISO 27001 and SOC 2 Type II compliance audits.",
  settings: {
    ...SAMPLE_RESUME.settings,
    template: "cybersecurity-analyst",
    accentColor: "#0f172a",
  },
};

const IT_SUPPORT_SAMPLE: ResumeData = {
  ...SAMPLE_RESUME,
  id: "sample-it-support",
  title: "IT Support Specialist Resume",
  personalInfo: {
    fullName: "Carlos Gomez",
    jobTitle: "Tier 2 IT Systems Support Specialist (CompTIA A+)",
    email: "carlos.gomez@example.com",
    phone: "+1 (602) 555-0187",
    location: "Phoenix, AZ",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    linkedin: "https://linkedin.com/in/carlosgomez-it",
  },
  summary:
    "Customer-first IT Support Specialist with 5 years resolving 3,500+ tickets in Jira and ServiceNow across macOS, Windows 11, and Linux environments. Maintained 99.2% SLA compliance and configured secure Active Directory user access.",
  settings: {
    ...SAMPLE_RESUME.settings,
    template: "it-support",
    accentColor: "#1e3a8a",
  },
};

// Category E: Finance & Professional Services
const ACCOUNTANT_SAMPLE: ResumeData = {
  ...SAMPLE_RESUME,
  id: "sample-accountant",
  title: "Senior Accountant (CPA) Resume",
  personalInfo: {
    fullName: "Meera Agarwal",
    jobTitle: "Senior Corporate Accountant (CPA)",
    email: "meera.agarwal@example.com",
    phone: "+91 98200 44556",
    location: "Mumbai, Maharashtra",
    photoUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
    linkedin: "https://linkedin.com/in/meera-agarwal-cpa",
  },
  summary:
    "Detail-oriented Certified Public Accountant (CPA) with 7+ years managing general ledger, multi-currency balance sheet reconciliations, and tax compliance under US GAAP and IFRS. Reduced monthly financial close cycle from 10 days to 4 days.",
  settings: {
    ...SAMPLE_RESUME.settings,
    template: "accountant",
    accentColor: "#1e293b",
  },
};

const FINANCIAL_ANALYST_SAMPLE: ResumeData = {
  ...SAMPLE_RESUME,
  id: "sample-financial-analyst",
  title: "Financial Analyst Resume",
  personalInfo: {
    fullName: "Zachary Taylor",
    jobTitle: "Senior FP&A Financial Analyst (CFA Level II)",
    email: "zachary.taylor@finance.com",
    phone: "+1 (212) 555-0162",
    location: "New York, NY",
    photoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80",
    linkedin: "https://linkedin.com/in/zacharytaylor-cfa",
  },
  summary:
    "Financial Analyst with 6+ years constructing discounted cash flow (DCF) models, corporate operating budgets, and variance forecasts for $100M+ revenue business divisions. Advised C-suite leadership on M&A targets and capital allocation strategies.",
  settings: {
    ...SAMPLE_RESUME.settings,
    template: "financial-analyst",
    accentColor: "#0f766e",
  },
};

const HUMAN_RESOURCES_SAMPLE: ResumeData = {
  ...SAMPLE_RESUME,
  id: "sample-hr",
  title: "HR Business Partner Resume",
  personalInfo: {
    fullName: "Sonia Kapoor",
    jobTitle: "Senior HR Business Partner (SHRM-SCP)",
    email: "sonia.kapoor@example.com",
    phone: "+91 98101 22334",
    location: "New Delhi, Delhi",
    photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    linkedin: "https://linkedin.com/in/soniakapoor-hr",
  },
  summary:
    "Strategic HRBP with 8+ years scaling organizational talent, fostering inclusive company culture, and managing employee relations across 650+ tech employees. Reduced voluntary attrition by 18% through revamped performance reviews and retention programs.",
  settings: {
    ...SAMPLE_RESUME.settings,
    template: "human-resources",
    accentColor: "#4f46e5",
  },
};

const CUSTOMER_SERVICE_SAMPLE: ResumeData = {
  ...SAMPLE_RESUME,
  id: "sample-customer-service",
  title: "Customer Support Specialist Resume",
  personalInfo: {
    fullName: "Jessica Brown",
    jobTitle: "Customer Success & Service Specialist",
    email: "jessica.brown@example.com",
    phone: "+1 (407) 555-0149",
    location: "Orlando, FL",
    photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    linkedin: "https://linkedin.com/in/jessicabrown-cs",
  },
  summary:
    "Empathetic Customer Service professional with 5+ years handling high-volume omnichannel ticketing (Zendesk, Salesforce). Maintained a 98.4% CSAT rating and resolved 75% of customer inquiries on first touch.",
  settings: {
    ...SAMPLE_RESUME.settings,
    template: "customer-service",
    accentColor: "#0284c7",
  },
};

const CONTENT_WRITER_SAMPLE: ResumeData = {
  ...SAMPLE_RESUME,
  id: "sample-content-writer",
  title: "Content Writer & Strategist Resume",
  personalInfo: {
    fullName: "Maya Lin",
    jobTitle: "Senior B2B SaaS Content Writer",
    email: "maya.lin@wordsmith.io",
    phone: "+1 (503) 555-0176",
    location: "Portland, OR / Remote",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    linkedin: "https://linkedin.com/in/mayalin-writer",
    website: "https://mayalin.contently.com",
  },
  summary:
    "Strategic Content Writer with 6+ years driving organic growth for enterprise tech brands. Published 200+ long-form articles, whitepapers, and case studies, generating 1.2M organic views and 18,000 marketing qualified leads (MQLs).",
  settings: {
    ...SAMPLE_RESUME.settings,
    template: "content-writer",
    accentColor: "#7c3aed",
  },
};

// Category F: Other Important Professional Careers
const HEALTHCARE_SAMPLE: ResumeData = {
  ...SAMPLE_RESUME,
  id: "sample-healthcare",
  title: "Healthcare Registered Nurse (RN) Resume",
  personalInfo: {
    fullName: "Sarah Jenkins, BSN, RN",
    jobTitle: "Registered Nurse - Critical Care (ICU / ER)",
    email: "sarah.jenkins.rn@hospital.org",
    phone: "+1 (615) 555-0131",
    location: "Nashville, TN",
    photoUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
    linkedin: "https://linkedin.com/in/sarahjenkins-rn",
  },
  summary:
    "Compassionate Registered Nurse (BSN, RN) with 6+ years of ICU clinical experience. Certified in BLS, ACLS, and PALS with proven leadership in patient triage, medication administration, multi-parameter hemodynamics monitoring, and electronic health records (Epic, Cerner).",
  experiences: [
    {
      id: "exp-nurse-1",
      jobTitle: "Staff Nurse - Intensive Care Unit (ICU)",
      company: "St. Thomas Health Medical Center",
      location: "Nashville, TN",
      startDate: "2021-03",
      endDate: "",
      current: true,
      highlights: [
        "Delivered critical care for up to 3 ventilated and hemodynamically unstable patients per shift.",
        "Served as Unit Charge Nurse directing nursing staff allocations and patient bed telemetry assignments.",
        "Zero medication errors over 3 consecutive clinical quarters, achieving 99% patient satisfaction score.",
      ],
    },
  ],
  education: [
    {
      id: "edu-nurse-1",
      degree: "Bachelor of Science in Nursing (BSN)",
      institution: "Vanderbilt University School of Nursing",
      location: "Nashville, TN",
      startDate: "2015-08",
      endDate: "2019-05",
      current: false,
      gpa: "3.85 / 4.0",
      highlights: ["Dean's List for Academic Honor", "Sigma Theta Tau International Honor Society of Nursing"],
    },
  ],
  skillCategories: [
    {
      id: "cat-nurse-1",
      categoryName: "Clinical Skills",
      skills: ["Critical Care & Triage", "Ventilator Management", "IV Infusion & Phlebotomy", "Hemodynamic Monitoring", "Wound Care"],
    },
    {
      id: "cat-nurse-2",
      categoryName: "Certifications & Systems",
      skills: ["Registered Nurse (RN) - Active State License", "ACLS & BLS Certified", "Epic Systems EHR", "Cerner PowerChart", "HIPAA Compliance"],
    },
  ],
  settings: {
    ...SAMPLE_RESUME.settings,
    template: "healthcare-professional",
    accentColor: "#0f766e",
  },
};

const TEACHER_SAMPLE: ResumeData = {
  ...SAMPLE_RESUME,
  id: "sample-teacher",
  title: "Secondary School Educator Resume",
  personalInfo: {
    fullName: "Pooja Hegde",
    jobTitle: "High School Mathematics & Science Teacher",
    email: "pooja.hegde@edu.org",
    phone: "+91 98450 11998",
    location: "Bengaluru, Karnataka",
    photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    linkedin: "https://linkedin.com/in/poojahegde-teacher",
  },
  summary:
    "Dedicated High School Educator with 7+ years teaching STEM subjects, fostering student engagement through inquiry-based learning, and raising standardized board exam pass rates from 82% to 97%. Recognized as Teacher of the Year in 2024.",
  settings: {
    ...SAMPLE_RESUME.settings,
    template: "teacher",
    accentColor: "#2563eb",
  },
};

const MECHANICAL_ENGINEER_SAMPLE: ResumeData = {
  ...SAMPLE_RESUME,
  id: "sample-mech-eng",
  title: "Mechanical Design Engineer Resume",
  personalInfo: {
    fullName: "Karan Singhania",
    jobTitle: "Senior Mechanical Design Engineer",
    email: "karan.singhania@engineering.com",
    phone: "+91 98111 88776",
    location: "Chennai, Tamil Nadu",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    linkedin: "https://linkedin.com/in/karansinghania-mech",
  },
  summary:
    "Mechanical Design Engineer with 6+ years designing automotive and aerospace components using SolidWorks, AutoCAD, and ANSYS FEA. Engineered structural lightweighting solutions that lowered component weight by 14% while exceeding ISO crash test safety ratings.",
  settings: {
    ...SAMPLE_RESUME.settings,
    template: "mechanical-engineer",
    accentColor: "#334155",
  },
};

const HR_RECRUITER_SAMPLE: ResumeData = {
  ...SAMPLE_RESUME,
  id: "sample-recruiter",
  title: "Technical Recruiter Resume",
  personalInfo: {
    fullName: "Rachel Adams",
    jobTitle: "Senior Technical Talent Recruiter",
    email: "rachel.adams@talentgrowth.com",
    phone: "+1 (206) 555-0138",
    location: "Seattle, WA",
    photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    linkedin: "https://linkedin.com/in/racheladams-recruiter",
  },
  summary:
    "Full-cycle Technical Recruiter who has hired 120+ senior software engineers, data scientists, and product managers across hyper-growth tech companies. Maintained an average time-to-hire of 26 days and a 92% offer acceptance rate.",
  settings: {
    ...SAMPLE_RESUME.settings,
    template: "hr-recruiter",
    accentColor: "#4f46e5",
  },
};

const EXECUTIVE_SAMPLE: ResumeData = {
  ...SAMPLE_RESUME,
  id: "sample-executive",
  title: "Chief Executive Officer / VP Resume",
  personalInfo: {
    fullName: "Alexander Sterling",
    jobTitle: "Chief Executive Officer / Managing Director",
    email: "alexander.sterling@sterlingholdings.com",
    phone: "+1 (212) 555-0100",
    location: "New York, NY",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    linkedin: "https://linkedin.com/in/alexandersterling-ceo",
  },
  summary:
    "Visionary C-Suite Executive with 18+ years driving global enterprise growth, corporate governance, and digital transformation. Scaled business operations across 12 countries with full P&L accountability for $85M+ annual budgets, delivering 3 consecutive exits and 28% compounded annual EBITDA growth.",
  experiences: [
    {
      id: "exp-exec-1",
      jobTitle: "Chief Executive Officer",
      company: "Apex Global Holdings",
      location: "New York, NY",
      startDate: "2019-01",
      endDate: "",
      current: true,
      highlights: [
        "Orchestrated corporate turnaround, expanding top-line revenue from $24M to $78M within 4 fiscal years.",
        "Supervised 450+ global personnel across engineering, sales, marketing, and operations.",
        "Negotiated 2 strategic M&A acquisitions, creating synergies that boosted corporate valuation by 3.2x.",
      ],
    },
  ],
  skillCategories: [
    {
      id: "cat-exec-1",
      categoryName: "Executive Leadership",
      skills: ["P&L Management ($85M+)", "Corporate Governance", "Mergers & Acquisitions (M&A)", "Strategic Scaling", "Investor Relations"],
    },
  ],
  settings: {
    ...SAMPLE_RESUME.settings,
    template: "executive",
    accentColor: "#0f172a",
  },
};

export const SAMPLE_RESUMES_MAP: Record<string, ResumeData> = {
  // A: Students
  student: STUDENT_SAMPLE,
  fresher: FRESHER_SAMPLE,
  internship: INTERNSHIP_SAMPLE,
  graduate: GRADUATE_SAMPLE,
  "career-change": CAREER_CHANGE_SAMPLE,
  // B: Business
  "business-analyst": BUSINESS_ANALYST_SAMPLE,
  "project-manager": PROJECT_MANAGER_SAMPLE,
  "product-manager": PRODUCT_MANAGER_SAMPLE,
  "business-development": BUSINESS_DEV_SAMPLE,
  "operations-manager": OPERATIONS_MGR_SAMPLE,
  // C: Marketing
  "digital-marketing": DIGITAL_MARKETING_SAMPLE,
  "social-media-manager": SOCIAL_MEDIA_MGR_SAMPLE,
  "sales-executive": SALES_EXECUTIVE_SAMPLE,
  "ui-ux-designer": UI_UX_DESIGNER_SAMPLE,
  "graphic-designer": GRAPHIC_DESIGNER_SAMPLE,
  // D: Data & AI
  "data-analyst": DATA_ANALYST_SAMPLE,
  "data-scientist": DATA_SCIENTIST_SAMPLE,
  "ai-ml-engineer": AI_ML_ENGINEER_SAMPLE,
  "cybersecurity-analyst": CYBERSECURITY_SAMPLE,
  "it-support": IT_SUPPORT_SAMPLE,
  // E: Finance
  accountant: ACCOUNTANT_SAMPLE,
  "financial-analyst": FINANCIAL_ANALYST_SAMPLE,
  "human-resources": HUMAN_RESOURCES_SAMPLE,
  "customer-service": CUSTOMER_SERVICE_SAMPLE,
  "content-writer": CONTENT_WRITER_SAMPLE,
  // F: Other
  "healthcare-professional": HEALTHCARE_SAMPLE,
  teacher: TEACHER_SAMPLE,
  "mechanical-engineer": MECHANICAL_ENGINEER_SAMPLE,
  "hr-recruiter": HR_RECRUITER_SAMPLE,
  executive: EXECUTIVE_SAMPLE,
};

export function getSampleResumeForTemplate(templateId: ResumeTemplateId): ResumeData {
  const match = SAMPLE_RESUMES_MAP[templateId];
  if (match) return match;

  // Fallbacks for legacy template keys
  if (templateId === "student") return STUDENT_SAMPLE;
  if (templateId === "tech") return AI_ML_ENGINEER_SAMPLE;
  if (templateId === "creative") return UI_UX_DESIGNER_SAMPLE;
  if (templateId === "executive") return EXECUTIVE_SAMPLE;
  if (templateId === "ats") return DATA_ANALYST_SAMPLE;
  if (templateId === "modern") return PRODUCT_MANAGER_SAMPLE;

  return SAMPLE_RESUME;
}
