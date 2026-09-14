import { approvedText } from './content/approved';
// Approved public content retained from the repository and the live Wix pages.
// Content provenance and items needing owner review: docs/core-actions-review.md.
export const organization = {
  name: approvedText('shared.name'),
  founded: approvedText('shared.founded'),
  counties: approvedText('shared.counties'),
  phone: {
    display: approvedText('shared.phone.display'),
    number: approvedText('shared.phone.number'),
    href: approvedText('shared.phone.href'),
  },
  email: approvedText('shared.email'),
  emailHref: approvedText('shared.email-href'),
  address: {
    street: approvedText('shared.address.street'),
    city: approvedText('shared.address.city'),
    state: approvedText('shared.address.state'),
    zip: approvedText('shared.address.zip'),
    mailingBox: approvedText('shared.address.mailing-box'),
    full: approvedText('shared.address.full'),
    entry: approvedText('shared.address.entry'),
  },
  hours: {
    days: approvedText('shared.hours.days'),
    time: approvedText('shared.hours.time'),
  },
  directions: approvedText('shared.directions'),
  mapEmbed: approvedText('shared.map-embed'),
  facebook: approvedText('shared.facebook'),
  taxStatement: approvedText('shared.tax-statement'),
  localGivingStatement: approvedText('shared.local-giving-statement'),
  volunteerApplication: {
    href: approvedText('shared.volunteer-application.href'),
    format: approvedText('shared.volunteer-application.format'),
    size: approvedText('shared.volunteer-application.size'),
    pages: 1,
    updated: approvedText('shared.volunteer-application.updated'),
    hoursOnForm: approvedText('shared.volunteer-application.hours-on-form'),
    communityService: approvedText(
      'shared.volunteer-application.community-service',
    ),
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
  {
    id: 'food',
    titleField: 'goods.food.title',
    title: approvedText('goods.food.title'),
    itemsField: 'goods.food.items',
    items: approvedText('goods.food.items'),
  },
  {
    id: 'personal-care',
    titleField: 'goods.personal-care.title',
    title: approvedText('goods.personal-care.title'),
    itemsField: 'goods.personal-care.items',
    items: approvedText('goods.personal-care.items'),
  },
  {
    id: 'baby',
    titleField: 'goods.baby.title',
    title: approvedText('goods.baby.title'),
    itemsField: 'goods.baby.items',
    items: approvedText('goods.baby.items'),
  },
  {
    id: 'household',
    titleField: 'goods.household.title',
    title: approvedText('goods.household.title'),
    itemsField: 'goods.household.items',
    items: approvedText('goods.household.items'),
  },
] as const;
export const volunteerOpportunities = [
  {
    id: 'food-truck',
    titleField: 'roles.food-truck.title',
    title: approvedText('roles.food-truck.title'),
    descriptionField: 'roles.food-truck.description',
    description: approvedText('roles.food-truck.description'),
    icon: 'truck',
  },
  {
    id: 'food-drive',
    titleField: 'roles.food-drive.title',
    title: approvedText('roles.food-drive.title'),
    descriptionField: 'roles.food-drive.description',
    description: approvedText('roles.food-drive.description'),
    icon: 'basket',
  },
  {
    id: 'groups',
    titleField: 'roles.groups.title',
    title: approvedText('roles.groups.title'),
    descriptionField: 'roles.groups.description',
    description: approvedText('roles.groups.description'),
    icon: 'people',
  },
  {
    id: 'community-service',
    titleField: 'roles.community-service.title',
    title: approvedText('roles.community-service.title'),
    descriptionField: 'roles.community-service.description',
    description: approvedText('roles.community-service.description'),
    icon: 'hands',
  },
  {
    id: 'shipments',
    titleField: 'roles.shipments.title',
    title: approvedText('roles.shipments.title'),
    descriptionField: 'roles.shipments.description',
    description: approvedText('roles.shipments.description'),
    icon: 'box',
  },
  {
    id: 'distribution',
    titleField: 'roles.distribution.title',
    title: approvedText('roles.distribution.title'),
    descriptionField: 'roles.distribution.description',
    description: approvedText('roles.distribution.description'),
    icon: 'heart',
  },
] as const;
