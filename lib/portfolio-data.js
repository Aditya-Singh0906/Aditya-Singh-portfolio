export const PROFILE = {
  name: 'Aditya Singh',
  firstName: 'Aditya',
  role: 'DevOps & Cloud Engineer',
  subtitle: 'Platform Engineering · AI Automation',
  location: 'Indore, Madhya Pradesh, India',
  email: 'adityasingh.work09@gmail.com',
  phone: '+91 79872 26211',
  githubUsername: 'Aditya-Singh0906',
  github: 'https://github.com/Aditya-Singh0906',
  linkedin: 'https://www.linkedin.com/in/aditya-singh-a3646b257/',
  resume: '/resume.pdf',
  siteUrl: 'https://adityasingh.dev',
  available: true,
  tagline: 'Building reliable cloud infrastructure, scalable deployment pipelines, and automation that helps engineering teams move faster.'
}

export const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'github', label: 'GitHub' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' }
]

export const EXTERNAL_NAV = [
  { href: '/blog', label: 'Blog' }
]

export const SKILLS = [
  {
    category: 'Cloud (AWS)',
    icon: 'Cloud',
    accent: 'from-blue-500/20 to-blue-500/0',
    items: ['EC2','S3','IAM','VPC','CloudWatch','Route 53','SNS','ALB','Security Groups']
  },
  {
    category: 'Containers & Orchestration',
    icon: 'Container',
    accent: 'from-cyan-500/20 to-cyan-500/0',
    items: ['Docker','Multi-stage Builds','Kubernetes','Deployments','Services','Secrets','ConfigMaps','Rolling Updates','Helm']
  },
  {
    category: 'CI/CD',
    icon: 'GitBranch',
    accent: 'from-indigo-500/20 to-indigo-500/0',
    items: ['Jenkins','Pipeline as Code','GitHub Actions','Git','Automated Build/Test/Deploy','ArgoCD','GitLab CI']
  },
  {
    category: 'Infrastructure as Code',
    icon: 'Boxes',
    accent: 'from-violet-500/20 to-violet-500/0',
    items: ['Terraform','Reusable Modules','Remote State','Ansible','Bash Scripting','Provisioning']
  },
  {
    category: 'Observability',
    icon: 'Activity',
    accent: 'from-emerald-500/20 to-emerald-500/0',
    items: ['Prometheus','Grafana','CloudWatch','Log Analysis','Alerting','Runbooks','SLOs']
  },
  {
    category: 'Languages & Databases',
    icon: 'Code2',
    accent: 'from-amber-500/20 to-amber-500/0',
    items: ['Python','Bash','Linux','MongoDB','MySQL','PostgreSQL']
  },
  {
    category: 'Security',
    icon: 'ShieldCheck',
    accent: 'from-rose-500/20 to-rose-500/0',
    items: ['IAM Roles & Policies','Least-Privilege','Security Groups','Secret Management','Network Isolation']
  },
  {
    category: 'AI Automation',
    icon: 'Sparkles',
    accent: 'from-sky-500/20 to-sky-500/0',
    items: ['LLM Integrations','Agentic Workflows','OpenAI APIs','Prompt Engineering','Automated Ops']
  }
]


export const PROJECTS = [
  {
    slug: "employee-management-cicd",
    name: "Enterprise Employee Management CI/CD Platform",
    tagline: "Production-style CI/CD with Docker, Jenkins, Kubernetes & AWS",
    status: "Completed",
    year: "2026",
    stack: [
      "Python",
      "Flask",
      "PostgreSQL",
      "Docker",
      "Jenkins",
      "GitHub Actions",
      "Kubernetes",
      "AWS",
      "Linux",
      "Bash"
    ],
    highlights: [
      "Built a production-style CI/CD pipeline from source code to deployment",
      "Containerized a Flask application with Docker and PostgreSQL",
      "Automated build and deployment workflows using Jenkins and GitHub Actions"
    ],
    overview:
      "A production-inspired employee management application built to demonstrate modern DevOps practices. The project showcases automated deployments, containerization, infrastructure orchestration, and cloud deployment using an enterprise workflow.",
    problem:
      "Development teams often rely on manual deployment processes that are difficult to reproduce and prone to configuration errors. The objective was to build a repeatable deployment pipeline similar to those used in real engineering teams.",
    solution:
      "Designed a complete CI/CD workflow using GitHub, Jenkins, Docker, Kubernetes, and AWS. The application is containerized, automatically tested and deployed, while PostgreSQL provides persistent storage.",
    architecture: [
      "GitHub repository as source control",
      "Jenkins Pipeline for automated CI/CD",
      "Docker containers for application and database",
      "PostgreSQL database",
      "Kubernetes manifests for deployment",
      "AWS EC2 deployment environment"
    ],
    challenges:
      "Troubleshooting Docker networking, Jenkins pipeline configuration, database migrations, and deployment consistency across environments provided valuable hands-on DevOps experience.",
    lessons:
      "Building reliable CI/CD pipelines requires careful attention to automation, repeatability, infrastructure consistency, and deployment validation.",
    future:
      "Integrate ArgoCD for GitOps, Helm charts for Kubernetes deployments, Prometheus & Grafana monitoring, SonarQube quality gates, and automated security scanning.",
    github: "",
    demo: ""
  },

  {
    slug: "terraform-aws-platform",
    name: "AWS Infrastructure Provisioning using Terraform",
    tagline: "Reusable Infrastructure as Code for AWS",
    status: "In Progress",
    year: "2026",
    stack: [
      "Terraform",
      "AWS",
      "VPC",
      "EC2",
      "IAM",
      "S3",
      "DynamoDB",
      "Route53"
    ],
    highlights: [
      "Modular Terraform architecture",
      "Remote state management using S3 and DynamoDB",
      "Reusable infrastructure for multiple environments"
    ],
    overview:
      "An Infrastructure as Code project focused on provisioning secure and reusable AWS infrastructure using Terraform best practices.",
    problem:
      "Manual infrastructure provisioning is difficult to scale and maintain. The project aims to standardize cloud infrastructure using reusable Terraform modules.",
    solution:
      "Infrastructure is organized into reusable modules with remote state stored in Amazon S3 and state locking handled through DynamoDB, enabling consistent deployments across environments.",
    architecture: [
      "Terraform Modules",
      "AWS VPC",
      "Public & Private Subnets",
      "EC2",
      "IAM Roles",
      "S3 Backend",
      "DynamoDB State Locking"
    ],
    challenges:
      "Designing reusable modules while maintaining flexibility across development and production environments.",
    lessons:
      "Infrastructure as Code improves consistency, collaboration, and repeatability while reducing manual configuration errors.",
    future:
      "Expand with EKS, ALB, Auto Scaling Groups, CloudFront, Route53, WAF, and GitHub Actions automation.",
    github: "",
    demo: ""
  },

  {
    slug: "kubernetes-platform",
    name: "Production Kubernetes Deployment Platform",
    tagline: "Container Orchestration with Kubernetes",
    status: "Planned",
    year: "2026",
    stack: [
      "Docker",
      "Kubernetes",
      "Helm",
      "NGINX Ingress",
      "Prometheus",
      "Grafana"
    ],
    highlights: [
      "Production-ready Kubernetes manifests",
      "Scalable container orchestration",
      "Monitoring and observability integration"
    ],
    overview:
      "A complete Kubernetes deployment platform demonstrating production deployment strategies, service discovery, monitoring, and scalability.",
    problem:
      "Running containers individually becomes difficult to manage as applications grow. Kubernetes provides orchestration, scaling, and self-healing capabilities required for production workloads.",
    solution:
      "Deploy applications using Kubernetes Deployments, Services, Ingress, ConfigMaps, Secrets, and Helm while integrating monitoring with Prometheus and Grafana.",
    architecture: [
      "Docker Images",
      "Kubernetes Cluster",
      "Deployments",
      "Services",
      "Ingress Controller",
      "Helm Charts",
      "Prometheus",
      "Grafana"
    ],
    challenges:
      "Learning production deployment patterns, networking, and Kubernetes resource management.",
    lessons:
      "Container orchestration is about reliability, scalability, and automation rather than simply running containers.",
    future:
      "Deploy on Amazon EKS with ArgoCD GitOps, Horizontal Pod Autoscaler, and centralized logging.",
    github: "",
    demo: ""
  },

  {
    slug: "novus-ai",
    name: "Novus AI — Intelligent DevOps Automation Assistant",
    tagline: "AI-powered DevOps & System Automation",
    status: "In Development",
    year: "2026",
    stack: [
      "Python",
      "OpenAI API",
      "Linux",
      "Automation",
      "Bash",
      "Docker"
    ],
    highlights: [
      "Natural language system automation",
      "AI-assisted DevOps operations",
      "Secure command execution workflow"
    ],
    overview:
      "Novus AI is an intelligent assistant designed to automate repetitive DevOps and system administration tasks using large language models while maintaining operational safety through validation and controlled execution.",
    problem:
      "System administrators spend significant time performing repetitive operational tasks that can be standardized and automated without sacrificing reliability.",
    solution:
      "The assistant interprets user requests, validates operations through predefined workflows, executes approved commands, and provides structured logs and execution summaries.",
    architecture: [
      "Natural Language Processing",
      "Task Planning Engine",
      "Command Validation Layer",
      "Execution Engine",
      "Logging System",
      "Response Generator"
    ],
    challenges:
      "Designing automation workflows that balance flexibility with safety while ensuring reliable execution.",
    lessons:
      "Successful AI automation depends as much on validation, guardrails, and observability as it does on language models.",
    future:
      "Expand into cloud automation, Kubernetes operations, Terraform execution, AWS SDK integration, and enterprise AI agents.",
    github: "",
    demo: ""
  }
];


export const EXPERIENCE = [
  {
    company: 'Zevo360 Technologies',
    role: 'DevOps Trainee',
    period: 'Jun 2025 — Present',
    location: 'Indore, India',
    summary: 'Owning delivery pipelines and AWS infrastructure across three environments for internal products.',
    points: [
      'Engineered and maintained 8 Jenkins CI/CD pipelines, cutting manual deployment time by ~75% and enabling multiple daily releases.',
      'Provisioned and managed AWS infrastructure (EC2, IAM, VPC, S3, CloudWatch) supporting dev, staging and production with 99%+ uptime.',
      'Built and optimised 25+ Docker images with multi-stage builds and layer caching — 35% smaller and faster to build.',
      'Automated ~12 recurring operational tasks (backups, log rotation, health checks) in Bash, saving 8–10 hours of manual work per week.',
      'Configured CloudWatch dashboards and alerts across 15+ resources, cutting mean-time-to-detect by ~60%.',
      'Deployed and scaled containerised workloads on Kubernetes, standardising environment configs to reduce rollback incidents.'
    ]
  }
]

export const CERTIFICATIONS = [
  { name: 'Cloud Computing Internship & Training', issuer: 'Codec Technology', period: 'Jul 2025 — Sep 2025', link: '#' },
  { name: 'Linux Administration Fundamentals', issuer: 'Great Learning', period: 'Oct 2025 — Nov 2025', link: '#' },
  { name: 'DevOps Internship & Training', issuer: 'Krutanic (Wipro Accredited)', period: 'Dec 2024 — Feb 2025', link: '#' },
  { name: 'Python Programming Certification', issuer: 'Udemy', period: 'Mar 2024 — May 2024', link: '#' }
]

export const EDUCATION = {
  institution: 'IPS Academy — Institute of Engineering & Science',
  degree: 'B.Tech, Computer Science & Information Technology',
  period: '2022 — 2026',
  cgpa: '8.52 / 10',
  location: 'Indore, India'
}

export const ACHIEVEMENTS = [
  'Solved 100+ DSA problems across LeetCode and GeeksforGeeks, sharpening the algorithmic reasoning that shows up in automation and infra design.',
  'Shipped 3+ end-to-end DevOps/Cloud projects with working, demo-able infrastructure across AWS, Docker, Kubernetes, Jenkins, and Linux.',
  'Eliminated manual deployment steps across 5+ projects by standardizing Jenkins + GitHub Actions pipelines.'
]
