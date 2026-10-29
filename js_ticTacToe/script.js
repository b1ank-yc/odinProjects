
function clearBoard(board) {
  for (let i = 0; i < board.length; i++) {
    board[i] = '';
  }
}


const cssVar = (name, el = document.documentElement) => ({
  get value() {
    return getComputedStyle(el).getPropertyValue(name).trim();
  },
  set value(v) {
    el.style.setProperty(name, v);
  }
});


const gameBoard = (() => {
  const board = ['', '', '', '', '', '', '', '', ''];

  const getBoard = () => board;

  const assignMarker = (cell, marker) => {
    const c = Number(cell);
    if (board[c] !== '' || c > 8 || c < 0) {
      return false;
    } else {
      board[c] = marker;
      return true;
    }
  }

  return { getBoard, assignMarker };
})();


function createPlayer(name, marker) {
  let score = 0;

  const addScore = () => score++;
  const getScore = () => score;
  const getMarker = () => marker;

  return { name, addScore, getScore, getMarker };
};


function checkRules(board) {

  const checkBoard = () => {
    const [a, b, c, d, e, f, g, h, i] = board;

    if (a !== '' && [a, b, c].every(value => value === a)) {
      return [a, 1];
    } else if (d !== '' && [d, e, f].every(value => value === d)) {
      return [d, 2];
    } else if (g !== '' && [g, h, i].every(value => value === g)) {
      return [g, 3];
    } else if (a !== '' && [a, d, g].every(value => value === a)) {
      return [a, 4];
    } else if (b !== '' && [b, e, h].every(value => value === b)) {
      return [b, 5];
    } else if (c !== '' && [c, f, i].every(value => value === c)) {
      return [c, 6];
    } else if (a !== '' && [a, e, i].every(value => value === a)) {
      return [a, 7];
    } else if (c !== '' && [c, e, g].every(value => value === c)) {
      return [c, 8];
    } else if (!board.includes('')) {
      return 'draw';
    } else {
      return false;
    }
  };

    return { checkBoard };
};


function renderWindow(p1_name, p2_name) {
  const container = document.createElement('div');
  container.classList.add('window_container');

  for (let i = 0; i < 4; i++) {
    if (i === 0) {
      const section = document.createElement('div');
      section.classList.add('inline_flex_wndw');
      section.classList.add(`underline${i}`);
      const span1 = document.createElement('span');
      span1.classList.add('wndw_text');
      const span2 = document.createElement('span');
      span2.classList.add(`wndw_score${i}`);

      span1.textContent = p1_name;
      span2.textContent = '0';

      section.appendChild(span1);
      section.appendChild(span2);
      container.appendChild(section);
    } else if (i === 1) {
      const section = document.createElement('div');
      section.classList.add('inline_flex_wndw');
      section.classList.add(`underline${i}`);
      const span1 = document.createElement('span');
      span1.classList.add('wndw_text');
      const span2 = document.createElement('span');
      span2.classList.add(`wndw_score${i}`);

      span1.textContent = p2_name;
      span2.textContent = '0';

      section.appendChild(span1);
      section.appendChild(span2);
      container.appendChild(section);
    } else if (i === 2) {
      const section = document.createElement('div');
      section.classList.add('inline_flex_wndw');
      const btn1 = document.createElement('button');
      btn1.classList.add('button_style');
      btn1.classList.add(`wndw_btn${i}`);
      const btn2 = document.createElement('button');
      btn2.classList.add('button_style');
      btn2.classList.add(`wndw_btn_${i}`);

      btn1.textContent = 'Next Round';
      btn2.textContent = 'Home';

      section.appendChild(btn1);
      section.appendChild(btn2);
      container.appendChild(section);
    } 
  }

  return container;
}


function renderBoard(array, p1_name, p2_name) {
  const board_container = document.createElement('div');
  board_container.classList.add('board_grid');

  for (let i = 0; i < array.length; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell_style');
    cell.id = `${i}`;
    cell.textContent = '';
    board_container.appendChild(cell);
  };

  const wndw = renderWindow(p1_name, p2_name);
  board_wrapper.appendChild(wndw);

  board_wrapper.appendChild(board_container);
  const cells = board_container.querySelectorAll('.cell_style');

  const updateBoard = () => {
    let i = 0;
    cells.forEach(cell => {
      cell.textContent = array[i];
      i++
    });
  };

  return { updateBoard, cells };
}


function controllerUI() {
  const start_button = document.getElementById('begin_button');
  const close_button = document.getElementById('close_btn');
  const input_popup = document.getElementById('name_input_popup');
  const display_value = cssVar('--display-value');
  const confirm_button = document.getElementById('confirm_btn');
  const p1_name = document.getElementById('p1_name');
  const p2_name = document.getElementById('p2_name');
  const board_wrapper = document.getElementById('board_wrapper');

  // SET NAMES POPUP
  start_button.addEventListener('click', () => {
    input_popup.showModal();
    display_value.value = 'none';
  });
  // CLOSE "SET NAMES" WINDOW
  close_button.addEventListener('click', () => {
    input_popup.close();
    display_value.value = 'block';
  });
  // CONFIRM NAMES -> DISPLAY BOARD
  confirm_button.addEventListener('click', (e) => {
    if (p1_name.value.length >= 2 && p2_name.value.length >= 2) {
      e.preventDefault();
      input_popup.close();
      display_value.value = 'none';
      const renderedBoard = renderBoard(gameBoard.getBoard(), p1_name.value, p2_name.value);

      const p1 = createPlayer(p1_name.value, 'O');
      const p2 = createPlayer(p2_name.value, 'X');
      let currentPlayer = 1;
      let roundFinished = false;

      let p1_score_elem = document.querySelector('.wndw_score0');
      let p2_score_elem = document.querySelector('.wndw_score1');

      const next_round_btn = document.querySelector('.wndw_btn2');
      const home_btn = document.querySelector('.wndw_btn_2');

      // PLAY ROUND
      renderedBoard.cells.forEach(cell => {
        let currentCell;
        
        cell.addEventListener('click', () => {
          const status = checkRules(gameBoard.getBoard());
          let cond;
          currentCell = cell.id;

          if (currentPlayer === 1 && roundFinished !== true) {
            let result = gameBoard.assignMarker(currentCell, p1.getMarker());
            if (result === false) {
              currentPlayer = 1;
            } else {
              currentPlayer = 2;
              cond = status.checkBoard();
              if (Array.isArray(cond)) {
                p1.addScore();
                renderedBoard.updateBoard();
                roundFinished = true;
                p1_score_elem.textContent = p1.getScore();
                 // DELETE
              } else if (cond === 'draw') {
                renderedBoard.updateBoard();
                roundFinished = true;
                                             // DELETE
              } else if (cond === false) {
                renderedBoard.updateBoard();
              }
            }
          } else if (currentPlayer === 2 && roundFinished !== true) {
            let result = gameBoard.assignMarker(currentCell, p2.getMarker());
            if (result === false) {
              currentPlayer = 2;
            } else {
              currentPlayer = 1;
              cond = status.checkBoard();
              if (Array.isArray(cond)) {
                p2.addScore();
                renderedBoard.updateBoard();
                roundFinished = true;
                p2_score_elem.textContent = p2.getScore();
                  // DELETE
              } else if (cond === 'draw') {
                renderedBoard.updateBoard();
                roundFinished = true;
                                              // DELETE
              } else if (cond === false) {
                renderedBoard.updateBoard();
              }
            };
          };
        });
      });

      next_round_btn.addEventListener('click', () => {
        if (roundFinished === true) {
          clearBoard(gameBoard.getBoard());
          renderedBoard.updateBoard();
          roundFinished = false;
        }
      });

      home_btn.addEventListener('click', () => {
        roundFinished = false;
        currentPlayer = 1;
        board_wrapper.replaceChildren();
        p1_name.value = '';
        p2_name.value = '';
        clearBoard(gameBoard.getBoard());
        display_value.value = 'block';
      });
    };
  });
};

controllerUI();

//  CLICK THE CELL
//  WHOSE TURN IS IT? THEIR MARKER?
//  WHICH CELL IS IT?
//  IS THE CELL OCCUPIED?
//  MARK THE CELL
//  CHECK THE CELL
// 
//  RETURN RESULT / CONTINUE
// 
