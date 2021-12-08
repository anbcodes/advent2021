const input = Deno.readTextFileSync('input.txt');

const parsed = input
  .trim()
  .split('\n')
  .map(v => v.split(' -> ')
    .map(v => v.split(',').map(v => +v))
    .map(([x, y]) => ({ x, y }))
  ).map(([from, to]) => ({ from, to }));

// const horizontalVert = parsed.filter(v => v.from.x === v.to.x || v.from.y === v.to.y)

const plane = new Map<string, number>();

const setPlane = (x: number, y: number) => {
  const key = `${x},${y}`
  const current = plane.get(key) || 0;
  plane.set(key, current + 1);
}

parsed.forEach(v => {
  if (v.from.x === v.to.x) {
    const start = v.from.y > v.to.y ? v.to.y : v.from.y;
    const end = v.from.y <= v.to.y ? v.to.y : v.from.y;
    for (let y = start; y <= end; y++) {
      setPlane(v.from.x, y);
    }
  } else if (v.from.y === v.to.y) {
    const start = v.from.x > v.to.x ? v.to.x : v.from.x;
    const end = v.from.x <= v.to.x ? v.to.x : v.from.x;
    for (let x = start; x <= end; x++) {
      setPlane(x, v.from.y);
    }
  } else {
    const xDir = v.from.x > v.to.x ? -1 : 1;
    const yDir = v.from.y > v.to.y ? -1 : 1;

    let x = v.from.x;
    let y = v.from.y;

    while (x !== v.to.x + xDir && y !== v.to.y + yDir) {
      setPlane(x, y);
      x += xDir;
      y += yDir;
    }
  }
})

let total = 0;

const gridWidth = 1000;
const gridHeight = 1000;
// const gridWidth = 10;
// const gridHeight = 10;

for (let y = 0; y < gridHeight; y++) {
  let row = '';
  for (let x = 0; x < gridWidth; x++) {
    const value = plane.get(`${x},${y}`) || 0;
    if (value >= 2) total += 1;
    row += value;
  }
  // console.log(row);
}

console.log([...plane.values()].filter(v => v >= 2).length);
console.log(total);
// 1725 to low
// 1737 to low

// 16906 to low for part2