import axios from 'axios';
import { toast } from '../../components/index.js';
import * as yup from 'yup';
import { getIP } from './_common.handler.js';
import { getValidationSchema } from './configs/validator.config.js';

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
 * TODO Better documentation & Error handling
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
    domain = null,
    // Toast and logging functions
    logFn = console.log,
}) {
    return new Promise((resolve, reject) => {
        const responseObj = { ...ErrorObject };

        // Method validation
        if (!isMethodProper(method)) {
            responseObj.message = 'Method is not allowed';
            reject(responseObj);
            return;
        }

        logFn('Request:', {
            method,
            endpoint,
            data,
        });

        let finalDomain = domain ?? process.env.NEXT_PUBLIC_FRONTEND_URL + '/api/';

        // Domain validation important for better error handling
        if (!finalDomain) {
            responseObj.message = 'Domain is required';
            reject(responseObj);
            return;
        }

        if (!skipValidation) {
            if (getValidationSchema(endpoint) || getValidationSchema(forceValidationSchema)) {
                let validationSchema = getValidationSchema(endpoint);
                if (forceValidationSchema) {
                    validationSchema = getValidationSchema(forceValidationSchema);
                }
                const validations = yup.object().shape(validationSchema);
                try {
                    validations.validateSync(data);
                    logFn('Validation passed', data);
                } catch (error) {
                    //If the body is invalid, send the error and reject the promise
                    responseObj.message = error.errors.join(', ');
                    toast.error(responseObj.message);
                    reject(responseObj);
                    return;
                }
            }
        }

        // This is for the server side request to get the ip address ( Node is changing the ip address thats why we are using this method )
        if (headers && Object.keys(headers).length > 0) {
            data['browser-ip-address'] = getIP(headers);
        }

        const req_obj = {
            method: method,
            url: finalDomain + endpoint,
            data: method !== 'get' ? data : {},
            responseType: 'json',
            headers: headers,
            withCredentials: true,
            crossDomain: true,
        };

        logFn('Request object:', req_obj);

        if (controller && controller instanceof AbortController) {
            req_obj.signal = controller.signal;
        }

        // Axios request
        return axios
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
                // Log the error and request object
                if (logFn) {
                    logFn('Request error:', error);
                    logFn('Request object:', req_obj);
                }
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
                    // Log the error and request object
                    if (logFn) {
                        logFn('Request error:', error);
                        logFn('Request object:', req_obj);
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
                    // Log the error
                    if (logFn) {
                        logFn('Error details:', err.message);
                    }
                    if (errorToast) {
                        toast.error(err.message);
                    }
                }
                reject(err);
            });
    });
}

export default request_caller;
