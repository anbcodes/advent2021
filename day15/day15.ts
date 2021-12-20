const input = Deno.readTextFileSync("input.txt")

let grid = input.trim().split("\n").map(v => v.split("").map(v => +v))
  .map(v => [
    ...v,
    ...v.map(v => ((v + 0) % 9) + 1),
    ...v.map(v => ((v + 1) % 9) + 1),
    ...v.map(v => ((v + 2) % 9) + 1),
    ...v.map(v => ((v + 3) % 9) + 1)])

grid = [
  ...grid,
  ...grid.map(v => v.map(v => ((v + 0) % 9) + 1)),
  ...grid.map(v => v.map(v => ((v + 1) % 9) + 1)),
  ...grid.map(v => v.map(v => ((v + 2) % 9) + 1)),
  ...grid.map(v => v.map(v => ((v + 3) % 9) + 1)),
]

const sizeStart = 0;

// for (let y = sizeStart; y < grid.length; y++) {
//   let str = ''
//   for (let x = sizeStart; x < grid[0].length; x++) {
//     str += grid[y][x];
//     if ((x + 1) % 100 === 0) {
//       str += ' '
//     }
//   }
//   console.log(str);
//   if ((y + 1) % 100 === 0) {
//     console.log();
//   }
// }

console.log()

// console.log(grid);
// Deno.exit();

const printGrid = (a: number[][] = grid, p = 2) => {
  // for (let y = sizeStart; y < a.length; y++) {
  //   let str = ''
  //   for (let x = sizeStart; x < a[0].length; x++) {
  //     str += a[y]?.[x] !== undefined ? a[y][x].toString(10).padStart(p, '0') : 'n'.repeat(p);
  //   }
  //   console.log(str);
  // }

}

const newGrid = [...new Array(grid.length)].map(_ => new Array(grid[0].length));

const hash = (x: number, y: number) => x * 10000 + y

const addTo = (x: number, y: number) => {
  while (grid[y]?.[x] !== undefined) {
    let distance = grid[y]?.[x];
    const down = newGrid[y + 1]?.[x];
    const right = newGrid[y]?.[x + 1];
    const up = newGrid[y - 1]?.[x];
    const left = newGrid[y]?.[x - 1];

    if (up !== undefined || left !== undefined) {
      console.log(x, y, newGrid[y][x], up, left);
      printGrid(newGrid);
    }

    if (down === undefined && right === undefined) {
      distance = distance;
    } else {
      distance += Math.min(down ?? Infinity, right ?? Infinity)
      //console.log('+y');
    }

    newGrid[y][x] = distance;
    x -= 1;
    y += 1;
  }
}



const addTo2 = (x: number, y: number) => {
  while (grid[y]?.[x] !== undefined) {
    const distance = grid[y]?.[x];
    const down = newGrid[y + 1]?.[x];
    const right = newGrid[y]?.[x + 1];
    const up = newGrid[y - 1]?.[x];
    const left = newGrid[y]?.[x - 1];
    const min = Math.min(down ?? Infinity, up ?? Infinity, left ?? Infinity, right ?? Infinity);

    if (distance + min < newGrid[y]?.[x] && min !== null) {
      newGrid[y][x] = distance + min;
    }

    if (right === undefined && left === undefined) {
      newGrid[y][x] = distance;
    }

    if (newGrid[y][x] === 0) {
      console.log(distance, up, down, left, right, min, x, y)
    }

    x -= 1;
    y += 1;
  }
}

for (let h = 0; h < grid.length; h++) {
  const x = grid[0].length - 1;
  const y = grid.length - h - 1;

  addTo(x, y);

  //Deno.exit()
}

for (let w = grid[0].length; w > 0; w--) {
  const x = w - 1;
  const y = 0;

  addTo(x, y);

  //Deno.exit()
}

console.log(grid[0][0], newGrid[0][0], newGrid[0][0] - grid[0][0])


// Passes

for (let pass = 0; pass < 100; pass++) {
  for (let h = 0; h < grid.length; h++) {
    const x = grid[0].length - 1;
    const y = grid.length - h - 1;

    addTo2(x, y);

    //Deno.exit()
  }

  for (let w = grid[0].length; w > 0; w--) {
    const x = w - 1;
    const y = 0;

    addTo2(x, y);

    //Deno.exit()
  }
}


printGrid(newGrid);

console.log(grid[0][0], newGrid[0][0], newGrid[0][0] - grid[0][0])

// 2973 to high
// 2972 to high
// 2936 to low
// 2939 didn't tell me
// 2940 didn't tell me

// Attempt one - Too slow for real input
//*
// let minRiskLevel = 1e10

// const hash = (x: number, y: number) => x * 10000 + y

// const search = (x: number, y: number, risk: number, been: Set<number>) => {
//   if (risk >= minRiskLevel || grid[y]?.[x] === undefined || been.has(hash(x, y))) {
//     console.log(x, y)
//     return
//   }

//   if (y == grid.length - 1 && x == grid[0].length - 1) {
//     minRiskLevel = risk
//     console.log(risk)
//     return
//   }

//   risk += grid[y][x]
//   been.add(hash(x, y))

//   search(x + 1, y, risk, new Set<number>(been))
//   search(x - 1, y, risk, new Set<number>(been))
//   search(x, y + 1, risk, new Set<number>(been))
//   search(x, y - 1, risk, new Set<number>(been))
// }

// search(0, 0, 0, new Set())

// console.log(grid)

// console.log(minRiskLevel, 0)
//*/
