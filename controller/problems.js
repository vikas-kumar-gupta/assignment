let getWaterLevel = function (arr, len) {
  let area = 0;
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      area = Math.max(area, Math.min(arr[j], arr[i]) * (j - i));
    }
  }
  return area;
};

let pattern = [];
let getFibonacci = function (num, previous1, previous2) {
  if (num !== 0) {
    let res = previous1 + previous2;
    previous1 = previous2;
    previous2 = res;
    pattern.push(res);
    num--;
    getFibonacci(num, previous1, previous2);
  }
};

module.exports.fibonacci = (req, res) => {
  let term = req.body.term;
  let pre1 = 1;
  let pre2 = 0;
  getFibonacci(term, pre1, pre2);
  res.send({ pattern: pattern });
  pattern = [];
};

module.exports.waterLevel = (req, res) => {
  const data = req.body;
  res.send({ waterLevel: getWaterLevel(data.arr, data.arr.length) });
};
