/**
 * Formats phone numbers from input data into a structured array
 * @param {Object} data - Input data containing phone information
 * @returns {Array} Array of tuples containing phone type and numbers
 */
export const formatPhoneNumbers = (data) => {
  // Early return if no phone data exists
  if (!data?.phone?.length) return [];

  // Handle case where phone is an array of strings
  if (typeof data.phone[0] === 'string') {
    return [['', data.phone]];
  }

  // Group phone numbers by subtype using reduce
  return Object.entries(
    data.phone.reduce((acc, { subtype = '', ph }) => {
      // Skip if phone number is falsy
      if (!ph) return acc;

      // Initialize array for subtype if doesn't exist
      if (!acc[subtype]) {
        acc[subtype] = [];
      }

      acc[subtype].push(ph);
      return acc;
    }, {})
  );
};

/**
 * Formats email addresses into an array of objects
 * @param {Array} emails - Array of email addresses
 * @returns {Array} Array of objects with email addresses
 */
export const formatEmails = (emails) => {
  return emails?.map((email) => ({ address: email }));
};

/**
 * Formats contact details from raw data into a structured object
 * Common Contact Formatter
 * @param {Object} data - Raw contact data
 * @param {string} from - Source of the contact data
 * @returns {Object} Formatted contact details object containing name, phone, emails and other info
 */
export const formatContactDetails = (data, from) => {
  // Construct and return formatted contact object
  return {
    // Get name from either person_name or full_name
    name: data?.person_name || data?.full_name,
    // Format phone numbers using person_phs or phone data
    phone: formatPhoneNumbers(data?.person_phs || data?.phone),
    // Format emails using person_emails or use existing emails array
    emails: formatEmails(data?.person_emails) || data?.emails,
    // Get ID from either person_din or _id
    _id: data?.person_din || data?._id,
    // Group additional info like flags and credits
    info: {
      flags: data?.person_flags,
      credits: data?.email_credits + data?.phone_credits,
      email_credits: data?.email_credits,
      phone_credits: data?.phone_credits,
    },
    // Social media links
    linkedin_url: data?.social_urls?.linkedin_url,
    // Source and unlock status
    from: from,
    isEmailUnlocked: data?.email_unlocked,
    isPhoneUnlocked: data?.phone_unlocked,
  };
};
