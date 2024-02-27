if (typeof browser === "undefined") {
  // https://stackoverflow.com/a/68097090
  var browser = chrome;
}

browser.runtime.onMessage.addListener(function (
  message,
  sender,
  senderResponse
) {
  fetch(message.url)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      senderResponse(res);
    });

  return true;
});
