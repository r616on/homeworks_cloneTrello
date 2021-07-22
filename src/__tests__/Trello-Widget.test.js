import TrelloWidget from "../components/Trello-Widget/Trello-Widget";

test("Test innerHtml", () => {
  document.body.innerHTML = '<div id="container"></div>';
  const container = document.querySelector("#container");
  const widget = new TrelloWidget(container);
  widget.bindToDOM();
  const widgetCreete = container.querySelector(TrelloWidget.widgetSelector);
  const tudu = container.querySelector(TrelloWidget.columnTuduSelector);
  const progress = container.querySelector(TrelloWidget.columnProgressSelector);
  const done = container.querySelector(TrelloWidget.columnDoneSelector);
  expect(tudu).toBeTruthy();
  expect(progress).toBeTruthy();
  expect(done).toBeTruthy();
  expect(widgetCreete).toBeTruthy();
});

test("Test add Cart ", () => {
  document.body.innerHTML = '<div id="container"></div>';
  const container = document.querySelector("#container");
  const widget = new TrelloWidget(container);
  widget.bindToDOM();
  const tudu = container.querySelector(TrelloWidget.columnTuduSelector);
  tudu.querySelector(".column__footer").click();
  const button = tudu.querySelector(TrelloWidget.buttonSelector);
  const input = tudu.querySelector(TrelloWidget.inputSelector);
  input.value = "test";
  button.click();
  const cartArr = [...tudu.querySelectorAll(".cart")];
  expect(cartArr.length === 2).toBeTruthy();
});
