/**
  This function combines the team and invite data
 * @param {Array} data - The data to combine
 * @param {Object} options - The options to use
 * @returns {Array} - The combined data
 */
export const combineTeamAndInviteData = (allocated_limits, unallocated_limits) => {
  if (
    !allocated_limits ||
    !unallocated_limits ||
    Object.keys(allocated_limits).length === 0 ||
    Object.keys(unallocated_limits).length === 0
  ) {
    return [];
  }

  const teamData = allocated_limits['team_limits'] || [];
  const inviteData = allocated_limits['invite_limits'] || [];

  const formattedData = [
    ...teamData.map((member) => ({ ...member, isInvited: false })),
    ...inviteData.map((invite) => ({ ...invite, isInvited: true })),
  ];

  formattedData.push({
    ...unallocated_limits,
    name: 'Unallocated credits',
    isNonEditable: true,
  });

  return formattedData;
};

/**
 This function restructures the data
 * @param {Array} tableData - The data to be restructured
 * @returns {Object} - The restructured data
 */
export const restructureData = (tableData) => {
  const team_limits = {};
  const invite_limits = {};
  // Process each entry in tableData
  Object.entries(tableData).forEach(([user_id_hash, data]) => {
    if (data.isInvited) {
      // For invited users, use email as key and pass all data
      invite_limits[data.email] = { ...data };
      delete invite_limits[data.email].isInvited; // Remove the isInvited flag
      delete invite_limits[data.email].email; // Remove email since it's now the key
    } else {
      // For team members, use user_id_hash as key and pass all data
      team_limits[user_id_hash] = { ...data };
      delete team_limits[user_id_hash].isInvited; // Remove the isInvited flag
    }
  });

  return {
    credit_limits: {
      team_limits,
      invite_limits,
    },
  };
};
