import { getWord } from "./fetch.js";

// const answer = (await getWord()).toUpperCase() as any;
let answer = "";

(async () => {
  const word = await getWord();
  answer = word.toUpperCase();
})();

let boxCount = 1;
let containerCount = 1;
let pressEnter = false;
let gameOver = false;

const Keyboard = window.SimpleKeyboard.default;
const myKeyboard = new Keyboard({
  onKeyPress: (button) => onKeyPress(button),
});

function onKeyPress(button) {
  keyPressFnc(button, true);
}

document.addEventListener("keyup", (element) => {
  keyPressFnc(element, false);
});

function keyPressFnc(el, isMyKey) {
  let box = document.querySelector(
    `.box-container-${containerCount}>.box-${boxCount}`,
  );
  let lastBox = document.querySelector(
    `.box-container-${containerCount}>.box-5`,
  );
  let keyboard;

  isMyKey ? (keyboard = el) : (keyboard = el.key);
  if (pressEnter) return;
  if (keyboard >= "a" && keyboard <= "z") {
    //A-Z 키보드 누르는 경우
    if (box.textContent === "") {
      box.textContent = `${keyboard.toUpperCase()}`;
      box.style.border = "transparent";
      setTimeout(() => {
        box.style.border = "2px solid #fff";
      }, 50);
      if (boxCount < 5) boxCount++;
      console.log(boxCount);
    }
  } else if (keyboard === "Backspace" || keyboard === "{bksp}") {
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
  } else if (keyboard === "Enter" || keyboard === "{enter}") {
    // Enter키 누르는 경우
    boxCount < 5 || lastBox.textContent === "" ? alert() : checkAnswer();
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
    gameOver = true;
    alert();
    // alert(`축하합니다!! ${containerCount}번 만의 성공입니다!!`);
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

export default function alert() {
  let backFilterEl = document.querySelector(".back-filter");
  let modalEl = document.getElementById("modal");
  let modalCloseEl = document.querySelector(".close-btn");
  let modalAlertMessage = document.querySelector(".modal-container");
  backFilterEl.style.display = "block";
  modalEl.style.display = "block";
  pressEnter = true;
  if (gameOver) {
    modalAlertMessage.innerHTML = `
    <div class="text-box">
    <i class="fa-solid fa-champagne-glasses" style="color: #908815"></i>
    <p>
      ${containerCount}번 만에 <br />
      정답!!
    </p>
    <i class="fa-solid fa-champagne-glasses" style="color: #908815"></i>
  </div>
  <div class="button-box">
    <button>다시하기</button>
    <button>기록보기</button>
  </div>`;
  } else {
    modalAlertMessage.innerHTML = `
    <div class="text-box">
    <i class="fa-sharp fa-solid fa-circle-exclamation" style="color: #901915" ></i>
    <p>
      5글자를 입력해주세요 !!
    </p>
    <i class="fa-sharp fa-solid fa-circle-exclamation" style="color: #901915" ></i>
  </div>
  <div class="button-box">
  </div>`;
  }
  modalCloseEl?.addEventListener("click", (e) => {
    e.preventDefault();
    backFilterEl.style.display = "none";
    modalEl.style.display = "none";
    pressEnter = false;
  });
}
