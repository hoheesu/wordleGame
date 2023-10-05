import axios from "../../node_modules/axios/index";
const BASE_URL = "https://random-word.ryanrk.com";
export const getWord = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/en/word/random/?length=5`,
    );
    console.log(response.data[0]);
    return response.data[0];
  } catch (errors) {
    console.error(errors);
  }
};

// export async function getWord() {
//   const res = await fetch(`${BASE_URL}/api/en/word/random/?length=5`, {
//     method: "GET",
//   });
//   // let json = await res.json();
//   console.log(res);
//   return res;
// }
