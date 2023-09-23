export default function alert() {
  let backFilterEl = document.querySelector(".back-filter") as HTMLElement;
  let modalEl = document.getElementById("modal") as HTMLElement;
  let modalCloseEl = document.querySelector(".close-btn") as HTMLElement;
  // modalEl?.classList.add("active");
  // modalEl?.classList.remove("none");
  // backFilterEl?.classList.remove("none");
  // backFilterEl?.classList.add("active");
  backFilterEl.style.display = "block";
  modalEl.style.display = "block";

  modalCloseEl?.addEventListener("click", (e) => {
    e.preventDefault();
    backFilterEl.style.display = "none";
    modalEl.style.display = "none";

    // modalEl?.classList.remove("active");
    // backFilterEl?.classList.remove("active");
    // modalEl?.classList.add("none");
    // backFilterEl?.classList.add("none");
  });
}
