let answer = "truck".toUpperCase() as string;
let boxCount = 1;
let containerCount = 1;

document.addEventListener("keydown", (e) => {
  let boxContainer = document.querySelector(
    `.box-container-${containerCount}`,
  ) as HTMLElement;
  let box = document.querySelector(
    `.box-container-${containerCount}>.box-${boxCount}`,
  ) as HTMLElement;
  let lastBox = document.querySelector(
    `.box-container-${containerCount}>.box-5`,
  ) as HTMLElement;

  if (e.code >= "KeyA" && e.code <= "KeyZ") {
    //A-Z 키보드 누르는 경우
    if (box.textContent === "") {
      box.textContent = `${e.code[3]}`;
      box.style.backgroundColor = "#ddd";
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
    box.innerHTML = "";
  } else if (e.code === "Enter") {
    // Enter키 누르는 경우
    boxCount < 5 || lastBox.textContent === ""
      ? alert("5글자를입력하세요")
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
    alert(`축하합니다!! ${containerCount}번 만의 성공입니다!!`);
  }

  userAnswer.forEach((word, index) => {
    const box = document.querySelector(
      `.box-container-${containerCount}>.box-${index + 1}`,
    ) as HTMLElement;
    if (word === answer[index]) {
      box.style.backgroundColor = "green";
      box.style.color = "#fff";
    } else if (answer.includes(word)) {
      box.style.backgroundColor = "gold";
      box.style.color = "#fff";
    } else {
      box.style.backgroundColor = "grey";
      box.style.color = "#fff";
    }
  });
  boxCount = 1;
  containerCount += 1;
}
