document.addEventListener("input", function (event) {
  console.log("AutoAi Loaded");
  const inputValue = event.target.value;
  promtarea = document.getElementById("prompt-textarea");
  promtarea.innerText = inputValue;
  const list = document.querySelectorAll("#axilist");
  if (list) {
    list.forEach((listItem) => {
      listItem.parentNode.removeChild(listItem);
    });
  }
  const parentElement = document.querySelector(
    "div.overflow-hidden.bg-token-main-surface-primary"
  );
  select = document.createElement("select");
  select.id = "axilist";
  select.classList.add("bg-transparent", "border-0");
  const firstChild = parentElement.firstChild;
  parentElement.insertBefore(select, firstChild);
  const option = document.createElement("option");
  const url = `https://search.brave.com/api/suggest?q=${inputValue}`;
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      select.size = data[1].length;
      for (let i = 3; i < data[1].length; i++) {
        displayData(data[1][i]);
      }
    })
    .catch((error) => {
      console.error("There was a problem fetching the data:", error);
    });
});

function displayData(data) {
  const option = document.createElement("option");
  option.textContent = data;
  select.appendChild(option);
}
