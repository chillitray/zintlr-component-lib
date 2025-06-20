import axios from 'axios';
import { toast } from '../components/Toast.js';
import * as yup from 'yup';
import { getIP } from './_common.handlers.js';
import {
  autoDetectValidatorsHandler,
  getValidatorForEndpoint,
  isValidatorsInitialized,
} from './validator-auto-detector.js';
import {
  autoDetectDomainHandler,
  isDomainDetected,
  getDetectedDomain,
} from './domain-auto-detector.js';

export const ErrorObject = {
  message: '',
  success: false,
  code: 400,
  data: {},
};

export function isMethodProper(method) {
  return ['post', 'put', 'delete'].includes(method);
}

export const requestAbortCode = -100;

/**
 * Core request handler - accepts all configuration as parameters
 */
export function request_caller({
  method = 'post',
  endpoint = '',
  data = {},
  successToast = false,
  errorToast = true,
  headers = {},
  controller = null,
  forceValidationSchema = null,
  domain,
  // Toast and logging functions
  logFn = null,
  // Auto-detection options
  autoDetectValidators = true,
  autoDetectDomain = true,
}) {
  return new Promise((resolve, reject) => {
    const responseObj = { ...ErrorObject };

    // Method validation
    if (!isMethodProper(method)) {
      responseObj.message = 'Method is not allowed';
      reject(responseObj);
      return;
    }

    // Auto-detect domain if not provided and auto-detection is enabled
    let finalDomain = domain;
    if (!finalDomain && autoDetectDomain) {
      finalDomain = isDomainDetected() ? getDetectedDomain() : null;

      if (!finalDomain) {
        // Handle async domain detection
        autoDetectDomainHandler()
          .then((detectedDomain) => {
            finalDomain = detectedDomain;
            if (!finalDomain) {
              responseObj.message = 'Domain is required';
              reject(responseObj);
              return;
            }
            processRequest();
          })
          .catch((error) => {
            logFn?.('Auto-detection of domain failed:', error.message);
            responseObj.message = 'Domain is required';
            reject(responseObj);
          });
        return;
      }
    }

    // Domain validation important for better error handling
    if (!finalDomain) {
      responseObj.message = 'Domain is required';
      reject(responseObj);
      return;
    }

    // Start processing the request
    processRequest();

    async function processRequest() {
      // Auto-detect validators if enabled
      // Combined validation logic - only run if auto-detection is enabled
      if (autoDetectValidators) {
        try {
          // Only initialize validators if not already initialized
          if (!isValidatorsInitialized()) {
            await autoDetectValidatorsHandler();
          }

          // Determine which validation schema to use
          const validationSchema = forceValidationSchema
            ? getValidatorForEndpoint(forceValidationSchema)
            : getValidatorForEndpoint(endpoint);

          // Only validate if we have a schema
          if (validationSchema) {
            const validator = yup.object().shape(validationSchema);
            await validator.validate(data, { abortEarly: false });
          }
        } catch (error) {
          // Validation error
          responseObj.message = error.errors.join(', ');
          toast.error(responseObj.message);
          reject(responseObj);
          return;
        }
      }

      // This is for the server side request to get the ip address ( Node is changing the ip address thats why we are using this method )
      if (headers && Object.keys(headers).length > 0) {
        data['browser-ip-address'] = getIP(headers);
      }

      const req_obj = {
        method: method,
        url: finalDomain + '/api/' + endpoint,
        data: method !== 'get' ? data : {},
        responseType: 'json',
        headers: headers,
        withCredentials: true,
        crossDomain: true,
      };

      if (controller && controller instanceof AbortController) {
        req_obj.signal = controller.signal;
      }

      // Axios request
      axios
        .request(req_obj)
        .then((res) => {
          const data = res.data;
          if (data.success) {
            if (successToast) {
              toast.success(data.message);
            }
            resolve(data);
          } else {
            if (errorToast) {
              toast.error(data.message);
            }
            reject(data);
          }
        })
        .catch((error) => {
          let err = {};

          if (error && error?.response?.status === 0 && error?.message) {
            responseObj.message = error.message;
            err = responseObj;
          } else if (
            error &&
            error?.response?.data?.success === false &&
            error?.response?.data?.message
          ) {
            err = error.response.data;
          } else if (axios.isCancel(error)) {
            responseObj.code = requestAbortCode;
            responseObj.message = 'Cancelled';
            err = responseObj;
          } else {
            if (logFn) {
              logFn('Request error:', error);
            }
            responseObj.message =
              'Something went wrong on our side. Please try again. Sorry for the inconvenience';
            err = responseObj;
          }

          if (controller && controller instanceof AbortController && controller.signal.aborted) {
            err.code = requestAbortCode;
          }

          if (
            !controller ||
            (controller && controller instanceof AbortController && !controller.signal.aborted)
          ) {
            if (logFn) {
              logFn('Error details:', err.message);
            }
            if (errorToast) {
              toast.error(err.message);
            }
          }
          reject(err);
        });
    }
  });
}

export default request_caller;
