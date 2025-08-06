import * as react_jsx_runtime from 'react/jsx-runtime';
import * as jwt from 'jsonwebtoken';
export { toast } from 'sonner';

/**
 * This component creates a backdrop with a blurred
 * effect and centers its children within it.
 * props - The properties of the BlurComponent.
 * props.children - The content to be rendered inside the component.
 * props.className - Additional CSS classes to be applied to the outer span element.
 * props.childClass - Additional CSS classes to be applied to the inner span element.
 * @returns {React.ReactNode}
 */
declare function BlurComponent({ children, className, childClass, isBlur, }: {
    children: any;
    className?: string | undefined;
    childClass?: string | undefined;
    isBlur?: boolean | undefined;
}): React.ReactNode;

/**
 * ImageComponent is a custom image component that handles lazy loading and fallback rendering.
 *
 * @typedef {Object} ImageComponentProps
 * @property {string} src - The source URL of the image
 * @property {number} width - The width of the image
 * @property {number} height - The height of the image
 * @property {string} alt - The alternative text for the image
 * @property {string} [className=""] - Additional CSS class names for the component
 * @property {string} id - The HTML id attribute for the component
 * @property {string} layout =>  - The layout strategy for the image (default is "intrinsic")
 * @property {(e: React.MouseEvent) => void} [onClick=()=>{}] - Click event handler for the image
 * @property {boolean} [priority=false] - Flag indicating whether the image should be loaded with priority
 * @property {string} [objectFit="cover"] - The CSS object-fit property value for the image
 * @property {string} [objectPosition="center"] - The CSS object-position property value for the image
 * @property {string|null} [bgColor=null] - Background color for the alternate image created using alternate text
 * @property {() => void} [onLoadingComplete=()=>{}] - Callback function executed when image loading completes
 */
declare function ImageComponent({ src, width, height, alt, className, id, layout, objectFit, objectPosition, priority, bgColor, onClick, onLoadingComplete, }: {
    src: any;
    width: any;
    height: any;
    alt: any;
    className?: string | undefined;
    id?: string | undefined;
    layout?: string | undefined;
    objectFit?: string | undefined;
    objectPosition?: string | undefined;
    priority?: boolean | undefined;
    bgColor?: null | undefined;
    onClick?: (() => void) | undefined;
    onLoadingComplete?: (() => void) | undefined;
}): react_jsx_runtime.JSX.Element;

/**
 * ImageComponent is a custom image component that handles lazy loading and fallback rendering.
 *
 * @param {string|object} src - The source URL or object containing 'url' and 'alt' properties for the image.
 * @param {number} width - The width of the image.
 * @param {number} height - The height of the image.
 * @param {string} alt - The alternative text for the image.
 * @param {string} className - The additional CSS class name for the image container.
 * @param {string} id - The unique identifier for the image element.
 * @param {string} layout - The layout behavior for the image. Default is "intrinsic".
 * @param {Function} onClick - The callback function to be triggered on image click.
 * @param {boolean} priority - If true, the image will be eagerly loaded. Default is false.
 * @param {string} objectFit - The object-fit CSS property for the image. Default is "contain".
 * @param {boolean} createIfError - If true, a default image will be created if the original image fails to load. Default is false.
 * @param {Function} onLoadingComplete - The callback function to be triggered when the image loading is complete.
 *
 * @returns {React.ReactNode} - JSX element to render the image or alternative text if not in view or not a priority.
 */
declare function LandingImageComponent({ src, width, height, alt, className, id, layout, onClick, priority, objectFit, createIfError, onLoadingComplete, }: string | object): React.ReactNode;

/**
 * This function generates a customizable button component that can be rendered as a link.
 *
 * title - The text to be displayed on the button.
 * onClick - The callback function to be executed when the button is clicked. Default is an empty function.
 * className - Additional CSS classes to be applied to the button.
 * dark - A flag indicating whether the button should have a dark color scheme. Default is false.
 * href - The URL the button should link to.
 * It returns- The JSX representation of the button component.
 */
declare function Button({ title, onClick, className, dark, href, }: {
    title: any;
    onClick?: (() => void) | undefined;
    className?: string | undefined;
    dark?: boolean | undefined;
    href?: string | undefined;
}): react_jsx_runtime.JSX.Element;

declare function HTMLContent({ html, className }: {
    html: any;
    className?: string | undefined;
}): react_jsx_runtime.JSX.Element;

declare function ToastWrapper({ ToasterProps }: {
    ToasterProps: any;
}): react_jsx_runtime.JSX.Element;

declare class BaseApiHandler {
    static wrap(handler: any): (req: any, res: any) => Promise<any>;
}

declare function withGlobalLogging(handler: any): (req: any, res: any) => Promise<any>;

declare function withPageLogging(pageFunction: any, functionType?: string): (context: any) => Promise<any>;

declare function isBrowser(): boolean;

/**
 * Component to create and return an SVG image based on provided initials or a default logo.
 * @param {string} name - The name from which initials will be extracted to generate the image.
 * @param {string?} bgColor - The color of the background of the image. If null, default black color will be used
 * @returns {string} - The base64-encoded SVG image data or an empty string if no name is provided or it's not a browser environment.
 */
declare function createImg(name: string, bgColor?: string | null): string;

/**
 * Component to create and return an SVG image based on provided initials or a default logo.
 * @param {string} name - The name from which initials will be extracted to generate the image.
 * @returns {string} - The base64-encoded SVG image data or an empty string if no name is provided or it's not a browser environment.
 */
declare function createDP(name: string): string;

/**
 * TODO Better documentation & Error handling
 * Core request handler - accepts all configuration as parameters
 */
declare function request_caller({ method, endpoint, data, successToast, errorToast, headers, controller, forceValidationSchema, skipValidation, domain, logFn, }: {
    method?: string | undefined;
    endpoint?: string | undefined;
    data?: {} | undefined;
    successToast?: boolean | undefined;
    errorToast?: boolean | undefined;
    headers?: {} | undefined;
    controller?: null | undefined;
    forceValidationSchema?: null | undefined;
    skipValidation?: boolean | undefined;
    domain?: null | undefined;
    logFn?: {
        (...data: any[]): void;
        (message?: any, ...optionalParams: any[]): void;
    } | undefined;
}): Promise<any>;

/**
 * TODO Better documentation & Error handling
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
 * @param {Function} CustomRequestObject.logFn - Logging function
 */
declare function serverRequestHandler({ method, endpoint, data, req, res, isAuthRequired, successCallback, errorCallback, isSourceRequired, logFn, apiUrl, }: {
    method: string;
    endpoint: string;
    data: object;
    req: Request;
    res: Response;
    isAuthRequired: boolean;
    successCallback: Function;
    errorCallback: Function;
    apiUrl: string;
    logFn: Function;
}): Promise<any> | undefined;

declare function setValidationConfig(config: Object): void;
declare function getValidationSchema(endpoint: string): Object | null;
declare function getAllValidationSchemas(): Object;
declare function isValidationConfigInitialized(): boolean;
declare function resetValidationConfig(): void;

declare function verify_and_decrypt_jwt(token: any, secret: any): string | jwt.JwtPayload | null;
/**
 * Retrieves the client's IP address from the request object.
 * @param {Object} request The request object containing client information.
 * @returns {string} The client's IP address.
 */
declare function getIP(request: Object): string;

export { BaseApiHandler, BlurComponent, Button, HTMLContent, ImageComponent, LandingImageComponent, ToastWrapper, createDP, createImg, getAllValidationSchemas, getIP, getValidationSchema, isBrowser, isValidationConfigInitialized, request_caller, resetValidationConfig, serverRequestHandler, setValidationConfig, verify_and_decrypt_jwt, withGlobalLogging, withPageLogging };
