const input = Deno.readTextFileSync("input.txt")

const lines = input.split("\n").map(v => v.split(""))

const corruptedLines = lines.filter(v => v[0] !== v.slice(-1)[0]);

const points: Record<string, number> = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
}

const syntax: Record<string, string | undefined> = {
  ')': '(',
  ']': '[',
  '}': '{',
  '>': '<'
};

const syntaxRev = Object.fromEntries(Object.entries(syntax).map(([key, value]) => [value, key]))

const openingChars = Object.values(syntax);

let score = 0;

const nonCorruptedLines = lines.filter((line, i) => {
  const state: string[] = [];

  let tempScore = 0;

  const corrupted = !line.every((char, ci) => {
    if (openingChars.includes(char)) {
      state.push(char);
      return true;
    } else if (state.slice(-1)[0] === syntax[char]) {
      state.pop();
      return true;
    } else {
      tempScore += points[char];
      return false;
    }
  })

  if (corrupted) {
    score += tempScore;
    return false;
  } else {
    return true;
  }
})

console.log('Part 1', score)

// 359703 to low


const pointsAutocomplete: Record<string, number> = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
}

let totals = nonCorruptedLines.map(line => {
  const state: string[] = [];

  line.forEach(char => {
    if (openingChars.includes(char)) {
      state.push(char);
      return true;
    } else if (state.slice(-1)[0] === syntax[char]) {
      state.pop();
      return true;
    } else {
      throw new Error('Should be unreachable')
    }
  });

  return state.reverse().reduce((t, v) => t * 5 + pointsAutocomplete[syntaxRev[v]], 0)
});

totals.sort((a, b) => a - b)

console.log(totals);

console.log(totals[Math.floor(totals.length / 2)])