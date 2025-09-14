export const routes = {
  home: '/',
  services: '/services',
  consult: '/services/consult',
  resumeLinkedin: '/services/resume-linkedin',
  stopGettingGhosted: '/services/stop-getting-ghosted',
  mentorship: '/services/mentorship',
  about: '/about',
  book: '/book',
  faq: '/faq',
  contact: '/contact',
} as const;

export const navigation = [
  { name: 'Services', href: routes.services },
  { name: 'About', href: routes.about },
  { name: 'FAQ', href: routes.faq },
  { name: 'Contact', href: routes.contact },
] as const;

export const services = [
  {
    id: 'consult',
    name: '30-min Career Consult',
    price: '$50',
    description: "We'll review resume, LinkedIn, and interview style. Leave with 2–3 fixes.",
    learnMoreHref: routes.consult,
    bookHref: routes.book,
    features: [
      'Resume review',
      'LinkedIn profile check',
      'Interview style assessment',
      '2-3 actionable fixes',
    ],
  },
  {
    id: 'resume-linkedin',
    name: 'Resume + LinkedIn Polish',
    price: '$125',
    description: "I'll align your story across resume and profile. Includes a quick walkthrough call.",
    learnMoreHref: routes.resumeLinkedin,
    bookHref: routes.book,
    features: [
      'Resume optimization',
      'LinkedIn profile alignment',
      'Story consistency review',
      'Quick walkthrough call',
    ],
  },
  {
    id: 'accelerator',
    name: 'Stop Getting Ghosted',
    price: '$300',
    description: 'Baseline mock → coaching → final mock, recordings + notes. Walk in confident.',
    learnMoreHref: routes.stopGettingGhosted,
    bookHref: routes.book,
    features: [
      'Baseline mock interview',
      'Storytelling frameworks',
      'STAR answer training',
      'Final mock interview',
      'Recordings + detailed notes',
    ],
  },
  {
    id: 'mentorship',
    name: 'Monthly Mentorship',
    price: '$150/mo',
    description: 'Two 30-min sessions/month. Ongoing prep for interviews, negotiations, and growth.',
    learnMoreHref: routes.mentorship,
    bookHref: routes.book,
    features: [
      'Two 30-min sessions/month',
      'Interview prep',
      'Negotiation coaching',
      'Career growth planning',
    ],
  },
] as const;
