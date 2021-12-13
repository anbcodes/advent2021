const input = Deno.readTextFileSync('input.txt');

const mappingArr = input.trim().split('\n').map(v => v.split('-'));

const mapping: Record<string, string[] | undefined> = {};

mappingArr.forEach(v => {
  const arr = mapping[v[0]];
  if (arr) {
    arr.push(v[1]);
  } else {
    mapping[v[0]] = [v[1]];
  }

  const earr = mapping[v[1]];
  if (earr) {
    earr.push(v[0]);
  } else {
    mapping[v[1]] = [v[0]];
  }
});

console.log(mapping);

const paths: string[][] = [];

const findPaths = (node: string[] | undefined, path = ["start"]) => {
  if (node === undefined) {
    return;
  }

  node.forEach(v => {
    if (v === 'start') {
      return;
    }
    if (v === 'end') {
      const toAdd = [...path, 'end'];
      let found = false;
      const valid = toAdd.filter((v, i) => toAdd.indexOf(v) === i).every((v2) => {
        if (v2.toLowerCase() === v2 && toAdd.filter(v3 => v3 === v2).length >= 2) {
          if (!found) {
            found = true;
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
      })
      if (valid) {
        if (paths.length % 100 === 0) {
          console.log(paths.length, toAdd.length);
        }
        paths.push(toAdd);
      }
      return;
    }
    if (v.toLowerCase() === v) {
      if (path.filter(v2 => v === v2).length < 2) {
        findPaths(mapping[v], [...path, v]);
      }
    } else {
      findPaths(mapping[v], [...path, v]);
    }
  })
}

findPaths(mapping.start);

console.log(paths.map(v => v.join(',')).join('\n'));
console.log();
console.log(paths.length);