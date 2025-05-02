/**
 * EmailJS Configuration
 *
 * This file contains the configuration for EmailJS. In a production environment,
 * these values should be set using environment variables.
 */

/**
 * The EmailJS service ID from your EmailJS dashboard.
 * In production, use: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
 */
export const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;

/**
 * The EmailJS template ID from your EmailJS dashboard.
 * In production, use: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
 */
export const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;

/**
 * The EmailJS public key from your EmailJS dashboard.
 * In production, use: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
 */
export const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

/**
 * Validates if all required EmailJS configuration values are present.
 * @returns {boolean} True if all configuration values are present and not placeholder values.
 */
export const isEmailJSConfigured = (): boolean => {
  const isServiceIdValid = Boolean(EMAILJS_SERVICE_ID);
  const isTemplateIdValid = Boolean(EMAILJS_TEMPLATE_ID);
  const isPublicKeyValid = Boolean(EMAILJS_PUBLIC_KEY);

  return isServiceIdValid && isTemplateIdValid && isPublicKeyValid;
};
