import React from 'react';

/**
 * @typedef {Object} HelpSupportItem
 * @property {string} title - The title of the help item
 * @property {string} description - Description text
 * @property {string} [url] - Optional URL for the link
 * @property {string} clickable - Text for clickable element
 * @property {Function} [onClick] - Optional click handler
 */

/**
 * Help and Support Component
 * Displays help and support information
 * 
 * @component
 * @example
 * ```jsx
 * <HelpSupport />
 * ```
 */
export { default as HelpSupport } from './components/ProfileOptions/HelpAndSupportSection/HelpSupport.jsx';

/**
 * @typedef {Object} AccountSectionProps
 * Add your prop types here
 */

/**
 * Account Section Component
 * Manages user account information
 * 
 * @component
 * @example
 * ```jsx
 * <AccountSection />
 * ```
 */
export { default as AccountSection } from './components/ProfileOptions/Account/AccountSection.jsx';

/**
 * Makes API requests with configured options
 * 
 * @function
 * @param {Object} options - Request configuration
 * @param {string} options.url - The API endpoint
 * @param {string} [options.method='GET'] - HTTP method
 * @param {Object} [options.data] - Request payload
 * @returns {Promise<any>} The API response
 * 
 * @example
 * ```js
 * const response = await requestCaller({
 *   url: '/api/endpoint',
 *   method: 'POST',
 *   data: { key: 'value' }
 * });
 * ```
 */
export { default as requestCaller } from './api-handlers/request-handler.js';

/**
 * Current package version
 * @constant {string}
 */
export const version = '1.0.0';
