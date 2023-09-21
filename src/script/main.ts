let answer = "abcde" as string;
let submitBtn = document.getElementById("submit-btn");
let input = document.querySelectorAll(".input") as NodeListOf<HTMLInputElement>;

submitBtn?.addEventListener("click", () => {
  // 1. 위치 맞음면 녹색
  // 2. 위치 틀리면 노랑색
  // 3. 글자 없으면 회색
  for (const inputIndex in input) {
    if (input[inputIndex].value === answer[inputIndex]) {
      input[inputIndex].style.backgroundColor = "green";
    } else if (answer.includes(input[inputIndex].value)) {
      input[inputIndex].style.backgroundColor = "yellow";
    } else {
      input[inputIndex].style.backgroundColor = "lightgrey";
    }
  }
});

// input.input KeyUp event
input.forEach((x, i) => {
  x.addEventListener("keyup", (e) => {
    if (e.code === "Backspace") {
      if (i <= input.length - 1) {
        if (i === input.length - 2) {
          input[i - 1].focus();
        } else {
          if (input[i].value.length === 0) {
            input[i - 1].value = "";
            input[i - 1].focus();
          }
        }
      }
    } else if ("KeyA" <= e.code && e.code <= "KeyZ") {
      if (i < input.length - 1) {
        if (
          input[i].value.length === Number(input[i].getAttribute("maxlength"))
        ) {
          input[i + 1].focus();
        }
      }
    }
  });
});
