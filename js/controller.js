import * as model from "./model.js";
import todayWeatherView from "./views/todayWeatherView.js";
import hourWeatherView from "./views/hourWeatherView.js";
import weekWeatherView from "./views/weekWeatherView.js";
import northWeatherView from "./views/northWeatherView.js";
import centralWeatherView from "./views/centralWeatherView.js";
import southWeatherView from "./views/southWeatherView.js";
import eastWeatherView from "./views/eastWeatherView.js";
import searchView from "./views/searchView.js";

const controlWeather = async function () {
  try {
    todayWeatherView.renderSpinner();
    hourWeatherView.renderSpinner();
    weekWeatherView.renderSpinner();
    northWeatherView.renderSpinner();
    centralWeatherView.renderSpinner();
    southWeatherView.renderSpinner();
    eastWeatherView.renderSpinner();

    await model.getJSON(model.state.cityName);
    await model.getHourJSON(model.state.cityName);
    await model.getAreaJSON();

    todayWeatherView.render(model.state.dayWeather);
    hourWeatherView.render(model.state.hourWeather);
    weekWeatherView.render(model.state.weekWeather);
    northWeatherView.render(model.state.otherArea.north);
    centralWeatherView.render(model.state.otherArea.central);
    southWeatherView.render(model.state.otherArea.south);
    eastWeatherView.render(model.state.otherArea.east);
  } catch (err) {
    console.log(err);

    todayWeatherView.renderErrorMessage();
    hourWeatherView.renderErrorMessage();
    weekWeatherView.renderErrorMessage();
    northWeatherView.renderErrorMessage();
    centralWeatherView.renderErrorMessage();
    southWeatherView.renderErrorMessage();
    eastWeatherView.renderErrorMessage();
  }
};

const controlSearchResults = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;

    await model.getJSON(query);
    await model.getHourJSON(query);

    todayWeatherView.render(model.state.dayWeather);
    hourWeatherView.render(model.state.hourWeather);
    weekWeatherView.render(model.state.weekWeather);
  } catch (err) {
    console.log(err);

    todayWeatherView.renderErrorMessage("搜尋失敗，請重試一次。");
    hourWeatherView.renderErrorMessage();
    weekWeatherView.renderErrorMessage();
  }
};

// 初始化，添加監聽器
const init = (function () {
  todayWeatherView.addHandlerRender(controlWeather);
  todayWeatherView.addHandlerNavBar();
  searchView.addHandlerSearch(controlSearchResults);
  console.log("Welcome to use it.");
})();
