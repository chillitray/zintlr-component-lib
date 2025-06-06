/**
 * This function filters and processes an array of email objects, calculating their accuracy based on certain properties.
 * @param {Object[]} data_emails An array of email objects or undefined.
 * @returns An array of processed email objects with accuracy calculated.
 */
export function changeEmailFormat (data_emails){
  let emails;
  // Check if data_emails is not an array, and return an empty array.
  if (!Array.isArray(data_emails)) {
    return [];
  }
  // Check if data_emails is truthy (not undefined or null).
  if (data_emails) {
    //TODO: No need of this, backend is doing the validations and giving accuracy
    /*emails = data_emails?.map((email) => {
			//Create a copy of the email object using spread operator.
			let local_email = { ...(email || {}) };
			let prob = 0;
			//Check if the 'validation' property exists in the email object. and it is true
			//If validation is true, email is validated, 60% email is accurate
			if (local_email?.validation) {
				prob = 0.6;
			}
			//Check if the 'smtp' property exists in the email object.
			//If smtp is true, it is 30% accurate,
			//If email is both smtp and validation, it is 90% accurate
			if (local_email?.smtp) {
				prob += 0.3;
			}
			//Add only if email has probability greater than 0
			if (prob != 0) {
				local_email.accuracy = prob;
				return local_email;
			}
			//else return null
			return null;
		});.*/
    // Filter out any null elements from the 'emails' array.
    emails = data_emails?.filter((a) => a);
  }
  // Return the processed array of email objects.
  return emails;
};
