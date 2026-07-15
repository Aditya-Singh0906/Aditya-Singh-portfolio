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
    slug: 'ci-cd-platform',
    name: 'End-to-End CI/CD Automation Platform',
    tagline: 'GitHub → Jenkins → Docker → Kubernetes',
    status: 'Production-style',
    year: '2025',
    stack: ['Jenkins','Docker','Kubernetes','GitHub Actions','AWS','Python','Bash'],
    highlights: [
      'Deployment time reduced from 30 minutes to under 5',
      '40+ zero-touch releases across 3 microservices',
      'Rolling updates with zero downtime'
    ],
    overview: 'A fully automated delivery pipeline that takes a commit from GitHub and lands it in a Kubernetes cluster without a human in the loop. Designed as the reference blueprint I would take into any team building a modern release process.',
    problem: 'Manual deploys were the single biggest source of release friction — long, error-prone, and inconsistent across environments. The team needed a repeatable path from commit to production with clear guardrails.',
    solution: 'GitHub webhooks trigger a Jenkins pipeline that builds multi-stage Docker images, runs test stages, pushes to a registry, and deploys to Kubernetes with rolling updates. Everything is described in code and lives with the app.',
    architecture: [
      'GitHub webhook → Jenkins controller',
      'Jenkinsfile with build, test, image, deploy stages',
      'Multi-stage Dockerfiles for lean images',
      'Kubernetes Deployments with rolling strategy',
      'Services and Ingress for east-west + north-south traffic',
      'CloudWatch + logs for post-deploy verification'
    ],
    challenges: 'Getting rollout health checks right without flapping — solved with readiness probes tuned per service and a small validation stage after apply. Standardizing environment configs to prevent drift across dev/staging/prod.',
    lessons: 'Pipelines are a product. Treat them like one: tests, ownership, and observability. The cheapest deploy is the one you never have to think about.',
    future: 'Add ArgoCD for GitOps-style continuous delivery, integrate policy checks with OPA, and wire in progressive delivery via canary + Argo Rollouts.',
    github: '#',
    demo: '#'
  },
  {
    slug: 'terraform-aws-platform',
    name: 'Terraform AWS Infrastructure Platform',
    tagline: 'Reusable modules · Remote state · Zero-drift environments',
    status: 'Shipped',
    year: '2025',
    stack: ['Terraform','AWS','EC2','VPC','IAM','S3','DynamoDB','Route 53'],
    highlights: [
      'Full AWS environment stood up in under 5 minutes',
      'Reusable modules across dev, staging, prod',
      'Remote state on S3 with DynamoDB locking'
    ],
    overview: 'A modular Terraform codebase that provisions a production-shaped AWS environment — VPC, subnets, routing, EC2 workloads, security groups, and IAM — from a single terraform apply.',
    problem: 'Click-ops was slowing down experimentation. Every new environment took hours of manual setup and drifted within a week. A codified, repeatable pattern was needed.',
    solution: 'Extracted every piece of infrastructure into small, opinionated modules with sane defaults. Each environment is a thin composition layer that only overrides what is different. State lives remotely with locking.',
    architecture: [
      'Root modules per environment (dev/staging/prod)',
      'VPC module: subnets, IGW, NAT, route tables',
      'Compute module: EC2 + security groups + IAM instance profiles',
      'Storage module: S3 buckets with versioning + lifecycle',
      'Backend: S3 (state) + DynamoDB (lock)',
      'CI validation: terraform fmt, validate, plan on PR'
    ],
    challenges: 'Balancing flexibility and opinion in module design — too flexible becomes copy-paste, too opinionated blocks legitimate use cases. Landed on a small set of required inputs and rich defaults.',
    lessons: 'Terraform is a communication tool as much as a provisioning tool. Reviewable plans matter more than clever HCL. Small modules > mega modules.',
    future: 'Add Terragrunt for cleaner environment composition, integrate cost estimation into plans, and layer in Sentinel/OPA policy checks.',
    github: '#',
    demo: '#'
  },
  {
    slug: 'aws-monitoring',
    name: 'AWS Infrastructure Monitoring & Auto-Alerting',
    tagline: 'CloudWatch · SNS · Bash · Self-healing scripts',
    status: 'Shipped',
    year: '2025',
    stack: ['AWS CloudWatch','EC2','SNS','Bash','Linux'],
    highlights: [
      'MTTD cut by ~60% across production resources',
      'Auto-restart scripts eliminated 80% of manual intervention',
      'Runbooks for 10 common failure modes'
    ],
    overview: 'A pragmatic monitoring stack for a small AWS footprint — dashboards, thresholded alerts, and Bash-based health-check daemons that recover services before humans get paged.',
    problem: 'Small teams cannot afford to babysit servers. Alerts were noisy or missing, and the same failures happened over and over with the same manual fix.',
    solution: 'CloudWatch dashboards for CPU, memory, disk, and app-level metrics. SNS topics for tiered alerting. Bash health-check scripts run under systemd with idempotent restart logic and structured logs.',
    architecture: [
      'CloudWatch Agent on EC2 for OS + app metrics',
      'Dashboards per service, alarms per SLO',
      'SNS topics: warn (email) and page (later PagerDuty)',
      'systemd-managed health-check scripts',
      'Central log aggregation with rotation'
    ],
    challenges: 'Avoiding alert fatigue while still catching real issues. Solved by tuning thresholds against a two-week baseline and using multi-metric alarms.',
    lessons: 'Observability is a habit, not a tool. The best runbook is the one written before you needed it.',
    future: 'Move to Prometheus + Grafana for richer querying, add distributed tracing, and formalize SLOs with error budgets.',
    github: '#',
    demo: '#'
  },
  {
    slug: 'novus-ai',
    name: 'Novus AI — Autonomous DevOps Task Assistant',
    tagline: 'Concept · LLM-driven ops automation',
    status: 'Concept · In progress',
    year: '2025',
    stack: ['Python','OpenAI / LLM APIs','Automation','System Operations'],
    highlights: [
      'Executes 50+ scoped system-level operations safely',
      'Handles 15+ repetitive ops tasks end-to-end',
      'Logged, auditable command execution'
    ],
    overview: 'A Python assistant that reads a natural-language operational request, plans a set of system commands, executes them under strict guardrails, and reports back with logs and outcomes. The direction I want to take further into enterprise AI automation.',
    problem: 'Ops teams spend a large share of their week on repeatable, well-scoped tasks — log rotations, backups, restart flows, capacity checks. That is exactly the shape of work LLMs plus tool-use should absorb.',
    solution: 'A structured plan-then-execute loop with an allowlist of commands, dry-run mode, and rich logging. The LLM proposes, a policy layer approves, and a subprocess runner executes with timeouts and output capture.',
    architecture: [
      'Intent parser (LLM) → structured task graph',
      'Policy engine: allowlist + guardrails + dry-run',
      'Executor: subprocess w/ timeouts, stdout/stderr capture',
      'Logger: JSONL audit trail per task',
      'Reporter: human-readable summary + artifacts'
    ],
    challenges: 'Making LLM output safe to execute is the whole problem. The answer is boring engineering: schemas, validation, allowlists, dry-runs, and never trusting free-form strings inside a shell.',
    lessons: 'AI in ops is mostly about narrowing the surface area, not widening it. The value is in reliable, boring automation — not clever demos.',
    future: 'Expand to an agentic workflow across cloud APIs (AWS SDK, kubectl, terraform), add a review UI for approvals, and integrate with incident tooling.',
    github: '#',
    demo: '#'
  }
]

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
