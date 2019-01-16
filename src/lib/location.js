import validLocations from "../locations.json";

export const locations = validLocations;

export const getLocations = () => validLocations;

export const allLocationCodes = Object.keys(validLocations);

export const getLocationCodes = () => allLocationCodes;

export const getLocationCodeFromPathName = () => {
  const hash = window.location.hash.replace(/^#/, "");
  console.log(hash);
  if (allLocationCodes.includes(hash)) return hash;
  return "ATL";
};

export const locationCode = getLocationCodeFromPathName();

export const getLocationCode = () => locationCode;

export const locationName = validLocations[locationCode]["name"];

export const getLocationName = () => locationName;

export const locationTimezone = validLocations[locationCode]["tz"];

export const getLocationTimezone = () => locationTimezone;

export default validLocations[locationCode];
