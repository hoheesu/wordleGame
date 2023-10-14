import { getWord } from "./fetch.js";

let answer = "";
let boxCount = 1;
let containerCount = 1;
let pressEnter = false;
let gameOver = false;
let correctAnswer = false;

(async function answerFnc() {
  let word = await getWord();
  answer = word.toUpperCase();
  if (!/^[A-Z]+$/.test(answer)) {
    answerFnc();
  }
})();

const backFilterEl = document.querySelector(".back-filter");
const modalEl = document.getElementById("modal");
const modalCloseEl = document.querySelector(".close-btn");
const modalAlertMessage = document.querySelector(".modal-container");

const Keyboard = window.SimpleKeyboard.default;
const myKeyboard = new Keyboard({
  onKeyPress: (button) => onKeyPress(button),
  mergeDisplay: true,
  layoutName: "default",
  layout: {
    default: [
      "q w e r t y u i o p",
      "a s d f g h j k l",
      "z x c v b n m {Backspace}",
      "{space} {Enter}",
    ],
  },
  display: {
    "{Enter}": "⏎",
    "{Backspace}": "⌫",
  },
});

document.addEventListener("keyup", (e) => {
  e.preventDefault();
  keyPressFnc(e, false);
  console.log(containerCount);
});

function onKeyPress(button) {
  keyPressFnc(button, true);
}

function keyPressFnc(el, isMyKey) {
  //키보드 혹은 버튼을 눌렀을 때 실행될 함수
  let box = document.querySelector(
    `.box-container-${containerCount}>.box-${boxCount}`,
  );
  const lastBox = document.querySelector(
    `.box-container-${containerCount}>.box-5`,
  );
  let keyboard;
  isMyKey ? (keyboard = el) : (keyboard = el.key);
  // 키보드로 누른 것인지 버튼으로 누른것인지에 따라 변수
  if (pressEnter) return;
  if (keyboard >= "a" && keyboard <= "z") {
    //A-Z 키보드 누르는 경우
    if (box.textContent === "") {
      // 박스가 비어있는 경우
      box.textContent = `${keyboard.toUpperCase()}`;
      box.style.border = "transparent";
      setTimeout(() => {
        box.style.border = "2px solid #fff";
      }, 50);
      if (boxCount < 5) boxCount++;
    }
  } else if (keyboard === "Backspace" || keyboard === "{Backspace}") {
    //backspace누르는 경우
    if (box.innerHTML === "") {
      if (boxCount > 1) {
        boxCount--;
        box = document.querySelector(
          `.box-container-${containerCount}>.box-${boxCount}`,
        );
      }
    }
    box.style.border = "transparent";
    setTimeout(() => {
      box.style.border = "2px solid #fff";
    }, 50);
    box.innerHTML = "";
  } else if (keyboard === "Enter" || keyboard === "{Enter}") {
    // Enter키 누르는 경우
    if (boxCount < 5 || lastBox.textContent === "") alert();
    else checkAnswer();
  }
}

function checkAnswer() {
  // 정답확인 함수
  let boxes = document.querySelectorAll(
    `.box-container-${containerCount}>.box`,
  );
  let userAnswer = [];

  for (const element of boxes) {
    userAnswer.push(element.innerText);
  }
  if (userAnswer.join("") === answer) {
    correctAnswer = true;
    gameOver = true;
    alert();
  } else if (containerCount === 6) {
    gameOver = true;
    // correctAnswer = false;
    alert();
  }

  userAnswer.forEach((word, index) => {
    const box = document.querySelector(
      `.box-container-${containerCount}>.box-${index + 1}`,
    );
    if (word === answer[index]) {
      box.style.backgroundColor = "#15903e";
      box.style.color = "#fff";
    } else if (answer.includes(word)) {
      box.style.backgroundColor = "#908815";
      box.style.color = "#fff";
    } else {
      box.style.backgroundColor = "#901915";
      box.style.color = "#fff";
    }
  });
  boxCount = 1;
  containerCount += 1;
}

function alert() {
  backFilterEl.style.display = "block";
  modalEl.style.display = "block";
  pressEnter = true;
  if (!gameOver) {
    modalAlertMessage.innerHTML = `
    <div class="text-box">
    <i class="fa-sharp fa-solid fa-circle-exclamation" style="color: #901915" ></i>
    <p>
      5글자를 입력해주세요 !!
    </p>
    <i class="fa-sharp fa-solid fa-circle-exclamation" style="color: #901915" ></i>
    </div>`;
  } else if (gameOver && correctAnswer) {
    modalAlertMessage.innerHTML = `
      <div class="text-box">
      <i class="fa-solid fa-champagne-glasses" style="color: #908815"></i>
      <p>
        ${containerCount}번 만에 <br />
        정답!!
      </p>
      <i class="fa-solid fa-champagne-glasses" style="color: #908815"></i>
      </div>
      <button id="restart">다시하기</button>`;
  } else if (gameOver && !correctAnswer) {
    modalAlertMessage.innerHTML = `
      <div class="text-box">
      <i class="fa-solid fa-champagne-glasses" style="color: #908815"></i>
      <p>
        아쉽습니다<br/> 정답은 ${answer.toUpperCase()} 였습니다.
      </p>
      <i class="fa-solid fa-champagne-glasses" style="color: #908815"></i>
      </div>
      <button id="restart">다시하기</button>`;
  }
  modalCloseEl?.addEventListener("click", (e) => {
    e.preventDefault();
    backFilterEl.style.display = "none";
    modalEl.style.display = "none";
    pressEnter = false;
  });
  if (gameOver) {
    document.getElementById("restart").addEventListener("click", (e) => {
      e.preventDefault();
      answer = "";
      boxCount = 1;
      containerCount = 1;
      pressEnter = false;
      gameOver = false;
      correctAnswer = false;
      backFilterEl.style.display = "none";
      modalEl.style.display = "none";
      let boxes = document.querySelectorAll(".box");
      boxes.forEach((box) => {
        box.innerText = "";
        box.style.backgroundColor = "#333";
      });
      (async () => {
        const word = await getWord();
        answer = word.toUpperCase();
      })();
    });
  }
}
