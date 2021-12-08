const input = Deno.readTextFileSync("input.txt")

const positions = input.trim().split(",").map(v => +v)

const maxPos = Math.max(...positions)

let minFuel = 100000000

for (let i = 0; i <= maxPos; i++) {
  //let fuel = positions.reduce((t, v) => t + Math.abs(v - i), 0)
  let fuel = positions.reduce((t, v) => {
    let steps = Math.abs(v - i)
    let used = steps * ((steps + 1)) / 2
    return t + used
  }, 0) 

  if (fuel < minFuel) {
    minFuel = fuel
  }
}

console.log("Part 1:", minFuel)
