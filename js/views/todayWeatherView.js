import { View } from "./View.js";

class TodayWeatherView extends View {
  _parentElement = document.querySelector(".today-weather-container");
  _errorMessage = "資料獲取錯誤，請重整頁面。";
  _btnNavEl = document.querySelector(".nav-btn");
  _btnNavList = document.querySelector(".nav-list");

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }

  addHandlerNavBar() {
    this._btnNavEl.addEventListener("click", function () {
      const headerEl = document.querySelector(".header");
      const navEl = document.querySelector(".nav-bar");

      if (headerEl.classList.contains("nav-open")) {
        headerEl.classList.toggle("nav-open");

        setTimeout(() => navEl.classList.toggle("visible"), 550);
      } else {
        navEl.classList.toggle("visible");

        setTimeout(() => headerEl.classList.toggle("nav-open"), 10);
      }
    });

    this._btnNavList.addEventListener("click", function (e) {
      if (e.target.closest(".two")) {
        e.target.closest(".two").classList.toggle("open");
      }
    });
  }

  _generateMarkup() {
    return `
    <div class="today-weather-header">
      <img
        class="today-icon"
        src="https://img.icons8.com/external-rabit-jes-outline-color-rabit-jes/164/000000/${this._data.weatherIcon}"
      />
      <div class="today-header-text">
        <p class="day-text">
          ${this._data.day} <span class="time-text">${this._data.startTime} ~ ${this._data.endTime}</span>
        </p>
        <h2 class="second-title">${this._data.temp}&deg;C</h2>
      </div>
    </div>

    <p class="city-name">${this._data.city}</p>
    <p class="description-weather">
      ${this._data.weatherDescription}
    </p>
    `;
  }
}

export default new TodayWeatherView();
