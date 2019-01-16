import validLocations from "../locations.json";

export const locations = validLocations;

export const getLocationCodeFromPathName = () => {
  const match = window.location.pathname.split("/")[1].match(/[A-Z]{3}/);
  if (match && Object.keys(validLocations).includes(match[0])) return match[0];
  return "ATL";
};

export const locationCode = getLocationCodeFromPathName();

export const allLocationCodes = Object.keys(validLocations);

export const locationName = validLocations[locationCode]["name"];

export const locationTimezone = validLocations[locationCode]["tz"];

export default validLocations[locationCode];
