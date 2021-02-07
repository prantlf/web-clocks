export default function dispatchTick(element, detail) {
  const event = new CustomEvent('tick',
    { detail, bubbles: true, cancelable: true, composed: true })
  element.dispatchEvent(event);
}
