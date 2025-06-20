// State management using module-level variables (functional approach)
let validators = {};
let isInitialized = false;
let validatorPath = 'api-handlers/validators.js';

/**
 * Load validators from the specific validators.js file
 * @param {string} path - Path to validators file
 * @returns {Promise<Object>} - Loaded validators object
 */
async function loadValidatorsFromFile(path) {
  try {
    // Try different possible paths for the validators file
    const possiblePaths = [
      path,
      `../${path}`,
      `../../${path}`,
      `./${path}`,
      `src/${path}`,
      `lib/${path}`,
    ];

    for (const importPath of possiblePaths) {
      try {
        const module = await import(importPath);
        if (module.default && typeof module.default === 'object') {
          console.log(`✅ Validators loaded from: ${importPath}`);
          return module.default;
        }
      } catch (importError) {
        // Continue to next path
        continue;
      }
    }

    console.warn('❌ No validators found in any of the attempted paths');
    return {};
  } catch (error) {
    console.warn('Failed to load validators:', error.message);
    return {};
  }
}

/**
 * Auto-detect validators from the specific validators.js file
 * @param {Object} options - Configuration options
 * @param {string} options.validatorPath - Custom path to validators file
 * @returns {Promise<Object>} - Object containing all found validators
 */
export async function autoDetectValidatorsHandler(options = {}) {
  const { validatorPath: customPath = validatorPath } = options;

  if (isInitialized) {
    return validators;
  }

  try {
    const loadedValidators = await loadValidatorsFromFile(customPath);

    if (loadedValidators && Object.keys(loadedValidators).length > 0) {
      validators = loadedValidators;
      isInitialized = true;
      console.log(`✅ Successfully loaded ${Object.keys(validators).length} validators`);
      return validators;
    } else {
      console.warn('❌ No validators found in the specified file');
      isInitialized = true;
      return {};
    }
  } catch (error) {
    console.warn('Auto-detection of validators failed:', error.message);
    isInitialized = true;
    return {};
  }
}

/**
 * Get validator for a specific endpoint
 * @param {string} endpoint - The API endpoint
 * @returns {Object|null} - Validator schema for the endpoint
 */
export function getValidatorForEndpoint(endpoint) {
  return validators[endpoint] || null;
}

/**
 * Check if a validator exists for an endpoint
 * @param {string} endpoint - The API endpoint
 * @returns {boolean} - Whether validator exists
 */
export function hasValidatorForEndpoint(endpoint) {
  return endpoint in validators;
}

/**
 * Get all available endpoints that have validators
 * @returns {string[]} - Array of endpoint strings
 */
export function getAvailableEndpoints() {
  return Object.keys(validators);
}

/**
 * Add custom validators manually
 * @param {Object} customValidators - Object containing endpoint -> schema mappings
 */
export function addCustomValidators(customValidators) {
  validators = { ...validators, ...customValidators };
  console.log('✅ Custom validators added');
}

/**
 * Set custom validator path
 * @param {string} path - Path to validators file
 */
export function setValidatorPath(path) {
  validatorPath = path;
  console.log(`✅ Validator path set to: ${path}`);
}

/**
 * Get current validator path
 * @returns {string} - Current validator path
 */
export function getValidatorPath() {
  return validatorPath;
}

/**
 * Get current validators state
 * @returns {Object} - Current validators object
 */
export function getValidators() {
  return validators;
}

/**
 * Check if validators are initialized
 * @returns {boolean} - Whether validators are initialized
 */
export function isValidatorsInitialized() {
  return isInitialized;
}

/**
 * Reset the validator state (useful for testing)
 */
export function resetValidators() {
  validators = {};
  isInitialized = false;
  validatorPath = 'api-handlers/validators.js';
  console.log('✅ Validator state reset');
}

// Create a convenience object for backward compatibility
export const validatorAutoDetector = {
  autoDetectValidatorsHandler,
  getValidatorForEndpoint,
  hasValidatorForEndpoint,
  getAvailableEndpoints,
  addCustomValidators,
  setValidatorPath,
  getValidatorPath,
  getValidators,
  isInitialized: isValidatorsInitialized,
  reset: resetValidators,
};

export default validatorAutoDetector;
