/**
 * Formats raw team data into a structured format suitable for use within the application.
 * This function takes an array of team invitation data and maps it into a structured array of objects,
 * each containing user data, role, invitation status, creation date, and team invitation ID.
 *
 * Input validation is performed to ensure the data is an array.
 *
 * @param {Array} data - An array of objects representing raw team invitation data.
 * @returns {Array} - An array of formatted objects containing team member details.
 * @throws {Error} - Throws an error if the input is not an array.
 * TODO: Update the Response of Invitation Data from Backend so that we dont want to format data again and again.
 */

export const formatTeamData = (data) => {
  if (!Array.isArray(data)) {
    return [];
  }

  let formattedData = [];

  if (data[0]?.invitation) {
    const item = data[0]?.invitation;
    formattedData.push({
      user_data: {
        email: item.send_to_email_id,
      },
      role: item.role,
      invitation_status: item.invitation_status,
      create_datetime: item.invitation_status === 2 ? item.create_datetime : null,
      team_invitations_id: item.team_invitations_id,
    });
  }

  return data[0]?.invitation
    ? formattedData
    : data.map((item) => ({
        user_data: {
          email: item.send_to_email_id,
        },
        role: item.role,
        invitation_status: item.invitation_status,
        create_datetime: item.invitation_status === 2 ? item.create_datetime : null,
        team_invitations_id: item.team_invitations_id,
      }));
};
