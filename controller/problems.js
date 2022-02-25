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

let missingNum = function (arr) {
  const n = arr.length + 1;
  const formula = (n * (n + 1)) / 2;
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    count += arr[i];
  }
  let result = formula - count;
  return result;
};

let waterLevel = (arr) => {
  let n = 10;
  let left = new Array(5).fill(-1),
    right = new Array(5).fill(-1);

  // let arr = [3, 0, 2, 0, 4];

  let l = -1,
    r = -1;
  for (let i = 0; i < 4; i++) {
    l = Math.max(l, arr[i]);
    left[i] = l;
  }

  for (let i = 4; i > 0; i--) {
    r = Math.max(r, arr[i]);
    right[i] = r;
  }
  let cnt = 0;
  console.log(left, right);
  for (let i = 1; i < 4; i++) {
    cnt += Math.min(left[i], right[i]) - arr;
  }
  console.log(cnt);
  return cnt;
};

module.exports.sortString = (req, res) => {
  let string = req.body.str;
  let stringArr = req.body.strArr;

  stringArr.sort((a, b) => {
    let lenA = a.length;
    let lenB = b.length;
    const order = (len) => {
      for (let i = 0; i < len; i++) {
        let first = string.indexOf(a[i]);
        let second = string.indexOf(b[i]);
        if (first == -1) {
          if (second == -1) {
            continue;
          } else return 1;
        } else if (second == -1) {
          return -1;
        } else if (first == second) {
          continue;
        } else if (first > second) return 1;
        else return -1;
      }
      return lenA - lenB;
    };
    if (lenA >= lenB) {
      return order(lenB);
    } else {
      return order(lenA);
    }
  });

  res.send(stringArr);
};


module.exports.waterLevel = (req, res) => {
  const arr = req.body.arr;
  res.send({ waterLevel: waterLevel(arr) });
};

module.exports.missingNum = (req, res) => {
  const data = req.body;
  res.send({ missingNum: missingNum(req.body.arr) });
};

module.exports.fibonacci = (req, res) => {
  let term = req.body.term;
  let pre1 = 1;
  let pre2 = 0;
  getFibonacci(term, pre1, pre2);
  s;
  res.send({ pattern: pattern });
  pattern = [];
};
