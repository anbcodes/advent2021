
type SnailNum = (SnailNum[] | number)

const get = (n: SnailNum, location: number[]): SnailNum | undefined => {
  let part: SnailNum | undefined = n;
  location.forEach(loc => {
    if (typeof part === 'number') {
      return;
    }
    part = part?.[loc];
  })

  return part;
}


const searchRight = (n: SnailNum, loc: number[]) => {
  let currentLoc = [...loc];
  while (true) {
    const parentInd = currentLoc.slice(0, -1);
    const ind = currentLoc.slice(-1)[0];
    const part = get(n, parentInd);
    if (part instanceof Array && part[ind + 1] !== undefined) {
      currentLoc = [...currentLoc.slice(0, -1), ind + 1];
      break;
    }
    currentLoc = currentLoc.slice(0, -1)
    if (currentLoc.length === 0) {
      return undefined;
    }
  }

  while (true) {
    const part = get(n, currentLoc);
    if (part instanceof Array) {
      currentLoc.push(0)
    } else {
      break;
    }
  }
  return currentLoc
}

const searchLeft = (n: SnailNum, loc: number[]) => {
  let currentLoc = [...loc];
  while (true) {
    const parentInd = currentLoc.slice(0, -1);
    const ind = currentLoc.slice(-1)[0];
    const part = get(n, parentInd);
    if (part instanceof Array && part[ind - 1] !== undefined) {
      currentLoc = [...currentLoc.slice(0, -1), ind - 1];
      break;
    }
    currentLoc = currentLoc.slice(0, -1)
    if (currentLoc.length === 0) {
      return undefined;
    }

  }

  while (true) {
    const part = get(n, currentLoc);
    if (part instanceof Array) {
      currentLoc.push(part.length - 1)
    } else {
      break;
    }
  }
  return currentLoc
}

const split = (n: SnailNum, location: number[]) => {
  const part = get(n, location);
  if (typeof part !== 'number') {
    throw new Error('Part in split must be number (Found: ' + JSON.stringify(part) + ')')
  }
  const parent = get(n, location.slice(0, -1));
  if (parent === undefined) {
    throw new Error('Part in split must have a parent')
  }
  const pindex = location.slice(-1)[0]
  //@ts-ignore
  parent[pindex] = [Math.floor(part / 2), Math.ceil(part / 2)]
}


const explode = (n: SnailNum, location: number[]) => {
  const part = get(n, location);
  if (!(part instanceof Array)) {
    throw new Error('Part in explode must be an Array (Found: ' + JSON.stringify(part) + ')')
  }
  if (typeof part[0] !== 'number' || typeof part[1] !== 'number') {
    throw new Error('Part in explode must be an Array with two numbers (Found: ' + JSON.stringify(part) + ')')
  }

  const left = searchLeft(n, location)
  if (left !== undefined) {
    const parent = get(n, left.slice(0, -1))
    const ind = left.slice(-1)[0];
    if (parent instanceof Array && typeof parent[ind] === 'number') {
      (parent[ind] as number) += part[0];
    }
  }

  const right = searchRight(n, location)
  if (right !== undefined) {
    const parent = get(n, right.slice(0, -1))
    const ind = right.slice(-1)[0];
    if (parent instanceof Array && typeof parent[ind] === 'number') {
      (parent[ind] as number) += part[1];
    }
  }

  const parent = get(n, location.slice(0, -1));
  const ind = location.slice(-1)[0]
  //@ts-ignore
  parent[ind] = 0;
}

let reduceFound = false

const reduceRec = (n: SnailNum, location: number[], doSplit: boolean, level = 0) => {
  const part = get(n, location)
  if (part) {
    if (level >= 4 && part instanceof Array && !doSplit) {
      reduceFound = true;
      explode(n, location)
    } else if (typeof part === 'number' && part >= 10 && doSplit) {
      reduceFound = true;
      split(n, location);
    } else if (part instanceof Array) {
      part.forEach((_, i) => {
        if (!reduceFound) {
          reduceRec(n, [...location, i], doSplit, level + 1)
        }
      })
    }
  }
}

const reduce = (n: SnailNum) => {
  reduceFound = true;
  while (reduceFound) {
    reduceFound = false;
    reduceRec(n, [], false, 0);
    if (!reduceFound) {
      reduceRec(n, [], true, 0);
    }
    console.dir(n, { depth: 10000 });
  }
}

const n = [[0, [10, [10, [3, 4]]]], [1, [2, [3, [4, 5]]]]];

console.dir(n, { depth: 1000 });
reduce(n)