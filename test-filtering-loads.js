const loads = [
  {
    plane: "Caravan N682AC",
    loadNumber: 4
  },
  {
    plane: "Caravan N682AC",
    loadNumber: 3
  },
  {
    plane: "Otter N169BA",
    loadNumber: 1
  },
  {
    plane: "Otter N169BA",
    loadNumber: 2
  },
  {
    plane: "Otter N169BA",
    loadNumber: 3
  }
];

const loadsFilteredByPlanesLeastLoadNumber = loads => {
  const groupBy = function(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  const planeGroups = groupBy(loads, "plane");

  return Object.keys(planeGroups).map(plane =>
    planeGroups[plane].reduce((res, obj) =>
      obj.loadNumber < res.loadNumber ? obj : res
    )
  );
};

console.log(loadsFilteredByPlanesLeastLoadNumber(loads));
