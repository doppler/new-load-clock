const newState = {
  graph: {
    lines: true,
    dots: false,
    bars: false
  },
  header: {
    celsius: false
  }
};

const lcState = JSON.parse(localStorage.getItem("lc.settings")) || newState;

// make sure if we add a settings attribute, clients don't crash on
// app update.
["graph", "header"].forEach(attribute => {
  if (!lcState[attribute]) lcState[attribute] = {};
});

export const initialState = lcState;
