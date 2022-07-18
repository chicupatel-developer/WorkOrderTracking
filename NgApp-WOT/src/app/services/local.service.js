export function getMinutes() {
  var minArr = [];
  for (let i = 0; i <= 59; i++) {
    if (i < 10) minArr.push({ value: "0" + i });
    else minArr.push({ value: i + "" });
  }
  return minArr;
}

export function getHours() {
  var hrArr = [];

  for (let i = 1; i <= 12; i++) {
    if (i < 10) hrArr.push({ value: "0" + i });
    else hrArr.push({ value: i + "" });
  }
  return hrArr;
}
