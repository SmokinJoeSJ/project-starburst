import { organization } from './organization';
// Public integration settings. Never put secret API keys in this file.
export const siteConfig = {
  // Delivery is protected independently of the editable public email label.
  email: 'br@projectstarburst.org',
  phone: organization.phone.number,
  facebook: organization.facebook,
  // Add a customer-chooses-amount Stripe Payment Link when it is available.
  stripePaymentLink: '',
};
