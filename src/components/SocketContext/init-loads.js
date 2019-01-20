const locations = require("../../locations.json");

const loads = {};

Object.keys(locations).forEach(
  location => (loads[location] = { location, loadsFlownToday: 0 })
);

export default loads;
