import { backend_apis } from "../_meta-data";
import axios from "axios";
import { getIP, verify_and_decrypt_jwt } from "../_meta-data";
import { serverRequestHandler } from "zintlr-component-lib";
import {
  API_URL,
  CAPTCHA_TOKEN,
  PLATFORM_SOURCE,
} from "../../../constant/endpoints";

//to get the banner
export default function handler(req, res) {
  return serverRequestHandler({
    method: "get",
    endpoint: backend_apis.profile.check_email,
    req,
    res,
    axios,
    API_URL,
    CAPTCHA_TOKEN,
    PLATFORM_SOURCE,
    getIP,
    verify_and_decrypt_jwt,
  });
}
