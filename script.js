async function translateText() {
  const text = inputText.value.trim();
  const from = fromLang.value;
  const to = toLang.value;

  if (!text) return;

  try {
    const response = await fetch("https://translate.argosopentech.com/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ q: text, source: from, target: to, format: "text" })
    });

    if (!response.ok) throw new Error("Translation failed");

    const data = await response.json();
    outputText.value = data.translatedText;
  } catch (err) {
    outputText.value = "⚠️ Error: " + err.message;
  }
}
