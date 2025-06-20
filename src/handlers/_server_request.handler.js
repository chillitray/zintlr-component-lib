import axios from 'axios';
import { ErrorObject } from './request-handler';
import { getIP, verify_and_decrypt_jwt } from './_common.handlers';

// Browser-compatible cookie parser
function parseCookies(cookieString) {
  const cookies = {};
  if (!cookieString) return cookies;

  cookieString.split(';').forEach((cookie) => {
    const [name, value] = cookie.trim().split('=');
    if (name && value) {
      cookies[name] = decodeURIComponent(value);
    }
  });

  return cookies;
}

/**
 * This method is the global method for calling API request on the server.
 * @param {object} CustomRequestObject
 * @param {string} CustomRequestObject.method - Accepted methods "get", "post", "put", "delete"
 * @param {string} CustomRequestObject.endpoint - API Endpoint.
 * @param {object} CustomRequestObject.data - Data to send with Request.
 * @param {Request} CustomRequestObject.req - Request Object from the request
 * @param {Response} CustomRequestObject.res - Response Object for the request
 * @param {Boolean} CustomRequestObject.isAuthRequired - Authentication
 * @param {Function} CustomRequestObject.successCallback - Callback function for successful response
 * @param {Function} CustomRequestObject.errorCallback - Callback function for failed response
 * @param {string} CustomRequestObject.apiUrl - Base API URL
 * @param {string} CustomRequestObject.captchaToken - Captcha token for authenticity
 * @param {string} CustomRequestObject.platformSource - Platform source identifier
 * @param {Function} CustomRequestObject.getIP - Function to get IP from headers
 * @param {Function} CustomRequestObject.verifyAndDecryptJWT - Function to decrypt JWT
 * @param {Function} CustomRequestObject.parseCookies - Function to parse cookies
 * @param {Function} CustomRequestObject.logFn - Logging function
 */
export function serverRequestHandler({
  method = 'get',
  endpoint = '',
  data = {},
  req = null,
  res = null,
  isAuthRequired = false,
  successCallback = () => {},
  errorCallback = () => {},
  isSourceRequired = false,
  logFn = console.log,
  apiUrl,
  captchaToken,
  platformSource,
}) {
  if (!req || !res) {
    return;
  }

  data = {
    ...req.body,
    ...data,
    ...(isSourceRequired && { source: platformSource }),
  };

  const headers = {};
  // Captcha token is just to check the authenticity
  headers['Captcha-Token'] = captchaToken;

  let options = {
    method: method,
    url: apiUrl + endpoint,
    headers: headers,
  };

  const cookies = parseCookies(req.headers.cookie);

  //If auth is required or it doesn't matter if logged in or not
  //e.g. Pricing page shows different packages for users
  //If auth is requrired
  if (isAuthRequired) {
    let isLoggedIn = req.headers.cookie;

    if (isLoggedIn) {
      //Check if key, access token and auth token are present
      isLoggedIn = cookies.key && cookies.access_token;
    }

    //If not logged in and it doesn't work without authentication, throw error
    if (!isLoggedIn) {
      const errorObj = { ...ErrorObject };
      errorObj['message'] = 'Log in first';
      errorObj.code = 400;
      res.status(errorObj.code).json(errorObj);
      return;
    }
    //If logged in, decrypt key and access_token coming from cookies
    // const key = cipher_decryption(cookies.key, process.env.CIPHER);
    // const access_token = cipher_decryption(cookies.access_token, process.env.CIPHER);

    // The above cipher_decryption is creating irregularity across the platforms,
    // That's why we are using consistent encryption using jwt.
    const key = verify_and_decrypt_jwt(cookies.key, process.env.CIPHER);
    const access_token = verify_and_decrypt_jwt(cookies.access_token, process.env.CIPHER);

    //Add token in headers
    options.headers.Authorization = access_token;
    data.key = key;
  }

  if (cookies) {
    const visitorId = cookies['visitor-id'] || null;
    // Adding "visitor-id"
    if (visitorId) {
      options.headers['visitor-id'] = visitorId;
    }
  }

  // Get IP address from request data or fallback to getIP helper
  const ipAddress = data['browser-ip-address'] || getIP(req.headers);

  // Only delete if it exists to avoid unnecessary operation
  if (data['browser-ip-address']) {
    delete data['browser-ip-address'];
  }

  options.headers['client-ip-address'] = ipAddress;
  data.ip_address = ipAddress;

  options = {
    ...options,
    params: method === 'get' ? data : {},
    data: method !== 'get' ? data : {},
    responseType: 'json',
  };

  if (logFn) {
    logFn(options);
  }

  return axios
    .request(options)
    .then((result) => {
      if (result?.data?.success) {
        //Cache for get requests
        if (method === 'get') {
          res.setHeader('Cache-Control', 'public, s-maxage=59, stale-while-revalidate=59');
        }
        successCallback(result.data);
        res.status(200).send(JSON.stringify(result.data));
      } else {
        res.status(400).json(result.data);
      }
    })
    .catch((error) => {
      let err = error?.response?.data || { ...ErrorObject };

      if (logFn) {
        logFn('================================================');
        logFn(error);
        logFn('================================================');
      }

      if (error && error?.response?.status === 0 && error?.message) {
        err = { ...ErrorObject };
        err.message = error.message;
        err.code = 500;
      }
      if (error && error?.response?.status === 502) {
        err = { ...ErrorObject };
        err.message = 'Server is down.';
        err.code = 500;
      }

      errorCallback(err);
      res.status(err?.code === 500 ? 500 : 400).json(err);
    });
}

export default serverRequestHandler;
