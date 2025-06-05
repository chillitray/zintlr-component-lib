import React from 'react';

/**
 * @typedef {Object} HelpSupportProps
 * Add your prop types here
 */

/**
 * Help and Support Component
 * @param {HelpSupportProps} props
 */
export { default as HelpSupport } from './components/ProfileOptions/HelpAndSupportSection/HelpSupport.jsx';

/**
 * @typedef {Object} AccountSectionProps
 * Add your prop types here
 */

/**
 * Account Section Component
 * @param {AccountSectionProps} props
 */
export { default as AccountSection } from './components/ProfileOptions/Account/AccountSection.jsx';

/**
 * API request handler utility
 * @param {Object} options Request options
 * @returns {Promise<any>} API response
 */
export { default as requestCaller } from './api-handlers/request-handler.js';

/**
 * Package version
 * @type {string}
 */
export const version = '1.0.0';
