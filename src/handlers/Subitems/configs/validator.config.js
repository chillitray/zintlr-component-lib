// validation-config.js
let validationConfig = {};
let isConfigInitialized = false;

/**
 * Set validation configuration from consumer project
 * @param {Object} config - Validation configuration object
 */
export const setValidationConfig = (config) => {
    validationConfig = { ...config };
    isConfigInitialized = true;
    console.log('✅ Validation configuration set successfully');
    console.log(`📊 Configured ${Object.keys(config).length} validation rules`);
};

/**
 * Get validation schema for a specific endpoint
 * @param {string} endpoint - The endpoint/route key
 * @returns {Object|null} - Yup validation schema or null
 */
export const getValidationSchema = (endpoint) => {
    if (!isConfigInitialized) {
        console.warn('⚠️ Validation config not initialized. Call setValidationConfig() first.');
        return null;
    }

    const schema = validationConfig[endpoint];
    if (!schema) {
        console.warn(`⚠️ No validation schema found for endpoint: ${endpoint}`);
        return null;
    }

    return schema;
};

/**
 * Get all validation configurations
 * @returns {Object} - Complete validation config object
 */
export const getAllValidationSchemas = () => {
    return validationConfig;
};

/**
 * Check if config is initialized
 * @returns {boolean}
 */
export const isValidationConfigInitialized = () => {
    return isConfigInitialized;
};

/**
 * Reset configuration (useful for testing)
 */
export const resetValidationConfig = () => {
    validationConfig = {};
    isConfigInitialized = false;
};

// Export all functions
export const validationManager = {
    setValidationConfig,
    getValidationSchema,
    getAllValidationSchemas,
    isValidationConfigInitialized,
    resetValidationConfig,
};

export default validationManager;
