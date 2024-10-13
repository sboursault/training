export function leftPadCode(html) {
  return html.replace(
    /(<code(?:\s+[\w-]+="[^"]*")*>)\n*([\s\S]*?)(<\/code>)/g,
    (_, opening, code, closing) => {
      var arr = code.split('\n')
      const firstCharIndexes = arr
        .map((line) => line.search(/\S/))
        .filter((value) => value != -1)
      const leftPad = Math.min(...firstCharIndexes)
      const trimmed = arr.map((line) => line.substring(leftPad)).join('\n')
      return opening + trimmed + closing
    }
  )
}
