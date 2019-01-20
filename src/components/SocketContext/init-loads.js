const locations = require("../../locations.json");

const loads = {};

Object.keys(locations).forEach(location => (loads[location] = []));

export default loads;
