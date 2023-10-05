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
