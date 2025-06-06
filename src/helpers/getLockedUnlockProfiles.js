// import changeEmailFormat from "./changeEmailFormat";

/**
 * Get person's contact details
 * @param {Object} person_data -> Person data
 * @returns {Object}
 */
// const get_contact_details = (person_data) => {
// 	//get phone number and formatted emails
// 	return {
// 		phone: person_data?.phone,
// 		emails: changeEmailFormat(person_data?.emails),
// 	};
// };

/**
 * Check if person is locked
 * @param {Object} person_data -> Person data
 * @returns {boolean}
 */
export const checkIfProfileLocked = (person_data) => {
  //get the contact details of person
  // const contact_details = get_contact_details(person_data);
  //Check if person is locked and has at least one email or phone number
  return !person_data.unlocked;
  /*&&
		((contact_details.emails && contact_details.emails?.length > 0) ||
			(contact_details.phone && contact_details.phone?.length > 0))*/
};

/**
 * Check if person is unlocked
 * @param {Object} person_data -> Person data
 * @returns {boolean}
 */
export const checkIfProfileUnLocked = (person_data) => {
  // const contact_details = get_contact_details(person_data);
  //Check if person is unlocked or does not have any email or phone number
  return person_data.unlocked;
  /*||
		!(
			(contact_details.emails && contact_details.emails?.length > 0) ||
			(contact_details.phone && contact_details.phone?.length > 0)
		)*/
};

/**
 * get the locked or unlocked profiles in the array of person data
 * @param {Object[]} profiles -> array of Person data
 * @param {boolean?} [unlocked=true] -> Flag to check unlock or lock status, if true check unlock status of profile
 * @returns {Object[]} Locked/Unlocked profiles
 */
export const getLockedUnlockProfiles = (profiles = [], unlocked = true) => {
  return profiles.filter((person_data) => {
    if (unlocked) {
      //If no data for emails and phones, let them download
      return checkIfProfileUnLocked(person_data);
    }
    return checkIfProfileLocked(person_data);
  });
};
