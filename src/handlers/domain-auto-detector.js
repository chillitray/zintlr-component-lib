// State management using module-level variables (functional approach)
let detectedDomain = null;
let isDomainInitialized = false;
let endpointsPath = 'endpoints.js';

/**
 * Load domain from the endpoints file
 * @param {string} path - Path to endpoints file
 * @returns {Promise<string|null>} - Detected domain or null
 */
async function loadDomainFromFile(path) {
  try {
    // Try different possible paths for the endpoints file
    const possiblePaths = [
      path,
      // Add constants folder paths
      `constants/${path}`,
      `../constants/${path}`,
      `../../constants/${path}`,
    ];

    for (const importPath of possiblePaths) {
      try {
        const module = await import(importPath);

        // Check for API_URL export
        if (module.FRONTEND_URL) {
          console.log(`✅ Domain loaded from: ${importPath}`);
          return module.FRONTEND_URL;
        }

        // Check for default export that might contain API_URL
        if (module.default && module.default.FRONTEND_URL) {
          console.log(`✅ Domain loaded from default export: ${importPath}`);
          return module.default.FRONTEND_URL;
        }

        // Check if the module itself is the API_URL
        if (typeof module === 'string' && module.includes('http')) {
          console.log(`✅ Domain loaded directly: ${importPath}`);
          return module;
        }
      } catch (importError) {
        // Continue to next path
        continue;
      }
    }

    console.warn('❌ No domain found in any of the attempted paths');
    return null;
  } catch (error) {
    console.warn('Failed to load domain:', error.message);
    return null;
  }
}

/**
 * Auto-detect domain from the endpoints file
 * @param {Object} options - Configuration options
 * @param {string} options.endpointsPath - Custom path to endpoints file
 * @returns {Promise<string|null>} - Detected domain or null
 */
export async function autoDetectDomainHandler(options = {}) {
  const { endpointsPath: customPath = endpointsPath } = options;

  if (isDomainInitialized) {
    return detectedDomain;
  }

  try {
    const domain = await loadDomainFromFile(customPath);

    if (domain) {
      detectedDomain = domain;
      isDomainInitialized = true;
      console.log(`✅ Successfully detected domain: ${domain}`);
      return domain;
    } else {
      console.warn('❌ No domain found in the specified file');
      isDomainInitialized = true;
      return null;
    }
  } catch (error) {
    console.warn('Auto-detection of domain failed:', error.message);
    isDomainInitialized = true;
    return null;
  }
}

/**
 * Get the detected domain
 * @returns {string|null} - Detected domain or null
 */
export const getDetectedDomain = () => detectedDomain;

/**
 * Check if domain is initialized
 * @returns {boolean} - Whether domain is initialized
 */
export const isDomainDetected = () => isDomainInitialized;

/**
 * Set the endpoints path
 * @param {string} path - Path to endpoints file
 */
export const setEndpointsPath = (path) => {
  endpointsPath = path;
};

// Create a convenience object for backward compatibility
export const domainAutoDetector = {
  autoDetectDomainHandler,
  getDetectedDomain,
  isDetected: isDomainDetected,
  setEndpointsPath,
};

export default domainAutoDetector;
