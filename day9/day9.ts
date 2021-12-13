const input = Deno.readTextFileSync("input.txt")

const grid = input.split("\n").map(v => v.split("").map(v => +v))

let total = 0

grid.forEach((row, ri) => {
  // console.log(ri);
  row.forEach((cell, ci) => {
    const right = row[ci + 1] ?? Infinity;
    const left = row[ci - 1] ?? Infinity;
    const up = grid[ri + 1]?.[ci] ?? Infinity;
    const down = grid[ri - 1]?.[ci] ?? Infinity;
    if (cell < up && cell < down && cell < left && cell < right) {
      total += cell + 1
    }
  })
})

console.log("Part 1:", total)

const hash = (ri: number, ci: number) => ri * grid[0].length + ci;

const inBasin = new Set<number>();
const basins: Set<number>[] = []

const get = (ri: number, ci: number) => grid[ri]?.[ci];

const findBasin = (ri: number, ci: number, passedBasin = null as (Set<number> | null)) => {
  let basin = passedBasin;

  if (!basin) {
    basin = new Set<number>();
    basins.push(basin);
  }

  // console.log(ri, ci, hash(ri, ci), inBasin.has(hash(ri, ci)))
  if (basin && get(ri, ci) !== undefined && get(ri, ci) !== 9 && !inBasin.has(hash(ri, ci))) {
    basin.add(hash(ri, ci));
    inBasin.add(hash(ri, ci));


    findBasin(ri + 1, ci, basin);
    findBasin(ri - 1, ci, basin);
    findBasin(ri, ci + 1, basin);
    findBasin(ri, ci - 1, basin);
  }
}

grid.forEach((row, ri) => row.forEach((cell, ci) => {
  if (cell !== 9 && !inBasin.has(hash(ri, ci))) {
    findBasin(ri, ci);
  }
}));

const sizes = basins.map(v => [...v].length);

sizes.sort((a, b) => b - a);

let largest = 0;
let second = 0;
let third = 0;


// console.log(basins[0], basins[1])

sizes.forEach(size => {
  if (size > largest) {
    largest = size;
  } else if (size > second) {
    second = size;
  } else if (size > third) {
    third = size;
  }
})

// console.log(sizes);

console.log(largest * second * third, largest, second, third);