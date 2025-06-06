const keyMapping = {
  credit: 'Lookup/Ids',
  magic_search: 'Domain search',
  personality_intel: 'Personality',
  zbizlocator: 'Local search',
};

// format the credits response
export const formatCreditLimits = (creditsTeam) => {
  if (!creditsTeam) return [];
  return Object.entries(creditsTeam).map(([key, value]) => ({
    name: keyMapping[key] || key,
    ...value,
  }));
}
