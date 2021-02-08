// Инициализация основных переменных -------------------------------------------
let players = ['x', 'o'];                 // Символы игроков
let activePlayer;                         // Активный игрок
let winPlayerIndex;                       // Победил игрок с индексом
let winPlayerMesIndex;                    // Сообщение о победе игрока с инд.
let winPlayerX;                           // Победил игрок X
let winPlayerO;                           // Победил игрок O
let winGame = [winPlayerX, winPlayerO];   // Массив с переменными о победителях
let winGameMes = ["Игрок X победил", "Игрок O победил"];
// Сообщение о победе игрока
let board = [];                           // Поле игры
let namePlayers = ['Игрок 1', 'Игрок 2']; // Имена игроков
// -----------------------------------------------------------------------------

// Количество ячеек поля по горизонтали и вертикали ----------------------------
let fieldNumber = prompt("Введите количество ячеек поля игры по горизонтали и вертикали от 3 до 5");

// Функция startGame -----------------------------------------------------------
function startGame() {
  // Установление активного игрока и дополнительных параметров
  activePlayer = players[0];
  winPlayerIndex = winGame[0];
  winPlayerMesIndex = winGameMes[0];
  
  // Обновляем поле игры при рестарте
  board = [];  

  // Создаем поле игры ---------------------------------------------------------
  if (fieldNumber >= 3 && fieldNumber <= 5) {
    for (let i = 0; i < fieldNumber; i++) { 
      board.push([i]);
      for (let a = 1; a < fieldNumber; a++) {
        board[i].push(a);
        board[i][a - 1] = '';
        board[i][a] = '';
      }
    }
  } else {
      console.log("Введите значение fieldNumber в диапазоне от 3 до 5");
  }
  // ---------------------------------------------------------------------------

  renderBoard(board); // Отрисовываем поле

  // Блок с подсказкой ---------------------------------------------------------
  if (fieldNumber >= 3 && fieldNumber <= 4) {
    console.log("Условие победы:\nПоставьте 3 символа по горизонтали, вертикали или диагонали в ряд!");
  }
  if (fieldNumber == 5) {
    console.log("Условие победы:\nПоставьте 4 символа по горизонтали, вертикали или диагонали в ряд!");
  }
}
// Конец функции startGame -----------------------------------------------------


// Функция click ---------------------------------------------------------------
function click(row, col) {
  board[row][col] = activePlayer;
  renderBoard(board);
  
  let winPlayers; // Переменная для хранения информации о победителе

  // Блок с функциями для поля 3x3 и 4x4 ---------------------------------------
  // Функция для проверки строк
  function printWinPlayerStr(player, winPlayer, winPlayerMes) {
    for (let i = 0; i < board.length; i++) {
      for (let a = 0; a <= board[i].length - 3; a++) {
        if (board[i][a] === player && board[i][a + 1] === player && 
          board[i][a + 2] === player) {
            winPlayer = winPlayerMes;
            return winPlayer;
        }
      }
    }
  }

  // Функция для проверки столбцов
  function printWinPlayerCol(player, winPlayer, winPlayerMes) {
    for (let i = 0; i <= board.length - 3; i++) {
      for (let a = 0; a < board[i].length; a++) {
        if (board[i][a] === player && board[i + 1][a] === player
          && board[i + 2][a] === player) {
            winPlayer = winPlayerMes;
            return winPlayer;
        }
      }
    }
  }

  // Функция для проверки диагоналей
  function printWinPlayerDia(player, winPlayer, winPlayerMes) {
    for (let i = 0; i <= board.length - 3; i++) {
      for (let a = 0; a <= board[i].length - 3; a++) {
        if ((board[i][a] === player && board[i + 1][a + 1] === player 
          && board[i + 2][a + 2] === player) || (board[i][a + 2] === 
          player && board[i + 1][a + 1] === player && board[i + 2][a]
          === player)) {
            winPlayer = winPlayerMes;
            return winPlayer;
        }
      }
    }
  }
  // Конец Блок с функциями для поля 3x3 и 4x4 ---------------------------------

  // Блок с функциями для поля 5x5 ---------------------------------------------
  // Функция для проверки строк
  function printWinPlayerStr5(player, winPlayer, winPlayerMes) {
    for (let i = 0; i < board.length; i++) {
      for (let a = 0; a <= board[i].length - 4; a++) {
        if (board[i][a] === player && board[i][a + 1] === player
          && board[i][a + 2] === player && board[i][a + 3] ===
          player) { 
            winPlayer = winPlayerMes;
            return winPlayer;
        }
      }
    }
  }

  // Функция для проверки столбцов
  function printWinPlayerCol5(player, winPlayer, winPlayerMes) {
    for (let i = 0; i <= board.length - 4; i++) {
      for (let a = 0; a < board[i].length; a++) {
        if (board[i][a] === player && board[i + 1][a] === player
          && board[i + 2][a] === player && board[i + 3][a] === 
          player) {
            winPlayer = winPlayerMes;
            return winPlayer;
        }
      }
    }
  }

  // Функция для проверки диагоналей
  function printWinPlayerDia5(player, winPlayer, winPlayerMes) {
    for (let i = 0; i <= board.length - 4; i++) {
      for (let a = 0; a <= board[i].length - 4; a++) {
        if ((board[i][a] === player && board[i + 1][a + 1] === player
          && board[i + 2][a + 2] === player && board[i + 3][a + 3] === 
          player) || (board[i][a + 3] === player && board[i + 1][a + 2] 
          === player && board[i + 2][a + 1] === player && board[i + 3][a]
          === player)) {
            winPlayer = winPlayerMes;
            return winPlayer;
        }
      }
    }
  }
  // Конец Блок с функциями для поля 5x5 ---------------------------------------

  // Правило для победы игрока -------------------------------------------------
  function printWinPlayer() {
    // Правило победы для поля 3x3 и 4x4
    if (fieldNumber >= 3 && fieldNumber <= 4) {
      let winPlayerStr = printWinPlayerStr(activePlayer, winPlayerIndex, winPlayerMesIndex);
      let winPlayerCol = printWinPlayerCol(activePlayer, winPlayerIndex, winPlayerMesIndex);
      let winPlayerDia = printWinPlayerDia(activePlayer, winPlayerIndex, winPlayerMesIndex);

      if (winPlayerStr === winPlayerMesIndex || winPlayerCol === 
        winPlayerMesIndex || winPlayerDia === winPlayerMesIndex) {
          winPlayers = winPlayerMesIndex;
          return winPlayers;
      }
    }
    
    // Правило победы для поля 5x5
    if (fieldNumber == 5) {
      let winPlayerStr = printWinPlayerStr5(activePlayer, winPlayerIndex, winPlayerMesIndex);
      let winPlayerCol = printWinPlayerCol5(activePlayer, winPlayerIndex, winPlayerMesIndex);
      let winPlayerDia = printWinPlayerDia5(activePlayer, winPlayerIndex, winPlayerMesIndex);

      if (winPlayerStr === winPlayerMesIndex || winPlayerCol === 
        winPlayerMesIndex || winPlayerDia === winPlayerMesIndex) {
          winPlayers = winPlayerMesIndex;
          return winPlayers;
      }
    }
  }
  // Конец Правило для победы игрока -------------------------------------------

  // Блок для вывода данных о победителе ---------------------------------------
  let winnerGame = printWinPlayer(); // Победитель игры

  if (winnerGame === "Игрок X победил") {
    showWinner(namePlayers[0]);
  } else if (winnerGame === "Игрок O победил") {
      showWinner(namePlayers[1]);
  } else if (activePlayer === players[0]) {
      activePlayer = players[1];
      winPlayerIndex = winGame[1];
      winPlayerMesIndex = winGameMes[1];
  } else {
      activePlayer = players[0];
      winPlayerIndex = winGame[0];
      winPlayerMesIndex = winGameMes[0];
  }
  // Конец Блок для вывода данных о победителе ---------------------------------
}
// Конец Функция click ---------------------------------------------------------