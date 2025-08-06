/**
 * This files contains constants and handlers related to images
 * e.g. Imagekit url, id, company images path, static images
 */
const STATIC_IMAGES_PATH = "images/";

const IMAGEKIT_URL = "https://ik.imagekit.io/";
const IMAGEKIT_ID = "zintlr";

export const TRANSFORMATION = "?tr=optimized";

export const URL_Endpoint = IMAGEKIT_URL + IMAGEKIT_ID;

export const COMPANY_IMAGE = STATIC_IMAGES_PATH + "getcompanyimage/";
export const COMPANY_IMAGE_LOGO_ID = STATIC_IMAGES_PATH + "getwebscoutimage/";
export const STATIC_IMAGES_ZINTLR = STATIC_IMAGES_PATH + "getwebstatic/?file_name=";

export const imageKitURL = (src) => {
    return `${URL_Endpoint}${src}${TRANSFORMATION}`;
};

export const WEBSITE_NAME = "Zintlr";

export const placeholderDataURL =
    "data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
