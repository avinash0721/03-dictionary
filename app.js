const inputEl = document.getElementById("input");
const info = document.getElementById("information");
const meaning = document.getElementById("meaning-container");
const title = document.getElementById("title");
const meaningEl = document.getElementById("meaning");
const audio = document.getElementById("audio");

async function fetchAPI(word) {
  info.innerText = `searching the meaning of  " ${word} "`;

  try {
    info.style.display = "block";
    meaning.style.display = "none";
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const result = await fetch(url).then((res) => res.json());

    if (result.title) {
      meaning.style.display = "block";
      // word & meaning
      info.style.display = "none";
      title.innerText = word;
      meaningEl.innerText = "N/A";
      audio.src = "none";
    } else {
      info.style.display = "none";
      meaning.style.display = "block";

      // word & meaning
      // audio.style.display = "inline-flex";
      title.innerText = result[0].word;
      meaningEl.innerText = result[0].meanings[0].definitions[0].definition;
      audio.src = result[0].phonetics[0].audio;
    }
  } catch (error) {
    console.log(error);
  }
}

inputEl.addEventListener("keyup", (e) => {
  if (e.target.value && e.key === "Enter") {
    fetchAPI(e.target.value);
  }
});
