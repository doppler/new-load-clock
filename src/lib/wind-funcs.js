export const colorForSpeed = speed => `hsl(${145 - speed * 5}, 100%, 50%)`;

const average = arr => arr.reduce((a, b) => a + b, 0) / arr.length;

export const averageEachRange = (arr, rangeLength = 15) => {
  let avgsArr = [],
    idx = 0;
  do {
    avgsArr.push(average(arr.slice(idx, idx + rangeLength)));
    idx += rangeLength;
  } while (avgsArr.length < Math.ceil(arr.length / rangeLength));
  return avgsArr;
};

export const maxEachRange = (arr, rangeLength = 15) => {
  let maxArr = [],
    idx = 0;
  do {
    maxArr.push(Math.max(...arr.slice(idx, idx + rangeLength)));
    idx += rangeLength;
  } while (maxArr.length < Math.ceil(arr.length / rangeLength));
  return maxArr;
};

export const fakeWindData = length => {
  let curr = Math.floor(Math.random() * 20);
  const next = () => {
    let incr = Math.floor(Math.random() * 3);
    if (Math.random() < 0.65) incr = -incr;
    curr += incr;
    if (curr < 0) curr = Math.floor(Math.random() * 5);
    if (curr > 30) curr = 20;
    return curr;
  };
  return Array.from(Array(length)).map(() => next());
};
