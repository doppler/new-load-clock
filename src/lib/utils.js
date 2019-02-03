import { addMinutes } from "date-fns";
export const getParams = () => {
  const params = {};
  const paramPairs = document.location.search.replace(/^\?/, "").split(/&/);
  paramPairs.forEach(pair => {
    const [key, value] = [...pair.split(/=/)];
    params[key] = value;
  });
  return params;
};

export const fakeLoads = loadsObject => {
  if (loadsObject && loadsObject.loads && loadsObject.loads.length < 2) {
    loadsObject.loads.push({
      plane: "Fake Caravan",
      loadNumber: 1,
      departureTime: addMinutes(new Date(), 20),
      status: 1,
      slotsRemaining: 10
    });
  }
  return loadsObject;
};
