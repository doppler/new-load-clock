const locations = require("../../locations.json");

const loads = {};

Object.keys(locations).forEach(
  location => (loads[location] = { location, loadsFlownToday: "?", loads: [] })
);

export default loads;
