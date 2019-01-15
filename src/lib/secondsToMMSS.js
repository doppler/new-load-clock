const secondsToMMSS = seconds => {
  const s = Math.abs(seconds);
  const hrs = ~~(s / 3600);
  const mins = ~~((s % 3600) / 60);
  const secs = ~~s % 60;

  let str = "";

  if (hrs > 0) str += `${hrs}:${mins < 10 ? "0" : ""}`;

  str += `${mins}:${secs < 10 ? "0" : ""}`;
  str += `${secs}`;
  return str;
};

export default secondsToMMSS;
