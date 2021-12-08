const input = Deno.readTextFileSync('input.txt')

let fish = input.split(',').map(v => +v);

for (let day = 0; day < 80; day++) {
  let toAdd = 0;
  fish = fish.map(v => {
    const newTimer = v - 1;
    if (newTimer === -1) {
      toAdd += 1;
      return 6
    } else {
      return newTimer;
    }
  });

  for (let i = 0; i < toAdd; i++) {
    fish.push(8);
  }
}

console.log(fish.length);

// Part 2


const parsedInput = input.split(',').map(v => +v);

const fishCounts = [0, 0, 0, 0, 0, 0, 0, 0, 0];

parsedInput.forEach((v) => {
  fishCounts[v] += 1;
})

for (let day = 0; day < 256; day++) {
  const reproduce = fishCounts[0];
  fishCounts.shift();

  if (reproduce === undefined) throw new Error();

  fishCounts[6] += reproduce;
  fishCounts[8] = reproduce;

}

console.log(fishCounts, fishCounts.reduce((t, v) => t + v, 0));

// 39350610892934 to high