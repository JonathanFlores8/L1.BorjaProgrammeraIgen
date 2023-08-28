const template = document.createElement('template')

template.innerHTML = `
  <style>
    .inputForm {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  </style>

  <div class="inputForm">
    <label for="name">Name:</label>
    <input id="name" type="text">

    <button type="submit">Submit</button>
  </div>
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
    const form = this.shadowRoot.querySelector('.inputForm')
    form.addEventListener('submit', (e) => {
      e.preventDefault()
      console.log('Form submitted')
    })
  }
}

window.customElements.define('greetings-component', GreetingsComponent)
