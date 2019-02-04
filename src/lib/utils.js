export const getParams = () => {
  const params = {};
  const paramPairs = document.location.search.replace(/^\?/, "").split(/&/);
  paramPairs.forEach(pair => {
    const [key, value] = [...pair.split(/=/)];
    params[key] = value;
  });
  return params;
};
