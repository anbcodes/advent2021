const input = Deno.readTextFileSync('input.txt');

const stro = input.split('\n\n')[0].trim()

const replaceRules = Object.fromEntries(input.split('\n\n')[1].trim().split('\n').map(v => v.split(' -> ')));

let str = stro;

console.log(str);
console.log(replaceRules);

for (let i = 0; i < 10; i++) {
  for (let j = 0; j < str.length; j++) {
    const add = replaceRules[str[j] + str[j + 1]];
    if (add) {
      str = str.slice(0, j + 1) + add + str.slice(j + 1);
      j++;
    }
  }
  console.log(i);
}

const counts: Record<string, number> = {};

str.split('').map(v => {
  if (!counts[v]) {
    counts[v] = 0;
  }

  counts[v] += 1;
})


console.log(counts);

const counts3: Record<string, number> = {};

const cache: Record<string, Record<string, number>[]> = {}

const search = (l1: string, l2: string, level: number): Record<string, number> => {
  // counts3[l1] = (counts3[l1] || 0) + 1
  // counts3[l2] = (counts3[l2] || 0) + 1

  const mapped = replaceRules[l1 + l2];
  if (mapped && level > 0) {
    if (cache[l1 + l2] && cache[l1 + l2][level]) {
      const obj = cache[l1 + l2][level];

      Object.entries(obj).forEach(([key, value]) => {
        counts3[key] = (counts3[key] || 0) + value;
      })

      return obj;
    }

    counts3[mapped] = (counts3[mapped] || 0) + 1

    const obj: Record<string, number> = {};
    obj[mapped] = 1

    const obj2 = search(l1, mapped, level - 1);
    Object.entries(obj2).forEach(([key, value]) => {
      obj[key] = (obj[key] || 0) + value;
    })

    const obj3 = search(mapped, l2, level - 1);
    Object.entries(obj3).forEach(([key, value]) => {
      obj[key] = (obj[key] || 0) + value;
    })

    if (!cache[l1 + l2]) {
      cache[l1 + l2] = [];
    }

    cache[l1 + l2][level] = {};

    Object.entries(obj).forEach(([key, value]) => {
      cache[l1 + l2][level][key] = (cache[l1 + l2][level][key] || 0) + value;
    })

    return obj;
  }
  return {};
}

for (let j = 0; j < stro.length - 1; j++) {
  search(stro[j], stro[j + 1], 40);
}

stro.split('').map(v => {
  if (!counts3[v]) {
    counts3[v] = 0;
  }

  counts3[v] += 1;
})


console.log(counts3);

Object.entries(counts3).forEach(([key, value]) => {
  console.log(key, value.toString(10).length, value);
})

// const counts2: Record<string, number> = {};

// let mystr = 'NN'


// for (let i = 0; i < 40; i++) {
//   for (let j = 0; j < mystr.length; j++) {
//     const add = replaceRules[mystr[j] + mystr[j + 1]];
//     if (add) {
//       mystr = mystr.slice(0, j + 1) + add + mystr.slice(j + 1);
//       j++;
//     }
//   }
//   console.log(i);
// }

// str.split('').map(v => {
//   if (!counts2[v]) {
//     counts2[v] = 0;
//   }

//   counts2[v] += 1;
// })

// console.log(counts2);