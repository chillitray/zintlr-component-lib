// packages/api-client/src/request-caller.js
import axios from 'axios';
import { toast } from 'sonner';
import * as yup from 'yup';

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
  skipValidation = false,
  // Configuration dependencies
  yup_validators = {},
  domain,
  urls = {},
  // Toast and logging functions
  logFn = null,
}) {
  return new Promise((resolve, reject) => {
    const responseObj = { ...ErrorObject };

    // Method validation
    if (!isMethodProper(method)) {
      responseObj.message = 'Method is not allowed';
      reject(responseObj);
      return;
    }

    // Logging if function provided
    // Why we need to log the endpoint, urls.api?.prospecting?.search_results, yup_validators[endpoint] ?
    if (logFn) {
      logFn(endpoint, urls.api?.prospecting?.search_results, yup_validators[endpoint]);
    }

    // Validation logic
    if (!skipValidation) {
      if (yup_validators[endpoint] || yup_validators[forceValidationSchema]) {
        let validationSchema = yup_validators[endpoint];
        if (forceValidationSchema) {
          validationSchema = yup_validators[forceValidationSchema];
        }
        const validations = yup.object().shape(validationSchema);
        try {
          if (logFn) {
            logFn('====================================');
            logFn(data);
            logFn('====================================');
          }
          validations.validateSync(data);
        } catch (error) {
          responseObj.message = error.errors.join(', ');
          toast(responseObj.message, 'error');
          reject(responseObj);
          return;
        }
      }
    }

    const req_obj = {
      method: method,
      url: domain + endpoint,
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
            toast(data.message, 'success');
          }
          resolve(data);
        } else {
          if (errorToast) {
            toast(data.message, 'error');
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
            logFn([error], 'error');
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
            logFn([err.message, 'hey', errorToast], 'error');
          }
          if (errorToast) {
            toast(err.message, 'error');
          }
        }
        reject(err);
      });
  });
}

export default request_caller;
