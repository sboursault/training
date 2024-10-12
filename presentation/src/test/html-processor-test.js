import { strictEqual } from 'assert'

function trimCodeSnippets(html) {
  //var repl = s.replace(/(foo-)(\w+)(-baz)/g,
  //  (m, g1, g2, g3) => g1 + g2 + g2.replace(/r/g, "t") + g3);

  return html.replace(
    /(<code(?:\s+[\w-]+="[^"]*")*>)\n*([^<]*)(<\/code>)/g,
    (_, opening, code, closing) => {
      var arr = code.split('\n')
      const leftPads = arr.map((line) => {
        const firstChar = line.search(/\S/)
        return firstChar
      }).filter(value => value != -1)
      const leftPad = Math.min(...leftPads)
      const trimmed = arr.map((line) => line.substring(leftPad)).join('\n')
      return opening + trimmed + closing
    }
  )
}

describe('html processor', function () {
  it('simplifies code snippet', function () {
    // given
    const html = `<html>
         <body>
           <div>
             <pre><code class="json" data-line-numbers="2">
               my code with
                 indentation
             </code></pre>
           </div>
         </body>
       </html>`

    // when
    const result = trimCodeSnippets(html)

    // then
    strictEqual(
      result,
      `<html>
         <body>
           <div>
             <pre><code class="json" data-line-numbers="2">my code with
  indentation
</code></pre>
           </div>
         </body>
       </html>`
    )
  })
})
