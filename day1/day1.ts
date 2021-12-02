const part1 = (input: string[]) => {
  const result = input.map(v => +v).reduce((t, v, i, a) => v > a[i - 1] ? t + 1 : t, 0);
  console.log('    Part 1:', result.toString(10));
}

const part2 = (input: string[]) => {
  const result = input
    .map(v => +v)
    .map((_, i, a) => a[i] + a[i + 1] + a[i + 2])
    .slice(0, -2)
    .reduce((t, v, i, a) => v > a[i - 1] ? t + 1 : t, 0);
  console.log('    Part 2:', result.toString(10));
}

const input = Deno.readTextFileSync("input.txt").split('\n');

console.log("Deno:")

part1(input);
part2(input);

