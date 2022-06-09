import { View } from "./View.js";

class WeekWeatherView extends View {
  _parentElement = document.querySelector(".week-weather-list");
  _errorMessage = "";

  _generateMarkup() {
    const isNight =
      this._data.time[0].startTime === "18:00" ||
      this._data.time[0].startTime === "00:00"
        ? true
        : false;

    const isDay =
      this._data.time[0].startTime === "06:00" ||
      this._data.time[0].startTime === "12:00"
        ? true
        : false;

    if (isNight) {
      for (let i = 1; i < 14; i = i + 2) {
        this._html += this._generateMarkupPreview(this._data, i);
      }
      return this._html;
    }

    if (isDay) {
      for (let i = 0; i < 14; i = i + 2) {
        this._html += this._generateMarkupPreview(this._data, i);
      }
      return this._html;
    }
  }

  _generateMarkupPreview(result, i) {
    return `
    <div class="hour-weather week">
      <p class="week-day-text">${result.time[i].day}</p>
      <div class="img-container">
        <img
          class="img-day"
          src="https://img.icons8.com/external-rabit-jes-outline-color-rabit-jes/36/000000/${
            result.weatherIcon[i]
          }"
        />
        <img
          class="img-night"
          src="https://img.icons8.com/external-rabit-jes-outline-color-rabit-jes/36/000000/${
            result.weatherIcon[i + 1]
          }"
        />
      </div>
      <div class="temp-container">
        <span class="week-temp-text temp-day">${result.temp[i]}&deg;</span>
        <span class="slash">/</span>
        <span class="week-temp-text temp-night">${
          result.temp[i + 1]
        }&deg;</span>
      </div>
    </div>
    `;
  }
}

export default new WeekWeatherView();
