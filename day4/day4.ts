const input = Deno.readTextFileSync('input.txt');

const toCross = input.split('\n')[0].split(',').map(v => +v)

const boards = input.trim()
  .split('\n\n')
  .slice(1)
  .map(v => v.split('\n')
    .map(v => v.trim()
      .split(/ +/g)
      .map(v => ({ number: +v.trim(), crossed: false }))
    ))
  .map(v => ({ won: false, rows: v }));


let currentWinScore = 0;

let won = 0;

toCross.forEach(num => {
  boards.forEach(board => {
    board.rows.forEach(row => {
      row.forEach(col => {
        if (col.number === num) {
          col.crossed = true;
        }
      })
    })

    boards.forEach(board => {
      if (board.won) {
        return;
      }
      let bingo = false;
      board.rows.forEach(row => {
        if (row.every((v) => v.crossed)) {
          bingo = true;
        }
      })

      for (let col = 0; col < board.rows[0].length; col++) {
        let allCrossed = true;
        for (let row = 0; row < board.rows[0].length; row++) {
          if (!board.rows[row][col].crossed) {
            allCrossed = false;
          }
        }
        if (allCrossed) {
          bingo = true;
        }
      }

      let allCrossed = true;
      for (let i = 0; i < board.rows.length; i++) {
        if (!board.rows[i][i].crossed) {
          allCrossed = false;
        }
      }

      if (allCrossed) {
        bingo = true;
      }

      allCrossed = true;
      for (let i = 0; i < board.rows.length; i++) {
        if (!board.rows[i][4 - i].crossed) {
          allCrossed = false;
        }
      }

      if (allCrossed) {
        bingo = true;
      }


      if (bingo) {
        const sum = board.rows.reduce((t, v) => t + v.reduce((t, v) => t + (v.crossed ? 0 : v.number), 0), 0);
        board.won = true;
        console.log("Found new:", sum * num);
        currentWinScore = sum * num;
        if (!won) {
          won = sum * num
        }
      }
    })
  })
})


console.log('    Part 1:', won);
console.log('    Part 2:', currentWinScore);

// console.log(boards)