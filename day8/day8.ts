const input = Deno.readTextFileSync('input.txt');


const parsed = input.trim().split('\n').map(v => v.trim().split('|').map(v => v.trim().split(' '))).map(v => ({
  input: v[0],
  output: v[1],
}));

console.log('Part 1', parsed.map(v => v.output).flat().map(v => v.length).filter(v => v === 2 || v === 4 || v === 3 || v === 7).length);


function perm(xs: number[]): number[][] {
  const ret = [];

  for (let i = 0; i < xs.length; i = i + 1) {
    const rest = perm(xs.slice(0, i).concat(xs.slice(i + 1)));

    if (!rest.length) {
      ret.push([xs[i]])
    } else {
      for (let j = 0; j < rest.length; j = j + 1) {
        ret.push([xs[i]].concat(rest[j]))
      }
    }
  }
  return ret;
}

/*
  0000
 1    2
 1    2
  3333
 4    5
 4    5
  6666
*/

const parseNumberSegments = (mapping: number[], segments: string): number => {
  const segmentsNumbers = segments.split('').map(v => v.charCodeAt(0) - 0x61);
  // console.log('parsing')
  // console.log(segments, segmentsNumbers);
  const actualSegments = segmentsNumbers.map(v => mapping[v])
  // console.log(actualSegments);

  const on = [...new Array(7)].map((v, i) => actualSegments.includes(i));
  const onlyOn = (...values: number[]) => {
    let isOn = true;
    on.forEach((v, i) => {
      isOn = values.includes(i) ? (isOn && v) : (isOn && !v)
    });
    return isOn
  }

  if (onlyOn(0, 1, 2, 4, 5, 6)) {
    return 0
  } else if (onlyOn(2, 5)) {
    return 1
  } else if (onlyOn(0, 2, 3, 4, 6)) {
    return 2
  } else if (onlyOn(0, 2, 3, 5, 6)) {
    return 3
  } else if (onlyOn(1, 2, 3, 5)) {
    return 4
  } else if (onlyOn(0, 1, 3, 5, 6)) {
    return 5
  } else if (onlyOn(0, 1, 3, 4, 5, 6)) {
    return 6
  } else if (onlyOn(0, 2, 5)) {
    return 7
  } else if (onlyOn(0, 1, 2, 3, 4, 5, 6)) {
    return 8
  } else if (onlyOn(0, 1, 2, 3, 5, 6)) {
    return 9
  } else {
    return NaN;
  }
}

/*
  aaaa
 b    c
 b    c
  dddd
 e    f
 e    f
  gggg
*/

console.log("Parse test")
console.log(parseNumberSegments([0, 1, 2, 3, 4, 5, 6], 'abcefg'))
console.log(parseNumberSegments([0, 1, 2, 3, 4, 5, 6], 'cf'))
console.log(parseNumberSegments([0, 1, 2, 3, 4, 5, 6], 'acdeg'))
console.log(parseNumberSegments([0, 1, 2, 3, 4, 5, 6], 'acdfg'))
console.log(parseNumberSegments([0, 1, 2, 3, 4, 5, 6], 'bcdf'))
console.log(parseNumberSegments([0, 1, 2, 3, 4, 5, 6], 'abdfg'))
console.log(parseNumberSegments([0, 1, 2, 3, 4, 5, 6], 'abdefg'))
console.log(parseNumberSegments([0, 1, 2, 3, 4, 5, 6], 'acf'))
console.log(parseNumberSegments([0, 1, 2, 3, 4, 5, 6], 'abcdefg'))

console.log(perm([0, 1, 2, 3, 4, 5, 6]).every((map) => !isNaN(parseNumberSegments(map, 'abcdefg'))))

console.log(perm([0, 1, 2, 3, 4, 5, 6]).length)

/*
 dddd
e    a
e    a
 ffff
g    b
g    b
 cccc
*/

console.log(parseNumberSegments([2, 5, 6, 0, 1, 3, 4], 'acedgfb')); // 8
console.log(parseNumberSegments([2, 5, 6, 0, 1, 3, 4], 'cdfbe')); // 5
console.log(parseNumberSegments([2, 5, 6, 0, 1, 3, 4], 'gcdfa')); // 2
console.log(parseNumberSegments([2, 5, 6, 0, 1, 3, 4], 'fbcad')); // 3
console.log(parseNumberSegments([2, 5, 6, 0, 1, 3, 4], 'dab')); // 7
console.log(parseNumberSegments([2, 5, 6, 0, 1, 3, 4], 'cefabd')); // 9
console.log(parseNumberSegments([2, 5, 6, 0, 1, 3, 4], 'cdfgeb')); // 6
console.log(parseNumberSegments([2, 5, 6, 0, 1, 3, 4], 'eafb')); // 4
console.log(parseNumberSegments([2, 5, 6, 0, 1, 3, 4], 'cagedb')); // 0
console.log(parseNumberSegments([2, 5, 6, 0, 1, 3, 4], 'ab')); // 1

// console.log(parseNumberSegments([0, 1, 2, 3, 4, 5, 6], 'acdeg'))

let toAdd = parsed.map((v, i) => {
  let result = null as number | null;
  console.log(i);
  perm([0, 1, 2, 3, 4, 5, 6]).forEach(mapping => {
    if (result !== null) return;
    const allValid = v.input.concat(v.output).every((segments) => !isNaN(parseNumberSegments(mapping, segments)));
    // let test = v.input.concat(v.output).map((segments) => parseNumberSegments(mapping, segments));
    // // if (test.filter(v => !isNaN(v)).length > 8) {
    // if (test.filter(v => v === 6).length > 0) {
    //   console.log(mapping, test);
    // }
    // // result = 0;
    if (allValid) {
      const digit0 = parseNumberSegments(mapping, v.output[0]);
      const digit1 = parseNumberSegments(mapping, v.output[1]);
      const digit2 = parseNumberSegments(mapping, v.output[2]);
      const digit3 = parseNumberSegments(mapping, v.output[3]);

      result = digit0 * 1e3 + digit1 * 1e2 + digit2 * 1e1 + digit3
    }
  })
  return result;
});

console.log(toAdd);

console.log(toAdd.reduce((t, v) => v !== null && t !== null ? t + v : NaN, 0))