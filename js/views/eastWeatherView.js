import { View } from "./View.js";

class EastWeatherView extends View {
  _parentElement = document.querySelector(".east-area");
  _errorMessage = "";

  _generateMarkup() {
    for (let i = 0; i < this._data.length; i++) {
      this._html += this._generateMarkupPreview(this._data, i);
    }
    return this._html;
  }

  _generateMarkupPreview(result, i) {
    return `
    <div class="area-list">
      <span class="area-city-name">${result[i].city}</span>
      <span class="area-temp-text">
        <ion-icon class="temp-icon ${
          result[i].avgT > "30" ? "hot" : result[i].avgT < "15" ? "cold" : ""
        }" name="thermometer-outline"></ion-icon>
        ${result[i].avgT}&deg;C
      </span>
      <img class="area-icon"
        src="https://img.icons8.com/external-rabit-jes-outline-color-rabit-jes/50/000000/${
          result[i].weatherIcon
        }"
      />
    </div>
    `;
  }
}

export default new EastWeatherView();
