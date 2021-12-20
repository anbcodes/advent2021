const input = Deno.readTextFileSync('inputp.txt');

const scanners = input.trim().split('\n\n').map(v => v.trim().split('\n')).map(v => ({
  number: +(v[0].match(/scanner ([0-9]+)/)?.[1] || NaN),
  beacons: v.slice(1).map(v => v.split(',').map(v => +v)).map((v) => ({
    pos: v,
    id: Math.random(),
  })),
  offset: null as number[] | null,
  orientation: null as null | {
    signs: number[],
    order: number[],
  }
}))

scanners[0].offset = [0, 0, 0]

/* Pseudo code
For every scanner
  For every other scanner with offsets
    if scanner1 has twelve similar points to scanner2
      calculate the offset and rotation based on those


how to check for similar points
  first find two points that have the same relative offset (regardless of rotation)
    look for twelve more
    if twelve not found
      repeat
    else
      your done
*/

function perms(xs: number[]): number[][] {
  if (!xs.length) return [[]];
  return xs.flatMap(x => {
    // get permutations of xs without x, then prepend x to each
    return perms(xs.filter(v => v !== x)).map(vs => [x, ...vs]);
  });
}

const possibleOrderMaps = perms([0, 1, 2]);
const possibleSignMaps = [
  [1, 1, 1],
  [1, 1, -1],
  [1, -1, 1],
  [1, -1, -1],
  [-1, 1, 1],
  [-1, 1, -1],
  [-1, -1, 1],
  [-1, -1, -1],
]


const chooseTwo = <T>(arr: T[]): T[][] => {
  // return arr.flatMap(
  //   (v, i) => arr.slice(i + 1).map((w, i2) => [v, w])
  // );
  return arr.flatMap(
    (v, i) => arr.map((w, i2) => [v, w]).filter(v => v[0] !== v[1])
  );
}

type Beacon = { pos: number[], id: number };

const calcOffset = (p1: number[], p2: number[]): number[] => {
  const absx = p1[0] - p1[0];
  const absy = p1[1] - p1[1];
  const absz = p1[2] - p1[2];
  return [absx, absy, absz];
}

const calcDistance = (b1: Beacon, b2: Beacon): number => {
  const dx = b1.pos[0] - b2.pos[0];
  const dy = b1.pos[1] - b2.pos[1];
  const dz = b1.pos[2] - b2.pos[2];

  return Math.sqrt(dx ** 2 + dy ** 2 + dz ** 2)
}

const equal = (pos1: number[], pos2: number[]): boolean => pos1[0] === pos2[0] && pos1[1] === pos2[1] && pos1[2] === pos2[2];

let similarCount = 0;

scanners.filter(v => v.offset === null).forEach(scannerToCheck => {
  scanners.filter(v => v.offset !== null).forEach(scannerBase => {
    const similarChecks: Beacon[] = [];
    const similarBases: Beacon[] = [];
    let count = 0;
    chooseTwo(scannerToCheck.beacons).forEach(beacons => {
      const absDist = calcDistance(beacons[0], beacons[1]);
      chooseTwo(scannerBase.beacons).every(baseBeacons => {
        const baseAbsDist = calcDistance(baseBeacons[0], baseBeacons[1]);
        if (absDist === baseAbsDist) {
          possibleOrderMaps.forEach(orderMap => {
            possibleSignMaps.forEach(signMap => {
              const mapFunc = (_: number, i: number, a: number[]) => a[orderMap[i]] * signMap[i];
              const beacon0Mapped = beacons[0].pos.map(mapFunc)
              const beacon1Mapped = beacons[1].pos.map(mapFunc)

              const b0OffBase0 = calcOffset(beacon0Mapped, baseBeacons[0].pos);
              const b0OffBase1 = calcOffset(beacon0Mapped, baseBeacons[1].pos);
              const b1OffBase0 = calcOffset(beacon1Mapped, baseBeacons[0].pos);
              const b1OffBase1 = calcOffset(beacon1Mapped, baseBeacons[1].pos);

              if (b0OffBase0 === b1OffBase0 || b0OffBase0 === b0OffBase1)
            })
          })
          return false;
        }
        return true;
      })
    })
    console.log('checking', scannerToCheck.number, 'and', scannerBase.number, `got (${count})`)
    if (count >= 12) {
      console.log(`${scannerToCheck.number} has at least 12 similar to ${scannerBase.number}`)
    }
  })
})

