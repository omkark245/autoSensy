import { BarChart3, Globe, TrendingUp, Zap } from 'lucide-react'

export const ASSET_VERSION = '20260321c'
export const HERO_EASY_INTEGRATION_IMAGE = '/assets/svg/easy-integration-1-1-e1741594017522.webp'
export const HERO_SECTION_IMAGE = '/assets/svg/hero-section-image-1536x840.webp'

export const MAIN_ROUTES = [
  { path: '/', label: 'Home' },
  { path: '/features', label: 'Features' },
  { path: '/use-cases', label: 'Use Cases' },
  { path: '/pricing', label: 'Pricing' },
  { path: '/contact', label: 'Contact' },
]

export const HERO_STATS = [
  { display: 'AI', label: 'AI-Powered Chatbots', icon: TrendingUp },
  { display: 'Multi', label: 'Multi-Tenant Dashboard', icon: BarChart3 },
  { display: 'API', label: 'Seamless Integration', icon: Zap },
  { display: '24/7', label: 'WhatsApp API Support', icon: Globe },
]

export const HOME_FEATURE_CARDS = [
  {
    title: 'Flow Maker',
    text: 'Build bot conversations easily and effectively with an advanced visual flow builder.',
    image: '/assets/features/iteration-1.webp',
    alt: 'Flow maker feature icon',
  },
  {
    title: 'Templates',
    text: 'Create and manage approved templates directly in the app without switching tools.',
    image: '/assets/features/windows.webp',
    alt: 'Templates feature icon',
  },
  {
    title: 'Campaigns',
    text: 'Launch and manage campaign journeys effortlessly with built-in campaign controls.',
    image: '/assets/features/campaign.webp',
    alt: 'Campaigns feature icon',
  },
  {
    title: 'Auto Replies',
    text: 'Send instant automatic replies to common customer questions and keep responses fast across WhatsApp conversations.',
    image: '/assets/features/chatbot.webp',
    alt: 'Auto replies feature icon',
  },
]

export const PRODUCT_MODULES = [
  {
    title: 'WhatsApp Marketing',
    intro: 'Run campaigns, segments and retargeting journeys with template-compliant broadcasting.',
    points: ['Campaign scheduler', 'Audience segmentation', 'Template performance analytics', 'Re-engagement automation'],
  },
  {
    title: 'WhatsApp Chatbot',
    intro: 'Build no-code chat journeys for qualification, support and reminders.',
    points: ['Drag-drop flow builder', 'Fallback and handoff logic', 'Lead scoring actions', 'Conversation templates'],
  },
  {
    title: 'WhatsApp Forms',
    intro: 'Collect user data, intent and booking inputs within chat conversations.',
    points: ['Custom field forms', 'Lead qualification sequences', 'CRM sync ready events', 'Instant webhook callbacks'],
  },
  {
    title: 'WhatsApp Payments',
    intro: 'Collect payments and recover drop-offs using automated nudges.',
    points: ['Payment link generation', 'Reminder automation', 'Failed transaction follow-up', 'Agent-assisted closure'],
  },
]

export const PRICING_PLANS = [
  {
    name: 'Subscription Plan',
    highlight: 'Monthly and yearly billing',
    status: 'active',
    options: [
      { label: 'Monthly', price: 'Rs. 500', cadence: 'per month' },
      { label: 'Yearly', price: 'Rs. 5,000', cadence: 'per year' },
    ],
    points: ['Choose a flexible monthly plan or a lower annual billing option', 'Suitable for businesses that want predictable recurring subscriptions', 'Built for ongoing platform usage with simple billing cycles'],
  },
  {
    name: 'Lifetime Plan',
    price: 'Contact Us on WhatsApp',
    cadence: 'to discuss lifetime plan details',
    highlight: 'Message us for plan details',
    status: 'whatsapp-contact',
    whatsappHref: 'https://wa.me/919960756292?text=Hi%20AutoSensy%2C%20I%20want%20to%20know%20about%20the%20Lifetime%20Plan.',
    points: ['Message our team to get lifetime plan details', 'Share your business needs and setup requirements', 'Get pricing, onboarding, and next steps directly on WhatsApp'],
  },
]

export const TESTIMONIALS = [
  {
    quote: 'AutoSensy has made it much easier for our team to handle student enquiries and follow up on time. Everything stays in one place, so we are not jumping between chats anymore.',
    company: 'ITRoots',
    clientCompany: 'Education and training',
    rating: 5,
    initials: 'RP',
    personName: 'Rahul Naik',
    personRole: 'Founder, ITRoots',
    personImage: '/assets/img/Rahul_Naik.avif',
  },
  {
    quote: 'We were looking for a simpler way to manage policy leads on WhatsApp, and AutoSensy has helped a lot. Follow-ups are faster now, and the team can respond without missing conversations.',
    company: 'InsuranceMajha',
    clientCompany: 'Insurance services',
    rating: 5,
    initials: 'PJ',
    personName: 'Pooja Mohite',
    personRole: 'Director, InsuranceMajha',
    personImage: '/assets/img/femal.jpg',
  },
  {
    quote: 'AutoSensy helps us keep customer chats and follow-ups properly organized. It has reduced a lot of manual back-and-forth for the team and made daily communication smoother.',
    company: 'Mechnnovation Technologies',
    clientCompany: 'Technology services',
    rating: 5,
    initials: 'AK',
    personName: 'Prasad Kulkarni',
    personRole: 'CEO, Mechnnovation Technologies',
    personImage: '/assets/profiles/arjun-kulkarni.png',
  },
]

export const USE_CASE_CARDS = [
  {
    title: 'Marketing Agencies',
    image: '/assets/use-cases/img13.webp',
    alt: 'Personalized product recommendation WhatsApp use case',
    about: 'Send personalized product suggestions based on customer purchases and browsing behavior. Improve repeat sales with timely WhatsApp recommendations.',
  },
  {
    title: 'Banking & Finance', 
    image: '/assets/use-cases/img11.webp',
    alt: 'Banking and finance WhatsApp automation use case',
    about: 'Automate payment reminders, fee collection, and payment link sharing through WhatsApp. Improve customer communication and speed up financial follow-ups.',
  },
  {
    title: 'Restaurants & Food Businesses',
    image: '/assets/use-cases/img14.webp',
    alt: 'Restaurant order and payment WhatsApp use case',
    about: 'Take customer orders, confirm totals, and share payment links directly in WhatsApp. Make ordering faster and more convenient.',
  },
  {
    title: 'Home Decor & Furnishing',
    image: '/assets/use-cases/img8.webp',
    alt: 'Order update and feedback WhatsApp use case',
    about: 'Share order updates, shipment tracking, and feedback requests through WhatsApp. Keep customers informed after every purchase.',
  },
  {
    title: 'E-commerce',
    image: '/assets/use-cases/img9.webp',
    alt: 'Invoice delivery WhatsApp use case',
    about: 'Deliver invoices and billing confirmations instantly on WhatsApp. Make records easy to access and reduce manual follow-up.',
  },
  {
    title: 'Health & Wellness', 
    image: '/assets/use-cases/img6.webp',
    alt: 'Website WhatsApp chat widget use case',
    about: 'Convert website visitors into live WhatsApp conversations with a one-click chat widget. Improve inquiry handling and lead capture.',
  },
  {
    title: 'Beauty & Cosmetics',
    image: '/assets/use-cases/img4.webp',
    alt: 'WhatsApp product catalog selling use case',
    about: 'Show products in catalog format and let customers browse and buy through WhatsApp. Support faster product discovery and sales.',
  },
  {
    title: 'Spa & Salons',
    image: '/assets/use-cases/img7.webp',
    alt: 'Instagram to WhatsApp conversion use case',
    about: 'Move social media leads into WhatsApp for bookings, follow-ups, and payments. Turn ad engagement into direct customer conversations.',
  },
  {
    title: 'Travel & Tourism',
    image: '/assets/use-cases/img5.webp',
    alt: 'Travel booking WhatsApp campaign use case',
    about: 'Promote travel offers, collect booking interest, and share trip details through WhatsApp. Keep travelers engaged from inquiry to confirmation.',
  },
  {
    title: 'Education',
    image: '/assets/use-cases/img3.webp',
    alt: 'Education timetable broadcast WhatsApp use case',
    about: 'Broadcast timetable updates, exam schedules, and class reminders on WhatsApp. Keep students and parents updated instantly.',
  },
  {
    title: 'Real Estate',
    image: '/assets/use-cases/img2.webp',
    alt: 'Real estate brochure sharing WhatsApp use case',
    about: 'Share brochures, loan details, and property information instantly on WhatsApp. Help prospects move faster from inquiry to site visit.',
  },
  {
    title: 'Automotive Industry',
    image: '/assets/use-cases/img1.webp',
    alt: 'Automobile service reminder WhatsApp use case',
    about: 'Send service reminders, maintenance alerts, and booking prompts through WhatsApp. Improve customer retention with timely follow-ups.',
  },
]

export const FEATURES_LIST = [
  'Template Broadcast',
  'Campaign Scheduler',
  'Journey Automation',
  'Team Inbox',
  'Chatbot Builder',
  'Performance Analytics',
]

export const HERO_BENEFITS = [
  'Campaign automation',
  'Chatbot flows',
  'Template messaging',
]

export const WHY_WHATSAPP_POINTS = [
  {
    title: '98% Open Rates',
    detail: 'WhatsApp messages get seen fast and opened more often.',
  },
  {
    title: 'Faster qualification',
    detail: 'Bots and quick replies help qualify leads instantly.',
  },
  {
    title: 'Personal follow-up',
    detail: 'Send reminders, replies, and updates in one simple flow.',
  },
  {
    title: '45-60% Click Rates',
    detail: 'Interactive messages drive more clicks and customer action.',
  },
  {
    title: '70% Engagement Rate',
    detail: 'Customers engage more with direct and personal conversations.',
  },
]

export const ONBOARDING_STEPS = [
  {
    title: 'Create your workspace',
    description: 'Set up your business profile, team access, and onboarding preferences in a guided flow.',
    meta: 'Ready in a few minutes',
  },
  {
    title: 'Connect your WhatsApp number',
    description: 'Get help with number setup, verification, and template readiness so messaging starts cleanly.',
    meta: 'Official API onboarding support',
  },
  {
    title: 'Launch your first automation',
    description: 'Start with broadcasts, lead routing, or chatbot flows using launch-ready templates and checks.',
    meta: 'Go live with guided activation',
  },
]
