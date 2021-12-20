const input = Deno.readTextFileSync("input.txt")

const points = input.split("\n\n")[0].trim().split("\n").map(v => v.split(",").map(v => +v));

const commands = input.split("\n\n")[1].trim().split("\n").map(v => v.slice(11).split("=")).map(v => ({ axis: v[0], at: +v[1] }));

console.log(points)
console.log(commands)

let hash = (el: number[]) => el[0] * 1000000 + el[1]

let unhash = (v: number) => [Math.floor(v / 1000000), v % 1000000]

let newpoints = points

commands.forEach(command => {
  let mi = command.axis === "x" ? 0 : 1

  newpoints = newpoints.map(v => {
    if (v[mi] > command.at) {
      v[mi] = command.at - (v[mi] - command.at)
    }
    return v
  });
})

let hashed = newpoints.map(hash);

let deduplicatedCount = [...new Set(hashed)].length;

console.log(hashed, deduplicatedCount)

for (let y = 0; y < 40; y++) {
  let s = ""
  for (let x = 0; x < 300; x++) {
    if (hashed.includes(hash([x, y]))) {
      s += "#"
    } else {
      s += "."
    }
  }
  console.log(s)
}

console.log(deduplicatedCount)
