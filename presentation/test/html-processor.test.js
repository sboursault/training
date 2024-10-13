import { strictEqual } from 'assert'
import { leftPadCode, removeFalsyIfs } from '../src/js/html-processor.js'

describe('html processor', function () {
  describe('leftPadCode', function () {
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
  describe('removeFalsyIfs', function () {
    it('removes falsy cypress blocks', function () {
      // given
      const html = `<html>
         <body>
           <if-pw>
             <span>hello</hello>
           </if-pw>
           <if-cy>
             <span>hello</hello>
           </if-cy>
         </body>
       </html>`

      // when
      const result = removeFalsyIfs(html, 'pw')

      // then
      strictEqual(
        result,
        `<html>
         <body>
           <if-pw>
             <span>hello</hello>
           </if-pw>
         </body>
       </html>`
      )
    })
    it('removes falsy playwright blocks', function () {
      // given
      const html = `<html>
         <body>
           <if-pw>
             <span>hello</hello>
           </if-pw>
           <if-cy>
             <span>hello</hello>
           </if-cy>
         </body>
       </html>`

      // when
      const result = removeFalsyIfs(html, 'cy')

      // then
      strictEqual(
        result,
        `<html>
         <body>
           <if-cy>
             <span>hello</hello>
           </if-cy>
         </body>
       </html>`
      )
    })
  })
})
