export class View {
  _data;
  _html;

  // 渲染畫面
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderErrorMessage();
    this._data = data;
    this._html = "";

    const markup = this._generateMarkup();

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  // 渲染載入圖示
  renderSpinner = function () {
    const markup = `
      <div class="spinner">
        <ion-icon class="spinner-icon" name="sunny"></ion-icon>
      </div>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  };

  // 渲染錯誤訊息
  renderErrorMessage(message = this._errorMessage) {
    const markup = `
    <div class="error">
      <svg xmlns="http://www.w3.org/2000/svg" class="error-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <p class="error-msg">${message}</p>
    </div>
  `;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
