import {
  WEATHERURL,
  HOURWEATHERURL,
  NORTHURL,
  CENTRALURL,
  SOUTHURL,
  EASTURL,
} from "./config.js";

export const state = {
  cityName: "臺北市",
  dayWeather: {},
  hourWeather: {},
  weekWeather: {},
  search: "",

  otherArea: {
    north: [],
    central: [],
    south: [],
    east: [],
  },

  // 轉換天氣代碼
  // 參考 https://ithelp.ithome.com.tw/articles/10225927 中的轉換天氣代碼部分
  weatherTypes: {
    isThunderstorm: [
      "15",
      "16",
      "17",
      "18",
      "21",
      "22",
      "33",
      "34",
      "35",
      "36",
      "41",
    ],
    isClear: ["01"],
    isCloudyFog: ["24", "25", "26", "27", "28"],
    isCloudy: ["02", "03", "04", "05", "06", "07"],
    isPartiallyClearWithRain: [
      "08",
      "09",
      "10",
      "11",
      "12",
      "13",
      "14",
      "19",
      "20",
      "29",
      "30",
      "31",
      "32",
      "38",
      "39",
    ],
    isSnowing: ["23", "37", "42"],
  },

  // 依據天氣類型獲取該天氣圖示
  weatherIcons: {
    isThunderstorm:
      "external-thunderstorm-weather-rabit-jes-outline-color-rabit-jes.png",
    isClear: "external-sun-weather-rabit-jes-outline-color-rabit-jes.png",
    isCloudyFog: "external-fog-weather-rabit-jes-outline-color-rabit-jes.png",
    isCloudy:
      "external-cloudy-day-weather-rabit-jes-outline-color-rabit-jes.png",
    isPartiallyClearWithRain:
      "external-rain-weather-rabit-jes-outline-color-rabit-jes.png",
    isSnowing: "external-snowman-weather-rabit-jes-outline-color-rabit-jes.png",
  },
};

// 由代碼獲取天氣類型
const createWeatherIcon = (weatherCode) => {
  const weather =
    Object.entries(state.weatherTypes).find(([_, weatherCodes]) =>
      weatherCodes.includes(weatherCode)
    ) || [];

  return weather[0];
};

// 創建當天天氣物件
const createTodayWeatherObject = function (data) {
  const day = data.weatherElement[14].time[0].startTime
    .split(" ")[0]
    .replaceAll("-", "/")
    .slice(5, 11);

  const sTime = data.weatherElement[14].time[0].startTime
    .split(" ")[1]
    .slice(0, 5);

  const eTime = data.weatherElement[14].time[0].endTime
    .split(" ")[1]
    .slice(0, 5);

  const weatherCondition = createWeatherIcon(
    data.weatherElement[6].time[0].elementValue[1].value
  );

  return {
    city: data.locationName,
    weatherDescription: data.weatherElement[10].time[0].elementValue[0].value,
    weatherIcon: state.weatherIcons[weatherCondition],
    temp: data.weatherElement[1].time[0].elementValue[0].value,
    day: day,
    startTime: sTime,
    endTime: eTime,
  };
};

// 創建小時天氣
const createHourWeatherObject = function (data) {
  state.hourWeather.time = data.weatherElement[0].time.map((weather) => {
    const day = weather.startTime
      .split(" ")[0]
      .replaceAll("-", "/")
      .slice(5, 11);

    const sTime = weather.startTime.split(" ")[1].slice(0, 5);

    const eTime = weather.endTime.split(" ")[1].slice(0, 5);

    return {
      day: day,
      startTime: sTime,
      endTime: eTime,
    };
  });

  state.hourWeather.weatherIcon = data.weatherElement[0].time.map((weather) => {
    const weatherCondition = createWeatherIcon(
      weather.parameter.parameterValue.padStart(2, "0")
    );
    return state.weatherIcons[weatherCondition];
  });

  state.hourWeather.PoP = data.weatherElement[1].time.map(
    (weather) => weather.parameter.parameterName
  );

  state.hourWeather.minT = data.weatherElement[2].time.map(
    (weather) => weather.parameter.parameterName
  );

  state.hourWeather.avgT = data.weatherElement[4].time.map((weather, i) => {
    const maxT = +weather.parameter.parameterName;
    const minT = +state.hourWeather.minT[i];
    return String(Math.round((maxT + minT) / 2));
  });
};

// 創建一周天氣
const createWeekWeatherObject = function (data) {
  state.weekWeather.time = data.weatherElement[0].time.map((weather) => {
    const day = weather.startTime
      .split(" ")[0]
      .replaceAll("-", "/")
      .slice(5, 11);

    const sTime = weather.startTime.split(" ")[1].slice(0, 5);

    const eTime = weather.endTime.split(" ")[1].slice(0, 5);

    return {
      day: day,
      startTime: sTime,
      endTime: eTime,
    };
  });

  state.weekWeather.weatherIcon = data.weatherElement[6].time.map((weather) => {
    const weatherCondition = createWeatherIcon(weather.elementValue[1].value);
    return state.weatherIcons[weatherCondition];
  });

  state.weekWeather.temp = data.weatherElement[1].time.map(
    (weather) => weather.elementValue[0].value
  );
};

// 創建各地區天氣
const createAreaWeatherObject = function (data, area) {
  state.otherArea[area] = data.map((weather) => {
    const weatherCondition = createWeatherIcon(
      weather.weatherElement[0].time[0].parameter.parameterValue.padStart(
        2,
        "0"
      )
    );
    const minT = +weather.weatherElement[1].time[0].parameter.parameterName;
    const maxT = +weather.weatherElement[2].time[0].parameter.parameterName;

    return {
      city: weather.locationName,
      weatherIcon: state.weatherIcons[weatherCondition],
      avgT: String(Math.round((maxT + minT) / 2)),
    };
  });
};

// 獲取城市目前天氣資訊
export const getJSON = async function (cityName) {
  try {
    const res = await fetch(WEATHERURL);

    const data = await res.json();

    const targetCity = data.records.locations[0].location.find(
      (city) => city.locationName === cityName
    );

    state.dayWeather = createTodayWeatherObject(targetCity);
    createWeekWeatherObject(targetCity);
  } catch (err) {
    throw err;
  }
};

// 獲取城市小時天氣資訊
export const getHourJSON = async function (cityName) {
  try {
    const res = await fetch(HOURWEATHERURL);

    const data = await res.json();

    const targetCity = data.records.location.find(
      (city) => city.locationName === cityName
    );

    createHourWeatherObject(targetCity);
  } catch (err) {
    throw err;
  }
};

// 獲取各地區天氣資訊
export const getAreaJSON = async function () {
  try {
    let res = await fetch(NORTHURL);
    const northData = await res.json();
    createAreaWeatherObject(northData.records.location, "north");

    res = await fetch(CENTRALURL);
    const centralData = await res.json();
    createAreaWeatherObject(centralData.records.location, "central");

    res = await fetch(SOUTHURL);
    const southData = await res.json();
    createAreaWeatherObject(southData.records.location, "south");

    res = await fetch(EASTURL);
    const eastData = await res.json();
    createAreaWeatherObject(eastData.records.location, "east");
  } catch (err) {
    throw err;
  }
};
