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

export function removeFalsyIfs(html, e2eTool) {
  const regEx =
    e2eTool === 'pw'
      ? /\s*<if-cy(?:\s+[\w-]+="[^"]*")*>[\s\S]*?<\/if-cy>/g
      : /\s*<if-pw(?:\s+[\w-]+="[^"]*")*>[\s\S]*?<\/if-pw>/g
  return html.replace(regEx, '')
}

export function processLinkTags(html) {
  return html.replace(
    /<app-link((?:\s+[\w-]+="[^"]*")*)>\s*([\s\S]*?)\s*<\/app-link>/g, 
    '<a$1 href="$2">$2</a>'
  )
}
