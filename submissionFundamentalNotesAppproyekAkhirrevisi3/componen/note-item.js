import notesData from "../src/data.js";

class NoteItem extends HTMLElement {
  _shadowRoot = null;
  _style = null;
  _note = {
    id: null,
    title: null,
    body: null,
    createdAt: null,
  };

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  set note(value) {
    this._note = value;

    this.render();
  }

  get note() {
    return this._note;
  }

  _updateStyle() {
    this._style.textContent = `
      :host {
        display: block;
      }

      .list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
        gap: 20px;
        margin-top: 1rem;
        justify-items: center;
      }

      .card-note {
        display: block;
        background: #41C9E2;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(154, 160, 185, .05), 0 15px 40px rgba(166, 173, 201, .2);
        width: 400px;
        padding: 20px;
      }
      
      .note-info {
        padding: 20px;
        border: 2px solid #008DDA;
        border-radius: 8px;
        height: 200px;
      }
      
      .note-title h2 {
        font-weight: bold;
      }
      
      .note-description {
        margin-top: 10px;
      }

      .note-date {
        margin-top: 2rem;
      }
    `;
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
      <div>
        <div class="list">
        ${notesData
          .map(
            (note) => `
          <div class="card-note">
            <div class="note-info">
              <div class="note-title">
                <h2>${note.title}</h2>
              </div>
              <div class="note-description">
                <p>${note.body}</p>
              </div>
              <div class="note-date">
                <p>${new Date(note.createdAt).toLocaleString()}</p>
              </div>
            </div>
          </div>
          `
          )
          .join("")}
        </div>
      </div>
    `;
  }
}

customElements.define("note-item", NoteItem);
