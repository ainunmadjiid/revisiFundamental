class AppBar extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  _updateStyle() {
    this._style.textContent = `
      :host {
        display: block;
      }

      div {
        padding: 25px 2px;
        width: 100%;
        color: #5356FF;
        background-color: #DFF5FF;
        box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
      }

      .app-name {
        margin: 0;
        font-size: 1.7rem;
        text-align: center;
      }
    `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
    <div>
      <h1 class="app-name">Notes Apps</h1>
    </div>
    `;
  }
}

customElements.define("app-bar", AppBar);
