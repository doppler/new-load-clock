const newState = {
  graph: {
    lines: true,
    dots: false,
    bars: false
  },
  celsius: false,
  displayWindsAloft: true
};

const lcState = JSON.parse(localStorage.getItem("lc.settings")) || newState;

// make sure if we add a settings attribute, clients don't crash on
// app update.
["graph"].forEach(attribute => {
  if (!lcState[attribute]) lcState[attribute] = {};
});

export const initialState = lcState;
