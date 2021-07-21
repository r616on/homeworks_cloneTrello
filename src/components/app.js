import TrelloWidget from "./Trello-Widget/Trello-Widget";

document.addEventListener("DOMContentLoaded", () => {
  const perent = document.querySelector(".conteiner");
  const widget = new TrelloWidget(perent);
  widget.bindToDOM();
});
