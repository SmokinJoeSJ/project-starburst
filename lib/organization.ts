// Approved public content retained from the repository and the live Wix pages.
// Content provenance and items needing owner review: docs/core-actions-review.md.
export const organization = {
  name: 'Project Starburst',
  founded: '1971',
  counties: 'Mecosta and Osceola counties',
  phone: {
    display: '(231) 796-5342',
    number: '+12317965342',
    href: 'tel:+12317965342',
  },
  email: 'br@projectstarburst.org',
  emailHref: 'mailto:br@projectstarburst.org',
  address: {
    street: '120 S. State Street',
    city: 'Big Rapids',
    state: 'MI',
    zip: '49307',
    mailingBox: 'P.O. Box 313',
    full: '120 S. State Street, Big Rapids, MI 49307',
    entry:
      'Located in the United Church of Big Rapids. Please use the parking lot door and take the elevator to the bottom floor.',
  },
  hours: { days: 'Monday, Wednesday & Friday', time: '10 AM – 4 PM' },
  directions:
    'https://www.google.com/maps/search/?api=1&query=Project+Starburst+120+S+State+St+Big+Rapids+MI',
  mapEmbed:
    'https://maps.google.com/maps?q=Project%20Starburst%20120%20S%20State%20Street%20Big%20Rapids%20MI&t=m&z=16&output=embed&iwloc=near',
  facebook: 'https://www.facebook.com/ProjectStarburst',
  taxStatement:
    'Project Starburst is a 501(c)(3) nonprofit organization. Your donations are tax-deductible to the fullest extent of the law.',
  localGivingStatement:
    'Because we are community-based and locally funded, 100% of your donation goes toward feeding and assisting neighbors in Mecosta and Osceola counties.',
  volunteerApplication: {
    href: '/documents/volunteer-application.pdf',
    format: 'PDF',
    size: '187 KB',
    pages: 1,
    updated: 'August 9, 2024',
    hoursOnForm: 'Monday–Friday, 10 AM–4 PM',
    communityService:
      'If you are looking to complete community service, you must still apply in person.',
  },
} as const;

// These are existing published figures, not newly verified current statistics.
// Retain original labels and differences (including the meals "+" sign).
export const reportedImpact = {
  needsOwnerReview: true,
  reportingPeriod: null,
  individuals: '14,350',
  meals: '574,000',
  mealsWithPlus: '574,000+',
  families: '3,561',
  clients: '705',
} as const;

export const acceptedGoods = [
  { title: 'Food for the pantry', items: 'Canned and dry food items.' },
  {
    title: 'Personal care',
    items: 'Toiletries, including soap, shampoo, and toothpaste.',
  },
  { title: 'Baby supplies', items: 'Diapers, wipes, and formula.' },
  {
    title: 'Household essentials',
    items: 'Cleaning products and paper goods.',
  },
] as const;

export const volunteerOpportunities = [
  {
    title: 'Monthly Food Truck',
    description:
      'Help provide fresh food to families on the third Friday of each month.',
    icon: 'truck',
  },
  {
    title: 'Organize a Food Drive',
    description:
      'Bring your workplace, school, or community together to collect non-perishable food and essential items.',
    icon: 'basket',
  },
  {
    title: 'Group Volunteering',
    description:
      'Give back with your business, organization, or student group.',
    icon: 'people',
  },
  {
    title: 'Court-Ordered Community Service',
    description:
      'Complete meaningful community service. You must apply in person.',
    icon: 'hands',
  },
  {
    title: 'Unload & Organize Food Shipments',
    description: 'Help unload deliveries and organize supplies in the pantry.',
    icon: 'box',
  },
  {
    title: 'Food Distribution',
    description: 'Help distribute food to families at the pantry.',
    icon: 'heart',
  },
] as const;
