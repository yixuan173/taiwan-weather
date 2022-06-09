class SearchView {
  _parentElement = document.querySelector(".search-form");
  _cityName = [
    "宜蘭縣",
    "桃園市",
    "新竹縣",
    "苗栗縣",
    "彰化縣",
    "南投縣",
    "雲林縣",
    "嘉義縣",
    "屏東縣",
    "臺東縣",
    "花蓮縣",
    "澎湖縣",
    "基隆市",
    "新竹市",
    "嘉義市",
    "臺北市",
    "高雄市",
    "新北市",
    "臺中市",
    "臺南市",
  ];

  getQuery() {
    const query = document.querySelector(".search-input").value;

    if (!this._cityName.some((city) => city === query)) {
      return alert("請輸入臺灣的縣市。 EX：臺北市、新竹縣、臺中市、花蓮縣...");
    }

    this._clearInput();
    return query;
  }

  _clearInput() {
    document.querySelector(".search-input").value = "";
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
