import validLocations from "../locations.json";

export const locations = validLocations;

export const getLocations = () => validLocations;

export const allLocationCodes = Object.keys(validLocations);

export const getLocationCodes = () => Object.keys(validLocations);

export const getLocationCodeFromPathName = () => {
  const hash = window.location.hash.replace(/^#/, "");
  if (allLocationCodes.includes(hash)) return hash;
  return "ATL";
};

export const locationCode = getLocationCodeFromPathName();

export const getLocationCode = () => getLocationCodeFromPathName();

export const locationName = validLocations[locationCode]["name"];

export const getLocationName = () => {
  return validLocations[getLocationCodeFromPathName()]["name"];
};

export const locationTimezone = validLocations[locationCode]["tz"];

export const getLocationTimezone = () => {
  return validLocations[getLocationCodeFromPathName()]["tz"];
};

export default validLocations[locationCode];
