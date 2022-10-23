import icons from "url:../../img/icons.svg"; //parcel 2

export default class View {
  _data;

  //take data from model which is also passing in controller js
  //because we are calling render there.
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderError();
    }

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) {
      return markup;
    }

    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  //display spinner
  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>`;
    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  //render error message
  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>`;
    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  //render success message
  renderMessage(message = this._successMessage) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>`;
    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  //update part of the dom
  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    //convert markup string to DOM element
    //this element lives in memory not in the dom yet
    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDom.querySelectorAll("*"));
    const currentElements = Array.from(this._parentEl.querySelectorAll("*"));

    newElements.forEach((newEl, i) => {
      const curEl = currentElements[i];

      //updates changed text
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      ) {
        curEl.textContent = newEl.textContent;
      }

      //updates changed attribute
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach((attr) =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  //clear html from parent element (.recipe)
  _clear() {
    this._parentEl.innerHTML = "";
  }
}
