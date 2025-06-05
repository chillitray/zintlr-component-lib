const cookie = require('cookie');
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
 */

export default function serverRequestHandler({
  method = 'get',
  endpoint = '',
  data = {},
  req = null,
  res = null,
  isAuthRequired = false,
  worksWithoutAuth = false,
  successCallback = () => {},
  errorCallback = () => {},
  isSourceRequired = false,
  getIP,
  verify_and_decrypt_jwt,
  PLATFORM_SOURCE,
  CAPTCHA_TOKEN,
  API_URL,
  axios,
}) {
  if (!req || !res) {
    return;
  }
  data = {
    ...req.body,
    ...data,
    ...(isSourceRequired && { source: PLATFORM_SOURCE }),
  };

  const headers = {};
  // Captcha token is just to check the authenticity
  headers['Captcha-Token'] = CAPTCHA_TOKEN;

  let options = {
    method: method,
    url: API_URL + endpoint,
    headers: headers,
  };

  const cookies = cookie.parse(req.headers.cookie || '{}');
  //If auth is required or it doesn't matter if logged in or not
  //e.g. Pricing page shows different packages for users
  if (isAuthRequired || worksWithoutAuth) {
    let isLoggedIn = req.headers.cookie;
    if (isLoggedIn) {
      isLoggedIn = cookies.key && cookies.access_token;
    }
    //If not logged in and it doesn't work without authentication, throw error
    if (!isLoggedIn && !worksWithoutAuth) {
      //   ErrorObject["message"] = "Log in first";
      //   ErrorObject.code = 400;
      //   res.status(ErrorObject.code).json(ErrorObject);
      return;
    }

    //If logged in, decrypt key and access_token coming from cookies
    let key = '',
      access_token = '';
    if (isLoggedIn) {
      // key = cipher_decryption(cookies.key, process.env.CIPHER);
      // access_token = cipher_decryption(cookies.access_token, process.env.CIPHER);

      // The above cipher_decryption is creating irregularity across the platforms,
      // That's why we are using consistent encryption using jwt.
      key = verify_and_decrypt_jwt(cookies.key, process.env.CIPHER);
      access_token = verify_and_decrypt_jwt(cookies.access_token, process.env.CIPHER);
    }

    //Add token in headers
    options.headers.Authorization = `${data?.ltd ? process.env.LTD_KEY : access_token}`;
    data.key = data?.ltd ? null : key;
  }

  // Adding IP address to the data for every api call.
  data.ip_address = getIP(req);

  if (cookies) {
    const visitorId = cookies['visitor-id'] || null;
    // Adding "visitor-id"
    if (visitorId) {
      headers['visitor-id'] = visitorId;
    }
  }
  // Adding "Client-ip-address" in headers for every api call.
  headers['client-ip-address'] = getIP(req);

  options = {
    ...options,
    params: method === 'get' ? data : {},
    data: method !== 'get' ? data : {},
    responseType: 'json',
  };

  //   ConsoleMsg.log(options);

  return axios
    .request(options)
    .then((result) => {
      if (result?.data?.success) {
        //Cache for get requests
        if (method === 'get') {
          res.setHeader('Cache-Control', 'public, s-maxage=59, stale-while-revalidate=59');
        }
        successCallback(result.data);
        // res.status(200).json(result.data);
        res.status(200).send(JSON.stringify(result.data));
      } else {
        res.status(400).json(result.data);
      }
    })
    .catch((error) => {
      errorCallback(error);
      //   let err = error?.response?.data;
      // //   ConsoleMsg.log("================================================");
      // //   ConsoleMsg.log(error);
      // //   ConsoleMsg.log("================================================");
      //   if (error && error?.response?.status === 0 && error?.message) {
      //     // ErrorObject.message = error.message;
      //     // ErrorObject.code = 500;
      //     // err = ErrorObject;
      //   }
      //   if (error && error?.response?.status === 502) {
      //     ErrorObject.message = "Server is down.";
      //     ErrorObject.code = 500;
      //     err = ErrorObject;
      //   }
      //   errorCallback(err);
      //   res.status(err?.code === 500 ? 500 : 400).json(err);
    });
}
