import View from "./View.js";
import icons from "url:../../img/icons.svg"; //parcel 2

class PaginationView extends View {
  _parentEl = document.querySelector(".pagination");

  //publisher-subscriber relation
  //handler will be controlPagination
  addHandlerClick(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");

      if (!btn) {
        return;
      }

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  //generate markup for pagination buttons
  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    //Page 1, and there are other pages
    if (currentPage === 1 && numPages > 1) {
      return `<button data-goto="${
        currentPage + 1
      }" class="btn--inline pagination__btn--next">
      <span>Page ${currentPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;
    }

    //last page
    if (currentPage === numPages && numPages > 1) {
      return `<button data-goto="${
        currentPage - 1
      }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}}#icon-arrow-left"></use>
      </svg>
      <span>Page ${currentPage - 1}</span>
    </button>`;
    }

    //other page
    if (currentPage < numPages) {
      return `<button data-goto="${
        currentPage - 1
      }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${currentPage - 1}</span>
    </button>
    <button data-goto="${
      currentPage + 1
    }" class="btn--inline pagination__btn--next">
      <span>Page ${currentPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;
    }

    //Page 1, and there are no other pages
    return ``;
  }
}

export default new PaginationView();
