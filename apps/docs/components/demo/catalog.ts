export const demoPages = [
  {
    slug: '',
    title: 'Overview',
    category: 'Workspace',
    description: 'Revenue, orders, and activity in one workspace.',
  },
  {
    slug: 'analytics',
    title: 'Analytics',
    category: 'Workspace',
    description: 'Explore revenue trends and acquisition channels.',
  },
  {
    slug: 'orders',
    title: 'Orders',
    category: 'Workspace',
    description: 'Search, sort, filter, and export transactions.',
  },
  {
    slug: 'customers',
    title: 'Customers',
    category: 'Workspace',
    description: 'Manage relationships and inspect customer records.',
  },
  {
    slug: 'projects',
    title: 'Projects',
    category: 'Workspace',
    description: 'Plan work with a board and a table view.',
  },
  {
    slug: 'activity',
    title: 'Activity',
    category: 'Workspace',
    description: 'Follow changes across the sample workspace.',
  },
  {
    slug: 'team',
    title: 'Team',
    category: 'Account',
    description: 'Invite teammates and manage member roles.',
  },
  {
    slug: 'settings',
    title: 'Settings',
    category: 'Account',
    description: 'Workspace details, preferences, and notifications.',
  },
  {
    slug: 'profile',
    title: 'Profile',
    category: 'Account',
    description: 'A personal profile with an editable account.',
  },
  {
    slug: 'billing',
    title: 'Billing',
    category: 'Commerce',
    description: 'Compare sample plans, usage, and invoices.',
  },
  {
    slug: 'checkout',
    title: 'Checkout',
    category: 'Commerce',
    description: 'Plan selection through a complete demo receipt.',
  },
  {
    slug: 'sign-in',
    title: 'Sign in',
    category: 'Getting started',
    description: 'Sign-in, registration, and password-recovery states.',
  },
  {
    slug: 'onboarding',
    title: 'Onboarding',
    category: 'Getting started',
    description: 'A guided workspace setup in three steps.',
  },
] as const;
export const demoPath = (slug: string) => '/demo' + (slug ? '/' + slug : '');
export const samplePlans = {
  starter: {
    name: 'Starter',
    price: 0,
    projects: 3,
    description: 'A small space to get started.',
    features: ['3 projects', 'Basic reporting', 'Community support'],
  },
  pro: {
    name: 'Pro',
    price: 29,
    projects: 50,
    description: 'Room for a growing team.',
    features: ['50 projects', 'Advanced reporting', 'Priority support'],
  },
  business: {
    name: 'Business',
    price: 79,
    projects: 250,
    description: 'More capacity for complex work.',
    features: ['250 projects', 'Custom workflows', 'Dedicated support'],
  },
} as const;
export type PlanKey = keyof typeof samplePlans;
export const money = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(value);
export const dateLabel = (value: string) =>
  new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(value.length === 10 ? value + 'T12:00:00Z' : value));
