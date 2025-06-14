import { strictEqual } from 'assert'
import {
  leftPadCode,
  removeFalsyIfs,
  processLinkTags,
  processHelpTags,
  processExerciseTags,
  processLinks,
} from '../src/js/html-processor.js'

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
           
             <span>hello</hello>
           
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
           
             <span>hello</hello>
           
         </body>
       </html>`
      )
    })
  }),
    describe('processLinkTags', function () {
      it('replaces link tags by a tags with href', function () {
        // given
        const html = `<html>
         <body>
           <app-link>
             http://zut.com/#test
           </app-link>
           <app-link class="blod">https://other.com/</app-link>
         </body>
       </html>`

        // when
        const result = processLinkTags(html)

        // then
        strictEqual(
          result,
          `<html>
         <body>
           <a href="http://zut.com/#test">http://zut.com/#test</a>
           <a class="blod" href="https://other.com/">https://other.com/</a>
         </body>
       </html>`
        )
      })
    })
  describe('processLinks', function () {
    it('adds href when missing', function () {
      // given
      const html = `<html>
         <body>
           <a>http://zut.com/#test</a>
           <a href="http://truc" class="blod">https://other.com/</a>
         </body>
       </html>`

      // when
      const result = processLinks(html)

      // then
      strictEqual(
        result,
        `<html>
         <body>
           <a href="http://zut.com/#test" target="_blank">http://zut.com/#test</a>
           <a href="http://truc" class="blod">https://other.com/</a>
         </body>
       </html>`
      )
    })
    it('create a tags from links', function () {
      // given
      const html = `<html>
         <body>
           http://zut.com/#test
           <a href="http://truc" class="blod">https://other.com/</a>
           <ul><a href="http://...">http://</a></ul>
         </body>
       </html>`

      // when
      const result = processLinks(html)

      // then
      strictEqual(
        result,
        `<html>
         <body>
           <a href="http://zut.com/#test" target="_blank">http://zut.com/#test</a>
           <a href="http://truc" class="blod">https://other.com/</a>
           <ul><a href="http://...">http://</a></ul>
         </body>
       </html>`
      )
    })
  })
  describe('processHelpTags', function () {
    it('replaces help tags', function () {
      // given
      const html = `<html>
         <body>
           <app-help>
             http://zut.com/#test
           </app-help>
         </body>
       </html>`

      // when
      const result = processHelpTags(html)

      // then
      strictEqual(
        result,
        `<html>
         <body>
           <div class="admonition help "><p class="admonition__title">Help</p><div class="admonition__content">
             http://zut.com/#test
           </div></div>
         </body>
       </html>`
      )
    })
    it('keeps classes', function () {
      // given
      const html = `<html>
         <body>
           <app-help class="mt-100">
             http://zut.com/#test
           </app-help>
         </body>
       </html>`

      // when
      const result = processHelpTags(html)

      // then
      strictEqual(
        result,
        `<html>
         <body>
           <div class="admonition help mt-100"><p class="admonition__title">Help</p><div class="admonition__content">
             http://zut.com/#test
           </div></div>
         </body>
       </html>`
      )
    })
  })
  describe('processExerciseTags', function () {
    it('replaces exercice tags', function () {
      // given
      const html = `<html>
         <body>
           <app-exercise>
             http://zut.com/#test
           </app-exercise>
         </body>
       </html>`

      // when
      const result = processExerciseTags(html)

      // then
      strictEqual(
        result,
        `<html>
         <body>
           <div class="exercice-2 "><div class="exercice__content">
             http://zut.com/#test
           </div><img class="exercice__image"></div>
         </body>
       </html>`
      )
    })
    it('keeps classes', function () {
      // given
      const html = `<html>
         <body>
           <app-exercise class="mt-100">
             http://zut.com/#test
           </app-exercise>
         </body>
       </html>`

      // when
      const result = processExerciseTags(html)

      // then
      strictEqual(
        result,
        `<html>
         <body>
           <div class="exercice-2 mt-100"><div class="exercice__content">
             http://zut.com/#test
           </div><img class="exercice__image"></div>
         </body>
       </html>`
      )
    })
  })
})
