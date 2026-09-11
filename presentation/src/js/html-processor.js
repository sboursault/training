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

export function removeFalsyIfs(html, variant) {
  const tagsByVariant = {
    nodepw: ['pw', 'nodepw'],
    pypw: ['pw', 'pypw'],
    cy: ['cy'],
  }
  const keep = tagsByVariant[variant] || []
  const all = ['pw', 'nodepw', 'pypw', 'cy']
  const remove = all.filter((tag) => !keep.includes(tag))
  let result = html
  for (const tag of remove)
    result = result.replace(
      new RegExp('\\s*<if-' + tag + '(?:\\s+[\\w-]+="[^"]*")*>[\\s\\S]*?<\\/if-' + tag + '>', 'g'),
      ''
    )
  for (const tag of keep)
    result = result.replace(new RegExp('</?if-' + tag + '>', 'g'), '')
  return result
}

export function processLinkTags(html) {
  return html.replace(
    /<app-link((?:\s+[\w-]+="[^"]*")*)>\s*([\s\S]*?)\s*<\/app-link>/g,
    '<a$1 href="$2">$2</a>'
  )
}

export function processLinks(html) {
  return html
    .replace(
      /<a((?:\s+[\w]+="[^"]*")*)>([\s\S]*?)<\/a>/g,
      (match, attributes, link) => {
        if (attributes.indexOf('href="') !== -1) return match
        return '<a' + attributes + ' href="' + link + '" target="_blank">' + link + '</a>'
      }
    )
    .replace(
      /(<(?!a )[^<]*?>\s*)(https?:\/\/\S*?)([\s<])/g,
      '$1<a href="$2" target="_blank">$2</a>$3'
    )
}

export function processHelpTags(html) {
  return html.replace(
    /<app-help(?:\s+class="([^"]*)")*>([\s\S]*?)<\/app-help>/g,
    '<div class="admonition help $1"><p class="admonition__title">Help</p><div class="admonition__content">$2</div></div>'
  )
}

export function processExerciseTags(html) {
  return html.replace(
    /<app-exercise(?:\s+class="([^"]*)")*>([\s\S]*?)<\/app-exercise>/g,
    '<div class="exercice-2 $1"><div class="exercice__content">$2</div><img class="exercice__image"></div>'
  )
}
