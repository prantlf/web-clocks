const local = -new Date().getTimezoneOffset()

export default function getNow(offset) {
  if (offset.length === 0) offset = local
  return new Date(Date.now() + (+offset - local) * 60000)
}
