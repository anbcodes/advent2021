const inputColumns = Deno.readTextFileSync('input.txt').split('\n').map(v => v.split('').map(v => +v))

console.log("Deno:")

const gammaRate = [];
const epsilonRate = [];

for (let c = 0; c < inputColumns[0].length; c++) {
  let oneCount = 0;
  let zeroCount = 0;
  for (let r = 0; r < inputColumns.length; r++) {
    if (inputColumns[r][c] === 0) {
      zeroCount += 1;
    } else if (inputColumns[r][c] === 1) {
      oneCount += 1;
    }
  }

  if (oneCount > zeroCount) {
    gammaRate.push(1)
    epsilonRate.push(0)
  } else if (zeroCount > oneCount) {
    gammaRate.push(0)
    epsilonRate.push(1)
  } else {
    throw new Error("Equal number of bits")
  }
}

const gamma = parseInt(gammaRate.join(''), 2);
const epsilon = parseInt(epsilonRate.join(''), 2);

console.log("    Part 1:", (gamma * epsilon).toString())

const mostCommonBitForColumn = (arr: number[][], c: number) => {
  const [zeros, ones] = arr.reduce(([zeros, ones], row) => row[c] === 0 ? [zeros + 1, ones] : [zeros, ones + 1], [0, 0])

  return zeros > ones ? 0 : 1;
}

const leastCommonBitForColumn = (arr: number[][], c: number) => {
  const [zeros, ones] = arr.reduce(([zeros, ones], row) => row[c] === 0 ? [zeros + 1, ones] : [zeros, ones + 1], [0, 0])

  return ones >= zeros ? 0 : 1;
}

let filteredOxegen = inputColumns;
let filteredCO2 = inputColumns;

let oxegen: number[] = [];
let co2: number[] = [];

for (let col = 0; col < inputColumns[0].length; col++) {
  const mostCommonOxegen = mostCommonBitForColumn(filteredOxegen, col);
  const leastCommonCO2 = leastCommonBitForColumn(filteredCO2, col);

  filteredOxegen = filteredOxegen.filter(v => v[col] === mostCommonOxegen);
  filteredCO2 = filteredCO2.filter(v => v[col] === leastCommonCO2);

  if (filteredOxegen.length === 1) {
    oxegen = filteredOxegen[0];
  }

  if (filteredCO2.length === 1) {
    co2 = filteredCO2[0]
  }
}

const oxegenDec = parseInt(oxegen.join(''), 2);
const co2Dec = parseInt(co2.join(''), 2);

console.log('    Part 2:', (oxegenDec * co2Dec).toString())
