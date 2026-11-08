/**
 * Universal External Forms Configuration
 * 
 * 1. SUBMIT_GROUP (JoinGroupLinks):
 *    Form: "Social Media Group Directory Submission"
 *    Purpose: Submit WhatsApp, Telegram, Arattai, Instagram & Facebook group links.
 * 
 * 2. REGISTER_BUSINESS (Nammabus Local Biz):
 *    Form: "Business Registration Form"
 *    Purpose: Register local merchants, technicians, shops, catering, wedding photography & stores.
 */

export const FORMS_CONFIG = {
  // Social Media Group Directory Submission (WhatsApp / Telegram / Arattai / Instagram)
  submitGroup: {
    shortUrl: 'https://forms.gle/oZzitWMZ8xtB9rmx5',
    embedUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfSQfwEK0ui8gYez8o7WIlASQ4ZxMwfI8oCZZolcH61ePE1Rg/viewform?embedded=true',
    title: 'Social Media Group Directory Submission',
    description: 'Submit your group or channel to add it to our directory.',
  },

  // Business Registration Form (Nammabus Local Business Directory: ₹0 Free Merchant Listing)
  registerBusiness: {
    shortUrl: 'https://forms.gle/FVQVofUVejQ2ebiA7',
    embedUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdss74aRQE4ee65YfpPs7sGYH-UKdAxSp-q-556dJnhXwIl8w/viewform?embedded=true',
    title: 'Business Registration Form',
    description: 'Register your local business, technician services, or retail store.',
  },
} as const;

export const SUBMIT_GROUP_URL = FORMS_CONFIG.submitGroup.shortUrl;
export const SUBMIT_GROUP_EMBED_URL = FORMS_CONFIG.submitGroup.embedUrl;

export const REGISTER_BUSINESS_URL = FORMS_CONFIG.registerBusiness.shortUrl;
export const REGISTER_BUSINESS_EMBED_URL = FORMS_CONFIG.registerBusiness.embedUrl;
