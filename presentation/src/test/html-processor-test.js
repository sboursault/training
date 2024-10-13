import { strictEqual } from 'assert'
import { leftPadCode } from '../js/html-processor.js'


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
             <pre><code class="json" data-line-numbers="2">
                  my 2nd code
             </code></pre>
           </div>
         </body>
       </html>`

    // when
    const result = leftPadCode(html)

    // then
    strictEqual(
      result,
      `<html>
         <body>
           <div>
             <pre><code class="json" data-line-numbers="2">my code with
  indentation
</code></pre>
             <pre><code class="json" data-line-numbers="2">my 2nd code
</code></pre>
           </div>
         </body>
       </html>`
    )
  })
})
