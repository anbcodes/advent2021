const part1 = (input: string[]) => {
  const commandMovement = input.map(v => v.split(' ')).map(v => ({
    instruction: v[0],
    amount: +v[1],
  }));

  const horizontal = commandMovement
    .filter(({ instruction }) => instruction === 'forward')
    .reduce((t, { amount }) => t + amount, 0);

  const depth = commandMovement
    .filter(({ instruction }) => instruction === 'up' || instruction === 'down')
    .reduce((t, { instruction, amount }) => instruction === 'up' ? t - amount : t + amount, 0);

  const result = horizontal * depth;

  console.log(`Part 1\n\tHorizontal:  ${horizontal}\n\tDepth: ${depth}\n\tPuzzle answer: ${result}`);
}

const part2 = (input: string[]) => {
  const commandMovement = input.map(v => v.split(' ')).map(v => ({
    instruction: v[0],
    amount: +v[1],
  }));

  const horizontal = commandMovement
    .filter(({ instruction }) => instruction === 'forward')
    .reduce((t, { amount }) => t + amount, 0);

  const depth = commandMovement
    .reduce(({ total, aim }, { instruction, amount }) => ({
      total: total + (instruction === 'forward' ? amount * aim : 0),
      aim: aim + (
        instruction === 'up'
          ? -amount
          : (instruction === 'down' ? amount : 0)
      ),
    }), {
      total: 0,
      aim: 0,
    });

  const result = horizontal * depth.total;

  console.log(`Part 2\n\tHorizontal:  ${horizontal}\n\tDepth: ${depth.total}\n\tPuzzle answer: ${result}`);
}

const input = Deno.readTextFileSync("input.txt").split('\n');

part1(input);
part2(input);
