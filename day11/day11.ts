const input = Deno.readTextFileSync('input.txt');

const grid = input.trim().split('\n').map(v => v.split('').map(v => +v));

let updateableGrid = grid;

let flashes = 0;

const flashed = new Set<string>();

const flashIf = (x: number, y: number, add = true) => {
  // console.log('flashif', x, y, add);
  if (updateableGrid[y] && updateableGrid[y][x] !== undefined && add) {
    updateableGrid[y][x] += 1;
  }

  if (updateableGrid[y] && updateableGrid[y][x] !== undefined && updateableGrid[y][x] > 9 && !flashed.has(`${x},${y}`)) {
    flashes += 1;
    flashed.add(`${x},${y}`);
    updateableGrid[y][x] = 0;
    flashIf(x + 1, y + 1);
    flashIf(x + 1, y);
    flashIf(x + 1, y - 1);

    flashIf(x, y + 1);
    flashIf(x, y - 1);

    flashIf(x - 1, y + 1);
    flashIf(x - 1, y);
    flashIf(x - 1, y - 1);
  }
}

for (let i = 0; i < Infinity; i++) {
  flashed.clear();
  updateableGrid = updateableGrid.map(v => v.map(v2 => v2 + 1));

  updateableGrid.forEach((row, y) => {
    row.forEach((cell, x) => {
      flashIf(x, y, false);
    })
  });

  [...flashed.values()].forEach(v => {
    let [x, y] = v.split(',').map(v => +v);
    updateableGrid[y][x] = 0;
  });

  let allFlashed = updateableGrid.every(row => row.every(cell => cell === 0));
  let total = updateableGrid.reduce((t, row) => t + row.reduce((t, cell) => cell + t, 0), 0);
  // console.log(updateableGrid);
  if (allFlashed || total === 0) {
    console.log(i + 1);
    break;
  }
}

console.log(flashes);