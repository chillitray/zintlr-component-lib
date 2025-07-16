import * as jwt from 'jsonwebtoken';

/**
 * Hashing function to hash text by using SHA256
 * @param {object} obj
 * @param {string} secrete
 * @returns {string} JWT Token
 */
export function create_jwt(obj, secrete, options) {
  return jwt.sign(obj, secrete, options);
}

export function verify_and_decrypt_jwt(token, secret) {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    // console.error('JWT verification error:', error.message);
    return null;
  }
}

/**
 * Retrieves the client's IP address from the request object.
 * @param {Object} request The request object containing client information.
 * @returns {string} The client's IP address.
 */
export function getIP(request) {
  let ip = request.ip ?? request?.['x-real-ip'];
  let forwardedFor = request?.['x-forwarded-for'];
  //If cloudflare is enabled,then it changes x-forwarded-for with cloudflare ip, use cf-connecting-ip to get the real ip
  if (process.env.CLOUDFLARE_ENABLED === 'true') {
    forwardedFor = request?.['cf-connecting-ip'];
  }
  // Consider cloudflare data more one priority list, replacing ip with forwardedFor data of cf.
  if (forwardedFor) {
    try {
      if (Array.isArray(forwardedFor)) {
        ip = forwardedFor?.[0];
      } else {
        ip = forwardedFor.split(',')?.[0];
      }
    } catch (error) {
      ip = 'Unknown';
    }
  }
  if (!ip) {
    ip = 'Unknown';
  }
  return ip;
}
