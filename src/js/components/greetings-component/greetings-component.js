const template = document.createElement('template')

template.innerHTML = `
   <style>
    .inputForm {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      max-width: 400px;
      margin: 0 auto;
      padding: 2rem;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      border-radius: 8px;
    }
    .inputForm label {
      font-weight: 600;
    }
    .inputForm input, .inputForm button {
      padding: 0.5rem 1rem;
      border: 1px solid #ccc;
      border-radius: 6px;
      outline: none;
      font-size: 1rem;
      transition: border-color 0.3s;
    }
    .inputForm input:focus {
      border-color: #007aff;
    }
    .inputForm button {
      cursor: pointer;
      background-color: #007aff;
      color: white;
      border: none;
      margin-top: 1rem;
      transition: background-color 0.3s;
    }
    .inputForm button:hover {
      background-color: #005bb5;
    }
    .greeting {
      margin-top: 1rem;
      font-size: 1.2rem;
      text-align: center;
    }
    .error {
      color: red;
      display: none;
      font-size: 0.8rem;
    }
    .inputForm button:disabled {
      background-color: #b0b0b0;
      cursor: not-allowed;
    }
    .inputForm button:focus {
      box-shadow: 0 0 5px #007aff;
    }
  </style>

<form class="inputForm">
    <label for="name">Name:</label>
    <input id="name" type="text" placeholder="Enter your name">
    <div class="error">Please enter your name.</div>
    <button type="submit" disabled>Submit</button>
  </form>
  <div class="greeting"></div>
`

/**
 *
 */
class GreetingsComponent extends HTMLElement {
  /**
   *
   */
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }

  /**
   *
   */
  connectedCallback () {
    this.nameInput = this.shadowRoot.querySelector('#name')
    this.greeting = this.shadowRoot.querySelector('.greeting')
    this.error = this.shadowRoot.querySelector('.error')
    this.submitButton = this.shadowRoot.querySelector('button')

    this.nameInput.addEventListener('input', this.handleInput.bind(this))
    this.shadowRoot.querySelector('.inputForm').addEventListener('submit', this.handleSubmit.bind(this))
  }

  /**
   *
   */
  handleInput () {
    if (this.nameInput.value.trim()) {
      this.submitButton.disabled = false
      this.error.style.display = 'none'
    } else {
      this.submitButton.disabled = true
    }
  }

  /**
   *
   * @param e
   */
  handleSubmit (e) {
    e.preventDefault()
    const name = this.nameInput.value.trim()
    if (name) {
      this.greeting.textContent = `Hello ${name}, welcome back to programming.`
      this.greeting.style.display = 'block'
    } else {
      this.greeting.style.display = 'none'
      this.error.style.display = 'block'
    }
  }
}

window.customElements.define('greetings-component', GreetingsComponent)
