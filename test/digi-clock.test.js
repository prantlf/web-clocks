describe('digi-clock', () => {
  it('is defined', () => {
    expect(window.customElements.get('digi-clock')).toBeDefined()
  })

  describe('when used', () => {
    afterEach(() => {
      window.document.body.innerHTML = ''
    })

    it('renders hh:mm:ss by default', () => {
      const { shadowRoot } = createClock()
      expect(shadowRoot.innerHTML).toMatch(/^[0-9]{2}<span>:<\/span>[0-9]{2}<span>:<\/span>[0-9]{2}$/)
    })

    it('renders hh:mm if specified', () => {
      const { shadowRoot } = createClock(' seconds=false')
      expect(shadowRoot.innerHTML).toMatch(/^[0-9]{2}<span>:<\/span>[0-9]{2}$/)
    })

    function createClock(attrs = '') {
      window.document.body.innerHTML = `<digi-clock${attrs}></digi-clock>`
      return document.body.firstElementChild
    }
  })
})
