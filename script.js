const fromLang = document.getElementById("fromLang");
const toLang = document.getElementById("toLang");
const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");

const languages = {
  en: "English",
  es: "Spanish",
  fr: "French",
  de: "German",
  hi: "Hindi",
  ja: "Japanese",
  ko: "Korean",
  zh: "Chinese",
  ru: "Russian",
  ar: "Arabic",
  pt: "Portuguese",
  it: "Italian",
  tr: "Turkish",
  pl: "Polish",
  nl: "Dutch"
};

// Fill language options
for (const code in languages) {
  fromLang.innerHTML += `<option value="${code}">${languages[code]}</option>`;
  toLang.innerHTML += `<option value="${code}">${languages[code]}</option>`;
}
fromLang.value = "en";
toLang.value = "hi";

// Translate function
async function translateText() {
  const text = inputText.value.trim();
  const from = fromLang.value;
  const to = toLang.value;

  if (!text) return;

  const response = await fetch("https://libretranslate.de/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ q: text, source: from, target: to, format: "text" })
  });

  const data = await response.json();
  outputText.value = data.translatedText;
}

// Copy
function copyText(type) {
  const text = type === "input" ? inputText.value : outputText.value;
  navigator.clipboard.writeText(text);
  alert("Copied to clipboard!");
}

// Pronunciation
function playText(type) {
  const text = type === "input" ? inputText.value : outputText.value;
  const lang = type === "input" ? fromLang.value : toLang.value;
  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = lang;
  window.speechSynthesis.speak(msg);
}

// Swap
function swapLanguages() {
  const temp = fromLang.value;
  fromLang.value = toLang.value;
  toLang.value = temp;

  const tempText = inputText.value;
  inputText.value = outputText.value;
  outputText.value = tempText;
}

// Dark mode
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}
