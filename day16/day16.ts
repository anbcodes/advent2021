const input = Deno.readTextFileSync('input.txt');

const hexMap: Record<string, string> = {
  0: "0000",
  1: "0001",
  2: "0010",
  3: "0011",
  4: "0100",
  5: "0101",
  6: "0110",
  7: "0111",
  8: "1000",
  9: "1001",
  A: "1010",
  B: "1011",
  C: "1100",
  D: "1101",
  E: "1110",
  F: "1111",
}

interface Packet {
  version: number,
  type: number,
  value: number | undefined,
  children: Packet[],
  len: number,
}

const binary = input.trim().split('').map(v => hexMap[v].split('').map(v => +v)).flat()
// const binary = '0101001000100100'.split('').map(v => +v);

const parsePacket = (packet: number[]): Packet => {
  const version = parseInt(packet.slice(0, 3).join(''), 2)
  const type = parseInt(packet.slice(3, 6).join(''), 2)
  const children: Packet[] = [];
  let len = 0;
  let value = undefined;
  if (type === 4) {
    const binValues: number[] = [];
    let i = 6;
    while (true) {
      binValues.push(...packet.slice(i + 1, i + 5));
      if (packet[i] === 0) {
        break;
      }
      i += 5;
    }
    len = i + 5;
    // while (packet[len] === 0) {
    //   len += 1;
    // }
    value = parseInt(binValues.join(''), 2);
  } else {
    const type = packet[6];
    if (type === 0) {
      const totalLen = parseInt(packet.slice(7, 7 + 15).join(''), 2);
      let i = 0;
      while (i < totalLen) {
        const parsed = parsePacket(packet.slice(i + 7 + 15));
        i += parsed.len;
        children.push(parsed);
      }
      len = i + 7 + 15;
    } else {
      const packetCount = parseInt(packet.slice(7, 7 + 11).join(''), 2);
      let pi = 0;
      for (let i = 0; i < packetCount; i++) {
        const parsed = parsePacket(packet.slice(pi + 7 + 11));
        pi += parsed.len;
        children.push(parsed);
      }
      len = pi + 7 + 11;
    }
  }
  return { version, type, children, value, len }
}

// console.log(binary.join(''))

let sum = 0;
let packet = parsePacket(binary);

const rec = (p: Packet) => {
  sum += p.version;
  p.children.forEach(rec);
}

rec(packet);

const compute = (p: Packet) => {
  if (p.value !== undefined) {
    return;
  }
  p.children.forEach(compute);

  const values = p.children.map(v => v.value).filter(v => v !== undefined) as number[];

  if (values.length !== p.children.length) {
    throw new Error("Child's value not comptued");
  }

  switch (p.type) {
    case 0:
      p.value = values.reduce((t, v) => t + v, 0);
      break;
    case 1:
      p.value = values.reduce((t, v) => t * v, 1);
      break;
    case 2:
      p.value = Math.min(...values);
      break;
    case 3:
      p.value = Math.max(...values);
      break;
    case 5:
      p.value = values[0] > values[1] ? 1 : 0;
      break;
    case 6:
      p.value = values[0] < values[1] ? 1 : 0;
      break;
    case 7:
      p.value = values[0] == values[1] ? 1 : 0;
      break;
  }
}

compute(packet);

// console.dir(packet, { depth: 1000 });

console.log(sum);
console.log(packet.value);
