const input = Deno.readTextFileSync('input.txt');

const matched = input.match(/x=([-0-9]+)\.\.([-0-9]+).*y=([-0-9]+)\.\.([-0-9]+)/);

if (!matched) {
  throw new Error('Match not found for ' + input);
}

const target = {
  minX: +matched[1],
  minY: +matched[3],
  maxX: +matched[2],
  maxY: +matched[4],
}

console.log(target);

let tragetory = { x: 0, y: 0 };

const sim = (tragetory: { x: number, y: number }): { tragetory: { x: number, y: number }, dist: number, maxY: number } => {
  const pos = { x: 0, y: 0 };
  const vel = { ...tragetory };
  let maxY = -Infinity;
  for (let s = 0; s < Infinity; s++) {
    pos.x += vel.x;
    pos.y += vel.y;

    if (pos.y > maxY) {
      maxY = pos.y;
    }

    vel.y -= 1;
    vel.x += vel.x > 0 ? -1 : (vel.x < 0 ? 1 : 0);

    if (pos.x >= target.minX && pos.x <= target.maxX && pos.y >= target.minY && pos.y <= target.maxY) {
      return { tragetory, maxY, dist: 0 };
    }

    if (pos.y < target.minY) {
      return {
        tragetory, maxY, dist: Math.sqrt(
          Math.min(Math.abs(pos.x - target.minX), Math.abs(pos.x - target.maxX)) ** 2
          + Math.min(Math.abs(pos.y - target.minY), Math.abs(pos.y - target.maxY)) ** 2,
        )
      }
    }
  }
  return { tragetory, maxY, dist: Infinity };
}

console.log(sim({ x: 7, y: 2 }))
console.log(sim({ x: 6, y: 3 }))
console.log(sim({ x: 9, y: 0 }))
console.log(sim({ x: 17, y: -4 }))
console.log(sim({ x: 6, y: 9 }))

// Find a tragetory
while (true) {
  let min = sim({ x: tragetory.x + 1, y: tragetory.y });
  let pnewMin = sim({ x: tragetory.x + 1, y: tragetory.y + 1 });
  if (pnewMin.dist < min.dist) {
    min = pnewMin;
  }
  pnewMin = sim({ x: tragetory.x + 1, y: tragetory.y - 1 });
  if (pnewMin.dist < min.dist) {
    min = pnewMin;
  }

  pnewMin = sim({ x: tragetory.x - 1, y: tragetory.y });
  if (pnewMin.dist < min.dist) {
    min = pnewMin;
  }
  pnewMin = sim({ x: tragetory.x - 1, y: tragetory.y + 1 });
  if (pnewMin.dist < min.dist) {
    min = pnewMin;
  }
  pnewMin = sim({ x: tragetory.x - 1, y: tragetory.y - 1 });
  if (pnewMin.dist < min.dist) {
    min = pnewMin;
  }

  pnewMin = sim({ x: tragetory.x, y: tragetory.y + 1 });
  if (pnewMin.dist < min.dist) {
    min = pnewMin;
  }
  pnewMin = sim({ x: tragetory.x, y: tragetory.y - 1 });
  if (pnewMin.dist < min.dist) {
    min = pnewMin;
  }
  tragetory = min.tragetory;

  if (min.dist === 0) {
    break;
  }
}

let max = sim(tragetory);

while (true) {
  let pmax = sim({ x: tragetory.x, y: tragetory.y + 1 });
  if (pmax.dist !== 0) {
    for (let dy = 1; dy < 300; dy++) {
      for (let dx = -300; dx < 300; dx++) {
        pmax = sim({ x: tragetory.x + dx, y: tragetory.y + dy });
        if (pmax.dist === 0 && pmax.maxY > max.maxY) {
          max = pmax;
          console.log(max);
        }
      }
    }
    tragetory = max.tragetory;
    if (pmax.dist !== 0) {
      break;
    }
  } else {
    max = pmax;
    console.log(max);
    tragetory = max.tragetory;
  }
}

console.log(tragetory, max);

console.log('Part 1:', max.maxY);

const valid = [];

for (let x = -500; x < 500; x++) {
  for (let y = -500; y < 500; y++) {
    const at = sim({ x, y });
    if (at.dist === 0) {
      valid.push(at);
    }
  }
}

console.log('Part 2:', valid.length);

// 2346 to low
// 8646 to low