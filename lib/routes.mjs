export const publicRoutes = [
  '/',
  '/about-us',
  '/contact',
  '/donate',
  '/get-help',
  '/volunteer',
  '/soupersupper',
  '/souper-supper',
  '/event-details/souper-supper',
];
export const canonicalRoutes = publicRoutes.filter(
  (route) => route !== '/souper-supper',
);
