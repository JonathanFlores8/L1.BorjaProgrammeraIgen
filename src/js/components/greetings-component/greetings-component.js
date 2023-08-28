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
  </style>

  <form class="inputForm">
    <label for="name">Name:</label>
    <input id="name" type="text">
    <button type="submit">Submit</button>
  </form>
  <div class="greeting"></div>
`

/**
 *
 */
class GreetingsComponent extends HTMLElement {
  /**
   * 
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
    const form = this.shadowRoot.querySelector('.inputForm')
    const greeting = this.shadowRoot.querySelector('.greeting')

    form.addEventListener('submit', (e) => {
      e.preventDefault()
      const nameInput = this.shadowRoot.querySelector('#name')
      const name = nameInput.value.trim()

      if (name) {
        greeting.textContent = `Hello ${name}, welcome back to programming.`
        greeting.style.display = 'block'
      } else {
        greeting.style.display = 'none'
      }
    })
  }
}

window.customElements.define('greetings-component', GreetingsComponent)
