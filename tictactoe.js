const tdList = document.getElementById('tictactoe').getElementsByTagName('td');
const rowNum = document.getElementsByTagName('tr').length;
const colNum = document
  .querySelector('tr.row')
  .getElementsByTagName('td').length;
const cancleBtn = document.getElementById('cancleBtn');
let count;
let playHistory;
let player;

function draw(event, callback) {
  console.log('draw() start');
  if (event.target.innerHTML !== '') {
    return;
  }

  if (count % 2 === 0) {
    player = 'X';
  } else {
    player = 'O';
  }

  cancleBtn.disabled = '';

  playHistory.push(event.target);
  event.target.innerHTML = player;
  count += 1;
  callback(event, player);
}

function checkEnd(event, player) {
  console.log('checkEnd() start');
  const eventRow = event.target.parentNode.getElementsByTagName('td');
  const eventCol = document.getElementsByName(
    event.target.getAttribute('name'),
  );
  const rowIdx = Array.from(document.getElementsByTagName('tr')).indexOf(
    event.target.parentNode,
  );
  const colIdx = event.target.getAttribute('name');

  if (count < 2 * rowNum - 1) {
    console.log('checkEnd() end');
    return;
  }

  // 가로줄 판정
  for (let index = 0; index < colNum; index++) {
    if (eventRow[index].innerHTML != player) {
      break;
    }
    if (index == colNum - 1) {
      printResult(`${player} 승리`);
      return;
    }
  }

  // 세로줄 판정
  for (let index = 0; index < rowNum; index++) {
    if (eventCol[index].innerHTML != player) {
      break;
    }
    if (index == rowNum - 1) {
      printResult(`${player} 승리`);
      return;
    }
  }

  // 대각선 판정
  if (rowIdx == colIdx) {
    for (let index = 0; index < rowNum; index++) {
      if (document.getElementsByName(index)[index].innerHTML != player) {
        break;
      }
      if (index == rowNum - 1) {
        printResult(`${player} 승리`);
        return;
      }
    }
  }

  // 역대각선 판정
  if (parseInt(rowIdx) + parseInt(colIdx) == rowNum - 1) {
    for (let index = 0; index < rowNum; index++) {
      if (
        document.getElementsByName(index)[rowNum - index - 1].innerHTML
        != player
      ) {
        break;
      }
      if (index == rowNum - 1) {
        printResult(`${player} 승리`);
        return;
      }
    }
  }

  // 무승부 판정
  if (count == tdList.length) {
    printResult('무승부');
    return;
  }
  console.log('checkEnd() end');
}

for (let index = 0; index < tdList.length; index++) {
  tdList[index].addEventListener('click', (event) => {
    draw(event, checkEnd);
  });
}

document.getElementById('cancleBtn').addEventListener('click', () => {
  cancle();
});

window.onload = initialize();

function initialize() {
  count = 0;
  playHistory = [];
  cancleBtn.disabled = 'disabled';
  for (let i = 0; i < colNum; i++) {
    const col = document.getElementsByName(i);
    for (let j = 0; j < rowNum; j++) {
      col[j].innerHTML = '';
    }
  }
}



function cancle() {
  console.log('cancle() start');
  playHistory.pop().innerHTML = '';
  count--;
  if (playHistory.length == 0) {
    cancleBtn.disabled = 'disabled';
  }
}

function printResult(message) {
  setTimeout(() => {
    alert(message);
    initialize();
  }, 100);
}
