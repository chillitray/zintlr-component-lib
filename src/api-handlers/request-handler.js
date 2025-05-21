import axios from "axios";
import * as yup from "yup";

export const ErrorObject = {
  message: "",
  success: false,
  code: 400,
  data: {},
};

export const requestAbortCode = -100;

export function isMethodProper(method) {
  return ["post", "put", "delete"].includes(method);
}

export default function request_caller({
  domain = "",
  method = "post",
  endpoint = "",
  data = {},
  successToast = false,
  errorToast = true,
  headers = {},
  controller = null,
  forceValidationSchema = null,
  skipValidation = false,
  // Custom handlers with defaults
  showToast = () => {},
  consoleMsg = console.log,
  validators = {},
}) {
  return new Promise(async (resolve, reject) => {
    const responseObj = { ...ErrorObject };

    if (!isMethodProper(method)) {
      responseObj.message = "Method is not allowed";
      reject(responseObj);
      return;
    }

    consoleMsg(endpoint, data);

    // Validation logic
    if (!skipValidation) {
      const validatorKey = forceValidationSchema || endpoint;
      if (validators[validatorKey]) {
        try {
          const validationSchema = yup.object().shape(validators[validatorKey]);
          consoleMsg("Validation data:", data);
          await validationSchema.validate(data);
        } catch (error) {
          responseObj.message = error.errors?.join(", ") || "Validation failed";
          showToast(responseObj.message, "error");
          reject(responseObj);
          return;
        }
      }
    }

    const req_obj = {
      method,
      url: domain + endpoint,
      data: method !== "get" ? data : {},
      responseType: "json",
      headers,
      withCredentials: true,
      crossDomain: true,
    };

    if (controller) {
      req_obj.signal = controller.signal;
    }

    try {
      const res = await axios.request(req_obj);
      const responseData = res.data;

      if (responseData.success) {
        if (successToast) {
          showToast(responseData.message, "success");
        }
        resolve(responseData);
      } else {
        if (errorToast) {
          showToast(responseData.message, "error");
        }
        reject(responseData);
      }
    } catch (error) {
      let err = { ...responseObj };

      if (axios.isCancel(error)) {
        err.code = requestAbortCode;
        err.message = "Request cancelled";
      } else if (error.response?.status === 0) {
        err.message = error.message || "Network error";
      } else if (error.response?.data?.success === false) {
        err = error.response.data;
      } else {
        consoleMsg(error, "error");
        err.message = "Something went wrong. Please try again";
      }

      if (!controller?.signal?.aborted && errorToast) {
        showToast(err.message, "error");
      }
      reject(err);
    }
  });
}
