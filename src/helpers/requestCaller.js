/**
 * @typedef ResponseObject
 * @property {string} message Error or Success Message.
 * @property {boolean} success True if it is resolved otherwise False.
 * @property {number} code Response Code.
 * @property {object} data Response data.
 */
export const ErrorObject = {
  message: "",
  success: false,
  code: 400,
  data: {},
};

//Methods allowed from the requests
export function isMethodProper(method) {
  return ["post", "put", "delete"].includes(method);
}

/**
 * This method is the global method for Calling API request in the frontend as well as server side
 * Every API request call to next js api should be from the handler itseld
 * @param {object} RequestObject
 * @param {string} RequestObject.method - Accepted methods "post", "put", "delete"
 * @param {string} RequestObject.endpoint - API Endpoint.
 * @param {object} RequestObject.data - Data to send with Request.
 * @param {boolean} [RequestObject.successToast] - To show success toast.
 * @param {boolean} [RequestObject.errorToast] - To show error toast.
 * @param {object} RequestObject.headers - if we are using getInitialProps, getServerSideProps, we will need to specify headers
 * @param {AbortController} RequestObject.controller - instance of AbortController() to abort request
 *
 * @returns {Promise<ResponseObject>} Promise which resolves or rejects with object
 */
export default function requestCaller({
  method = "post",
  endpoint = "",
  data = {},
  successToast = false,
  errorToast = true,
  StartToast,
  axios,
  FRONTEND_URL,
  ConsoleMsg,
  yup_validators,
  headers = {},
  controller = null,
}) {
  return new Promise((resolve, reject) => {
    //If method is not in the approved methods
    if (!isMethodProper(method)) {
      ErrorObject.message = "Method is not allowed";
      reject(ErrorObject);
    }

    //Validate the object with the Yup validators. Yup validators are subjected to endpoint
    if (yup_validators[endpoint]) {
      const validations = yup.object().shape(yup_validators[endpoint]);
      try {
        validations.validateSync(data);
      } catch (error) {
        //If the body is invalid, send the error and reject the promise
        ErrorObject.message = error.errors.join(", ");
        StartToast(ErrorObject.message, "error");
        reject(ErrorObject);
        return;
      }
    }

    const req_obj = {
      method: method,
      url: FRONTEND_URL + endpoint, //FRONTEND_URL -> is added because of in case we have to use dev/prod server from the local
      // params: method === "get" ? data : {},
      data: method !== "get" ? data : {}, //Send request body if method is not get
      responseType: "json", //Response Type must be JSON
      // timeout: 30000,
      headers: headers, //HEADERS for the server side generated request
    };

    //Manually aborting the request from the frontend
    if (controller && controller instanceof AbortController) {
      req_obj.signal = controller.signal;
    }

    //Common function to call the axios request, will require for the Conditional calling of the request
    function axios_req() {
      axios
        .request(req_obj)
        .then((res) => {
          const data = res.data;
          /*If success and successToast is true, show the toast message and resolve
           * else throw error
           * For this we have to maintain the sanity of the response
           * Backend should also send success as true or false
           */
          if (data.success) {
            if (successToast) {
              StartToast(data.message, "success");
            }
            resolve(data);
          } else {
            throw Error(data);
          }
        })
        .catch((error) => {
          let err = {};
          // Check if the error has a response status of 0 and a message
          // A status code of 0 often indicates a network-level error or a request that couldn't be completed.
          // It can occur due to network connectivity issues, CORS errors, blocked requests, or request abortion.
          if (error && error?.response?.status === 0 && error?.message) {
            ErrorObject.message = error.message;
            err = ErrorObject;
          }
          //Or success is false
          else if (
            error &&
            error?.response?.data?.success === false &&
            error?.response?.data?.message
          ) {
            err = error.response.data;
          } //Or Cancelled using AbortController
          else if (axios.isCancel(error)) {
            ErrorObject.code = 100;
            ErrorObject.message = "Cancelled";
            err = ErrorObject;
          }
          // Handle any other errors
          else {
            ConsoleMsg.log([error], "error");
            ErrorObject.message = `Something went wrong on our side.
					Please try again. Sorry for the inconvenience`;
            err = ErrorObject;
          }
          // Log the error and show an error toast if not cancelled and errorToast is true
          if (
            !controller ||
            (controller &&
              controller instanceof AbortController &&
              !controller.signal.aborted)
          ) {
            ConsoleMsg.log([err.message, "hey"], "error");
            if (errorToast) {
              StartToast(err.message, "error");
            }
          }
          reject(err);
        });
    }
    axios_req();
  });
}
