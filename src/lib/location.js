export const validLocations = {
  ATL: "Atlanta",
  CLW: "Clewiston",
  DAL: "Dallas",
  HOU: "Houston",
  SAN: "San Marcos"
};

export const getLocationFromPathName = () => {
  const match = window.location.pathname.split("/")[1].match(/[A-Z]{3}/);
  if (match && Object.keys(validLocations).includes(match[0])) return match[0];
  return "ATL";
};
