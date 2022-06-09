import { View } from "./View.js";

class HourWeatherView extends View {
  _parentElement = document.querySelector(".hour-weather-list");
  _errorMessage = "";

  _generateMarkup() {
    for (let i = 0; i < 3; i++) {
      this._html += this._generateMarkupPreview(this._data, i);
    }
    return this._html;
  }

  _generateMarkupPreview(result, i) {
    return `
    <div class="hour-weather">
      <p class="hour-day-text">${result.time[i].day}</p>
      <p class="hour-time-text">${result.time[i].startTime} ~ ${result.time[i].endTime}</p>
      <img class="hour-icon"
        src="https://img.icons8.com/external-rabit-jes-outline-color-rabit-jes/68/000000/${result.weatherIcon[i]}"
      />
      <p class="hour-temp-text">${result.avgT[i]}&deg;C</p>
      <p class="hour-rain-text">
        <ion-icon class="rain-icon" name="water-outline"></ion-icon>
        ${result.PoP[i]}%
      </p>
    </div>
    `;
  }
}

export default new HourWeatherView();
