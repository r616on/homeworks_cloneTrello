export default class TrelloWidget {
  constructor(parentEl) {
    this.parentEl = parentEl;
    this.oneAddCart = 0;
    this.data = null;

    this.onClick.bind(this);
    this.onButtonClick.bind(this);
    this.onCloseClick.bind(this);
    this.load.bind(this);
  }

  static get markup() {
    return `<div class="Trello-Widget">
        <div class="Trello-Widget-row">

          <div class="Trello-Widget-column TODU">
            <div class="column__title">
              <div class="column__title-text">TODU</div>
              <div class="column__title-badge">&#8230</div>
            </div>
            <div class="column__body">
             
            <div class="cart" data-title="Подумайте, может что то надо сделать" data-like ="1" data-comment="1">
                <div class="cart__title">
                  <div class="cart__title-text">Подумайте, может что то надо сделать</div>
                  <div class="cart__title-badge delete">&#10006</div>
                </div>
                <ul class="cart__body">
                  <li class="cart__body-item">&#43 1</li>
                  <li class="cart__body-item">&#9993 1</li>
                </ul>
              </div>

            </div>
            <div class="column__footer">
              <div class="column__footer-badge addItem">&#43</div>
              <div class="column__footer-text">Add another card</div>
              </div>
          </div>

          <div class="Trello-Widget-column PROGRESS">
            <div class="column__title">
              <div class="column__title-text">PROGRESS</div>
              <div class="column__title-badge">&#8230</div>
            </div>
            <div class="column__body">

            <div class="cart" data-title="А что то уже выполняется" data-like ="1" data-comment="1">
                <div class="cart__title">
                  <div class="cart__title-text">А что то уже выполняется</div>
                  <div class="cart__title-badge delete">&#10006</div>
                </div>
                <ul class="cart__body">
                  <li class="cart__body-item">&#43 1</li>
                  <li class="cart__body-item">&#9993 1</li>
                </ul>
              </div>

            </div>
            <div class="column__footer">
              <div class="column__footer-badge addItem">&#43</div>
              <div class="column__footer-text">Add another card</div> 
              </div>
          </div>

 <div class="Trello-Widget-column DONE">
            <div class="column__title">
              <div class="column__title-text">DONE</div>
              <div class="column__title-badge">&#8230</div>
            </div>
            <div class="column__body">

            <div class="cart" data-title="А это уже выполненно" data-like ="1" data-comment="1">
                <div class="cart__title">
                  <div class="cart__title-text">А это уже выполненно</div>
                  <div class="cart__title-badge delete">&#10006</div>
                </div>
                <ul class="cart__body">
                  <li class="cart__body-item">&#43 1</li>
                  <li class="cart__body-item">&#9993 1</li>
                </ul>
              </div>

            </div>
            <div class="column__footer">
              <div class="column__footer-badge addItem">&#43</div>
              <div class="column__footer-text">Add another card</div> 
              </div>
          </div>
        </div>
      </div>`;
  }

  static get widgetSelector() {
    return ".Trello-Widget";
  }

  static get buttonSelector() {
    return ".add-cart__button";
  }
  static get inputSelector() {
    return ".add-cart__input";
  }

  static get columnTuduSelector() {
    return ".TODU";
  }
  static get columnProgressSelector() {
    return ".PROGRESS";
  }
  static get columnDoneSelector() {
    return ".DONE";
  }

  bindToDOM() {
    this.parentEl.innerHTML = this.constructor.markup;
    const widget = this.parentEl.querySelector(this.constructor.widgetSelector);
    try {
      this.data = JSON.parse(localStorage.getItem("dataCart"));
      if (this.data !== null) {
        this.load();
      }
    } catch (e) {
      console.error(e);
    }
    widget.addEventListener("click", (evt) => this.onClick(evt));
  }

  onClick(e) {
    const popoverEl = this.parentEl.querySelector(
      this.constructor.popoverSelector
    );
    /// Open Add Cart modul
    if (e.target.closest(".column__footer") && !this.oneAddCart) {
      this.oneAddCart = 1;
      e.target.closest(".column__footer").classList.add("disable");
      e.target.closest(".Trello-Widget-column").append(this.createModul());
    }
    /// Close Add Cart modul
    if (e.target.closest(".add-cart__close") && this.oneAddCart) {
      this.onCloseClick(e);
    }
    ///creete cart click on buttut
    if (e.target.closest(this.constructor.buttonSelector)) {
      this.onButtonClick(e);
    }
    ///Delete Cart
    if (e.target.closest(".delete")) {
      e.target.closest(".cart").remove();
      this.save();
    }
  }
  onCloseClick(e) {
    this.oneAddCart = 0;
    e.target
      .closest(".Trello-Widget-column")
      .querySelector(".column__footer")
      .classList.remove("disable");
    e.target.closest(".add-cart").remove();
  }
  onButtonClick(e) {
    const input = this.parentEl.querySelector(this.constructor.inputSelector);
    if (input.checkValidity()) {
      e.target
        .closest(".Trello-Widget-column")
        .querySelector(".column__body")
        .append(this.addCart(input.value));
      this.onCloseClick(e);
      this.save();
    }
  }
  createModul() {
    const addCart = document.createElement("div");
    addCart.className = "add-cart cart";
    addCart.innerHTML = ` <input class="add-cart__input" placeholder="Введите заголовок" required  type="text">
                          <div class="add-cart__control-row">
                            <button class="add-cart__button" >Add Card</button>
                            <div class="add-cart__close close">&#10006</div>
                           </div>`;
    return addCart;
  }
  addCart(text, like = null, comment = null) {
    const addCart = document.createElement("div");
    addCart.className = "cart";
    addCart.dataset.title = text;
    addCart.dataset.like = like;
    addCart.dataset.comment = comment;
    if (!like === null && !comment === null) {
      addCart.innerHTML = `<div class="cart__title">
                            <div class="cart__title-text">${text}</div>
                            <div class="cart__title-badge delete">&#10006</div>
                         </div>
                        <ul class="cart__body">
                         <li class="cart__body-item">&#43 ${like}</li>
                         <li class="cart__body-item">&#9993 ${comment}</li>
                        </ul>`;
    } else {
      addCart.innerHTML = `<div class="cart__title">
                            <div class="cart__title-text">${text}</div>
                            <div class="cart__title-badge delete">&#10006</div>
                         </div>
                        <ul class="cart__body">
                         <li class="cart__body-item">&#43</li>
                         <li class="cart__body-item">&#9993</li>
                        </ul>`;
    }
    return addCart;
  }
  save() {
    const tudu = this.parentEl.querySelector(
      this.constructor.columnTuduSelector
    );
    const progress = this.parentEl.querySelector(
      this.constructor.columnProgressSelector
    );
    const done = this.parentEl.querySelector(
      this.constructor.columnDoneSelector
    );
    function arrMap(perent) {
      return [...perent.querySelectorAll(".cart")].map((item, index) => {
        return {
          index: index,
          title: item.dataset.title,
          like: item.dataset.like,
          comment: item.dataset.comment,
        };
      });
    }
    this.data = {
      tudu: arrMap(tudu),
      progress: arrMap(progress),
      done: arrMap(done),
    };
    localStorage.setItem("dataCart", JSON.stringify(this.data));
  }
  load() {
    const tudu = this.parentEl.querySelector(
      this.constructor.columnTuduSelector
    );
    const progress = this.parentEl.querySelector(
      this.constructor.columnProgressSelector
    );
    const done = this.parentEl.querySelector(
      this.constructor.columnDoneSelector
    );

    tudu.querySelector(".column__body").innerHTML = "";
    this.data.tudu.forEach((item) => {
      tudu
        .querySelector(".column__body")
        .append(this.addCart(item.title, item.like, item.comment));
    });

    progress.querySelector(".column__body").innerHTML = "";
    this.data.progress.forEach((item) => {
      progress
        .querySelector(".column__body")
        .append(this.addCart(item.title, item.like, item.comment));
    });

    done.querySelector(".column__body").innerHTML = "";
    this.data.done.forEach((item) => {
      done
        .querySelector(".column__body")
        .append(this.addCart(item.title, item.like, item.comment));
    });
  }
}