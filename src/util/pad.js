export default function pad(value) {
  return value < 10 ? `0${value}` : value
}
