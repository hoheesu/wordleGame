// // import axios from "axios";
// import axios from "axios"; // 절대 경로 사용

// const BASE_URL = "https://random-word.ryanrk.com";
// export const getWord = async () => {
//   try {
//     const response = await axios.get(
//       `${BASE_URL}/api/en/word/random/?length=5`,
//     );
//     console.log(response.data[0]);
//     return response.data[0];
//   } catch (errors) {
//     console.error(errors);
//   }
// };

const BASE_URL = "https://random-word.ryanrk.com";

export const getWord = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/en/word/random/?length=5`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data[0]);
    return data[0];
  } catch (error) {
    console.error(error);
  }
};
