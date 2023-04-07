let player1 = "X";
let retryGame_boxTextArr = [];
var game_audio = new Audio("gameMusic.mp3");
var click_audio = new Audio("Atari Frogger Win.mp3");
var winAudio = new Audio("Win.mp3");
// ----------------change X to O and O to X -------------------------------
let player2 = function () {
  return player1 === "X" ? "O" : "X";
};

let boxes = document.getElementsByClassName("box");

// ---------------play Game--------------------------
let playGameFun = function () {
  document.getElementById("gameWinnerId").innerHTML = "";
  document.getElementById(
    "volumeBtn"
  ).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="16" fill="aliceblue" class="bi bi-volume-up volumeUp"
        viewBox="0 0 16 16">
        <path
          d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z" />
        <path
          d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z" />
        <path
          d="M10.025 8a4.486 4.486 0 0 1-1.318 3.182L8 10.475A3.489 3.489 0 0 0 9.025 8c0-.966-.392-1.841-1.025-2.475l.707-.707A4.486 4.486 0 0 1 10.025 8zM7 4a.5.5 0 0 0-.812-.39L3.825 5.5H1.5A.5.5 0 0 0 1 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 7 12V4zM4.312 6.39 6 5.04v5.92L4.312 9.61A.5.5 0 0 0 4 9.5H2v-3h2a.5.5 0 0 0 .312-.11z" />
      </svg>


      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="16" fill="aliceblue"
        class="bi bi-volume-mute volumeDown" viewBox="0 0 16 16">
        <path
          d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zM6 5.04 4.312 6.39A.5.5 0 0 1 4 6.5H2v3h2a.5.5 0 0 1 .312.11L6 10.96V5.04zm7.854.606a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0z" />
      </svg>`;

  document.getElementById(
    "turn_change"
  ).innerHTML = ` <div class="turnChanging">
            <h4>Play : </h4>
            <input type="button" id="playersId" value="Player-1" style="border:none">
          </div>`;
  document.getElementById("playId").value = "Play";
  game_audio.play();

  Array.from(boxes).forEach((element) => {
    console.log("Array", Array.from(boxes));
    //
    let boxText = element.querySelector(".boxText");
    element.addEventListener("click", () => {
      if (boxText.innerText === "") {
        boxText.innerText = player1;
        click_audio.play();
        player1 = player2();
        retryGame_boxTextArr.push(boxText.innerText);
        if (boxText.innerText === "X") {
          document.getElementById("turnId").style.alignItems = "flex-end";
          document.getElementById("playersId").value = "Player-2";
        } else {
          document.getElementById("turnId").style.alignItems = "flex-start";
          document.getElementById("playersId").value = "Player-1";
        }

        setTimeout(function () {
          winner();
        }, 1000);
      }
    });
  });
};
// ----------------------retry Game Function--------------------------------

let retryGameFun = function () {
  document.getElementById("playId").value = "Retry";
  Array.from(boxes).forEach((element) => {
    let boxText = element.querySelector(".boxText");
    boxText.innerText = "";
  });
};

// ---------------------------Game Winner--------------------------------------------

let winner = function () {
  let boxText = document.getElementsByClassName("boxText");
  let win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  win.forEach((element) => {
    if (
      boxText[element[0]].innerText === boxText[element[1]].innerText &&
      boxText[element[2]].innerText === boxText[element[1]].innerText &&
      boxText[element[0]].innerText !== ""
    ) {
      game_audio.pause();
      winAudio.play();
      if (boxText[element[0]].innerText == "X") {
        document.getElementById("gameWinnerId").innerHTML = `<div id="winnerId">
        <p style=" font-family: monospace; font-size: large;"> Player-1</p>
      
        <p>You Won !</p>
        </div>`;
      } else {
        document.getElementById("gameWinnerId").innerHTML = `<div id="winnerId">
        <p style=" font-family: monospace; font-size: large;"> Player-2</p>
        <p>You Won</p>
        </div>`;
      }
      retryGameFun();
      // document.getElementById("playId").value = "Retry";
    }
  });
};

// ---------------------------------------------------------------------------------------------
