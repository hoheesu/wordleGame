const BASE_URL = "https://random-word.ryanrk.com";

export const getWord = async () => {
  try {
    document.querySelector(".loader").style.display = "block";
    document.querySelector(".board-wrap").style.display = "none";
    const response = await fetch(`${BASE_URL}/api/en/word/random/?length=5`);
    const data = await response.json();
    console.log(data[0]);
    document.querySelector(".loader").style.display = "none";
    document.querySelector(".board-wrap").style.display = "block";
    return data[0];
  } catch (error) {
    console.error(error);
  }
};
