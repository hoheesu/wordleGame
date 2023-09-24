// import alert from "./alert";

let answer = "truck".toUpperCase() as string;
let boxCount = 1;
let containerCount = 1;
let pressEnter = false;
let gameOver = false;

document.addEventListener("keydown", (e) => {
  e.preventDefault();
  let boxContainer = document.querySelector(
    `.box-container-${containerCount}`,
  ) as HTMLElement;
  let box = document.querySelector(
    `.box-container-${containerCount}>.box-${boxCount}`,
  ) as HTMLElement;
  let lastBox = document.querySelector(
    `.box-container-${containerCount}>.box-5`,
  ) as HTMLElement;
  if (pressEnter) return;
  if (e.code >= "KeyA" && e.code <= "KeyZ") {
    //A-Z 키보드 누르는 경우
    if (box.textContent === "") {
      box.textContent = `${e.code[3]}`;
      box.style.border = "transparent";
      setTimeout(() => {
        box.style.border = "2px solid #fff";
      }, 50);
      if (boxCount < 5) boxCount++;
      console.log(boxCount);
    }
  } else if (e.code === "Backspace") {
    //backspace누르는 경우
    if (box.innerHTML === "") {
      if (boxCount > 1) {
        boxCount--;
        box = document.querySelector(
          `.box-container-${containerCount}>.box-${boxCount}`,
        ) as HTMLElement;
      }
    }
    box.style.border = "transparent";
    setTimeout(() => {
      box.style.border = "2px solid #fff";
    }, 50);
    box.innerHTML = "";
  } else if (e.code === "Enter") {
    // Enter키 누르는 경우
    boxCount < 5 || lastBox.textContent === ""
      ? alert(gameOver)
      : checkAnswer();
  }
});

function checkAnswer() {
  // 정답확인 함수
  let boxes = document.querySelectorAll(
    `.box-container-${containerCount}>.box`,
  ) as NodeListOf<HTMLInputElement>;
  let userAnswer = [];

  for (const element of boxes) {
    userAnswer.push(element.innerText);
  }
  if (userAnswer.join("") === answer) {
    gameOver = true;
    alert(gameOver);
    // alert(`축하합니다!! ${containerCount}번 만의 성공입니다!!`);
  }

  userAnswer.forEach((word, index) => {
    const box = document.querySelector(
      `.box-container-${containerCount}>.box-${index + 1}`,
    ) as HTMLElement;
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

export default function alert(isOVer: boolean) {
  let backFilterEl = document.querySelector(".back-filter") as HTMLElement;
  let modalEl = document.getElementById("modal") as HTMLElement;
  let modalCloseEl = document.querySelector(".close-btn") as HTMLElement;
  let modalAlertMessage = document.querySelector(
    ".modal-container",
  ) as HTMLElement;
  backFilterEl.style.display = "block";
  modalEl.style.display = "block";
  pressEnter = true;
  if (gameOver) {
    modalAlertMessage.innerHTML = ` <div class="text-box">
    <i class="fa-solid fa-champagne-glasses" style="color: #15903e"></i>
    <p>
      ${containerCount}번 만에 <br />
      정답!!
    </p>
    <i class="fa-solid fa-champagne-glasses" style="color: #15903e"></i>
  </div>
  <div class="button-box">
    <button>다시하기</button>
    <button>기록보기</button>
  </div>`;
  }
  modalCloseEl?.addEventListener("click", (e) => {
    e.preventDefault();
    backFilterEl.style.display = "none";
    modalEl.style.display = "none";
    pressEnter = false;
  });
}
