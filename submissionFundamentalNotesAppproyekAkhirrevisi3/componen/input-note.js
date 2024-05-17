class InputNote extends HTMLElement {
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
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    div {
      width: 100%;
      max-width: 500px;
      margin: 0 auto;
    }
    
    .container {
      width: 100%;
      max-width: 400px;
      border-radius: 15px;
      background: #41C9E2;
      padding: 20px;
      flex-grow: 1;
      height: fit-content;
    }

    .input-bar-container {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      margin-top: 1rem;
    }
    
    .form {
      display: flex;
      padding: 16px;
      flex-direction: column;
      height: fit-content;
      border-radius: 16px;
    }
    
    .form-group {
      display: flex;
      flex-direction: column;
    }
    
    .form-group label {
      margin-bottom: 4px;
      font-size: 20px;
      font-weight: bold;
    }
    
    .shadow {
      box-shadow: 0 5px 10px rgba(154, 160, 185, .05), 0 15px 40px rgba(166, 173, 201, .2);
    }
    
    input[type=text], textarea{
      background: rgb(240, 237, 255);
      border: 2px solid #008DDA;
      border-radius: 8px;
      padding: 16px;
      box-sizing: border-box;
      margin-bottom: 8px;
      font-size: 18px;
    }
    
    .btn-submit {
      width: fit-content;
      border-radius: 16px;
      padding: 12px 24px;
      border: 2px solid #008DDA;
      background: rgb(240, 237, 255);
      color: black;
      font-size: 20px;
      margin-top: auto;
      align-self: flex-end;
      cursor: pointer;
    }
    
    .btn-submit:hover {
      background: #008DDA;
      color: white;
    }
    
    input[type=text], textarea, .btn-submit:focus {
      outline: none;
    }
    
    .text-center {
      text-align: center;
    }
    `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  connectedCallback() {
    this.render();
    this._shadowRoot
      .querySelector("#form")
      .addEventListener("submit", this._handleSubmit.bind(this));
  }

  _handleSubmit(event) {
    event.preventDefault();

    const title = this._shadowRoot.querySelector("#title").value;
    const description = this._shadowRoot.querySelector("#description").value;

    const newNote = {
      id: `notes-${Math.random().toString(36).substring(2, 9)}`,
      title: title,
      body: description,
      createdAt: new Date().toISOString(),
      archived: false,
    };

    this.dispatchEvent(new CustomEvent("note-added", { detail: newNote }));

    this._shadowRoot.querySelector("#title").value = "";
    this._shadowRoot.querySelector("#description").value = "";
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
    <div>
      <div class="container shadow" id="add-note">
        <form class="form" action="#" id="form">
          <div class="form-group form-title">
            <label for="title">Title</label>
            <input type="text" id="title" name="title" required>
          </div>
          <div class="form-group form-desc">
            <label for="description">Description</label>
            <textarea name="description" id="description" cols="100" rows="5" required></textarea>
          </div>
          <input type="submit" value="Add Note" name="submit" class="btn-submit">
        </form>
      </div>
    </div>
    `;
  }
}

customElements.define("input-note", InputNote);
