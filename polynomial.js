const fs = require('fs');

let rawData = fs.readFileSync('testcase.json'); 
let data = JSON.parse(rawData);

const n = Number(data.keys.n);
const k = Number(data.keys.k);

let points = [];
for (let key in data) {
    if (key === "keys") continue;

    let x = Number(key);
    let { base, value } = data[key];
    let y = parseInt(value, Number(base));
    points.push([x, y]);
}

if (points.length < k) {
    console.log(`Not enough roots to solve polynomial. Required: ${k}, Found: ${points.length}`);
    process.exit(1);
}

function lagrangeInterpolation(points, x) {
    let n = points.length;
    let result = 0;

    for (let i = 0; i < n; i++) {
        let [xi, yi] = points[i];
        let term = yi;

        for (let j = 0; j < n; j++) {
            if (i !== j) {
                let [xj] = points[j];
                term *= (x - xj) / (xi - xj);
            }
        }
        result += term;
    }
    return result;
}

let secretX = 0;
let secretC = lagrangeInterpolation(points, secretX);

console.log("Points (x, y):", points);
console.log(`Secret (C) at x=${secretX}: ${secretC}`);
