function autocompleteChat(inputValue) {
  promtarea = document.getElementById("prompt-textarea");
  promtarea.innerText = inputValue;
  closeAllLists();
  const parentElement = document.querySelector(
    "div.overflow-hidden.bg-token-main-surface-primary"
  );
  select = document.createElement("select");
  select.id = "axilist";
  select.classList.add("bg-transparent", "border-0");
  const firstChild = parentElement.firstChild;
  parentElement.insertBefore(select, firstChild);
  const option = document.createElement("option");
  search(inputValue);
}

function displayData(data) {
  const option = document.createElement("option");
  option.textContent = data;
  select.appendChild(option);
}

function closeAllLists() {
  var x = document.querySelectorAll("#axilist");
  for (var i = 0; i < x.length; i++) {
    x[i].parentNode.removeChild(x[i]);
  }
}

function search(inputValue) {
  if (typeof browser === "undefined") {
    var browser = chrome;
  }
  browser.runtime.sendMessage(
    {
      url: `https://search.brave.com/api/suggest?q=${inputValue}`,
    },
    (data) => {
      select.size = data[1].length;
      for (let i = 3; i < data[1].length; i++) {
        displayData(data[1][i]);
      }
    }
  );
}

document.addEventListener("input", function (e) {
  const sitetag = document.title;
  const inputValue = e.target.value;

  if (sitetag == "ChatGPT") autocompleteChat(inputValue);
  else if (sitetag == "Gemini") autocomplete(e.target.innerText);
});

function autocomplete(inputValue) {
  //const promtarea = document.querySelector("div.ql-editor");
  //promtarea.innerText = inputValue;
  closeAllLists();
  const parentElement = document.querySelector(".text-input-field_textarea");
  select = document.createElement("select");
  select.id = "axilist";
  select.classList.add(
    // "ng-trigger-inputAreaRevealAnimation",
    "text-input-field_textarea"
  );
  select.setAttribute("_ngcontent-ng-c434525293", "");
  const firstChild = parentElement.firstChild;
  parentElement.insertBefore(select, firstChild);
  const option = document.createElement("option");

  search(inputValue);
}
