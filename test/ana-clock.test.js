describe('ana-clock', () => {
  it('is defined', () => {
    expect(window.customElements.get('ana-clock')).toBeDefined()
  })

  describe('when used', () => {
    afterEach(() => {
      window.document.body.innerHTML = ''
    })

    it('contains style and svg', () => {
      const { shadowRoot } = createClock()
      expect(shadowRoot.innerHTML).toMatch(/^<style>.*<\/svg>$/)
    })

    function createClock(attrs = '') {
      window.document.body.innerHTML = `<ana-clock${attrs}></ana-clock>`
      return document.body.firstElementChild
    }
  })
})
