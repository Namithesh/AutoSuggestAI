(async function () {
  console.log("AutiSuggestions Worker Loaded");
  chrome.runtime.onMessage.addListener(promptHandler);
})();

async function promptHandler(message, sender, sendResponse) {
  if (message.prompt) {
    const suggestions = await fetchSuggestions(message.prompt);
    console.log({ suggestions });
    console.log("Sending Response");
    sendResponse(suggestions);
    return true;
  }
}

async function fetchSuggestions(inputValue) {
  const resposne = await fetch(
    `https://search.brave.com/api/suggest?q=${inputValue}`,
  );
  if (!resposne.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await resposne.json();
  return data;
}
