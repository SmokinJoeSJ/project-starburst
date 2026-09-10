// Current published sources are recorded in docs/brand-and-trust-review.md.
// Publication is not a substitute for owner confirmation before launch.
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
    title: 'Food Truck Support',
    description:
      'Help provide fresh food to families. Contact the pantry for upcoming opportunities.',
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

// Names/titles match the published Wix About page as checked September 10, 2026.
// Owner confirmation remains a launch gate; no biographies are inferred.
export const people = {
  staff: [
    { name: 'Connie Koepke', title: 'Pantry Manager' },
    { name: 'Allan Bauman', title: 'Assistant Pantry Manager' },
  ],
  board: [
    { name: 'Alice Bandstra', title: 'President' },
    { name: 'Russ Nehmer', title: 'Vice President' },
    { name: 'Dee Van Horn', title: 'Secretary' },
    { name: 'Dave Scott', title: 'Treasurer' },
    { name: 'Felicia Bielecki', title: '' },
    { name: 'Laura Veersma', title: '' },
    { name: 'Joie Cole', title: '' },
    { name: 'Steve Cole', title: '' },
  ],
} as const;
export const communityPartners = [
  { name: 'United Way', image: '/assets/united-way.jpg' },
  {
    name: 'Fremont Area Community Foundation',
    image: '/assets/fremont-area.jpg',
  },
] as const;
export const starburstPhotos = {
  community: {
    src: '/assets/11062b_f1a4368086de462db72b31ae85053474~mv2_d_5760_3840_s_4_2.jpg',
    alt: 'A group of people gathered outside a house',
    width: 1920,
    height: 1280,
  },
  giving: {
    src: '/assets/11062b_e2da2b9b2d074ff8ab9a452d009d5c7f~mv2.jpg',
    alt: 'People passing bags and supplies across a donation table',
    width: 1920,
    height: 1280,
  },
  volunteer: {
    src: '/assets/1691a921dfec4d4f8637b1c7ffa2528a.jpg',
    alt: 'People sorting food together outdoors',
    width: 1920,
    height: 1280,
  },
} as const;
