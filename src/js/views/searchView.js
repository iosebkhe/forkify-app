import icons from "url:../../img/icons.svg"; //parcel 2

class searchView {
  _parentEl = document.querySelector(".search");

  //publisher-subscriber pattern
  //handler will be controlSearchResults (subscriber)
  //publisher
  addHandlerSearch(handler) {
    this._parentEl.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }

  //get search query from user
  getQuery() {
    const query = this._parentEl.querySelector(".search__field").value;
    this._clearInput();
    return query;
  }

  //clear input after searching
  _clearInput() {
    this._parentEl.querySelector(".search__field").value = "";
  }
}

export default new searchView();
