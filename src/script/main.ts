let answer = "abcde" as string;
let boxCount = 1;
document.addEventListener("keydown", (e) => {
  let box = document.querySelector(`.box-${boxCount}`) as HTMLElement;
  let lastBox = document.querySelector(".box-5") as HTMLElement;
  if (e.code >= "KeyA" && e.code <= "KeyZ") {
    if (box.textContent === "") {
      box.textContent = `${e.code[3]}`;
      box.style.border = "2px solid #f00";
      if (boxCount < 5) boxCount++;
      console.log("boxCount: ", boxCount);
    }
  } else if (e.code === "Backspace") {
    if (box.innerHTML === "") {
      if (boxCount > 1) {
        boxCount--;
        box = document.querySelector(`.box-${boxCount}`) as HTMLElement;
      }
    }
    box.innerHTML = "";
    box.style.border = "2px solid #333";
    console.log("boxCount: ", boxCount);
  } else if (e.code === "Enter") {
    boxCount < 5 || lastBox.textContent === ""
      ? alert("5글자를입력하세요")
      : checkAnswer();
  }
});

function checkAnswer() {
  let boxes = document.querySelectorAll(".box") as NodeListOf<HTMLInputElement>;
  let boxWords = "";
  boxes.forEach((el) => {
    boxWords += el.innerText;
  });
  boxWords.split("").forEach((word, index) => {
    let box = document.querySelector(`.box-${index}`) as HTMLElement;
    if (word === answer[index]) {
      box.style.backgroundColor = "green";
    }
  });
}
