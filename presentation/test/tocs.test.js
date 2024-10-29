import { JSDOM } from 'jsdom'
import { strictEqual } from 'assert'
import { fillPartTocs, fillCompleteToc } from '../src/js/tocs.js'

describe('tocs', function () {
  describe('fillPartTocs', function () {
    it('fills elements with a `part-toc` class', function () {
      // given
      const dom = new JSDOM(
        `<html>
         <body>
           <section>
             <h1>presentation title</h1>
           </section>
           <section id="part-1" class="slide--part-title">
             <h1>The part one</h1>
             <div class="part-toc"></div>
           </section>
           <section>
             <h2>1.1</h2>
             <p>hello</p>
           </section>
           <section>
             more content on 1.1
           </section>
           <section>
             <h2>1.2</h2>
             <p>hello again</p>
           </section>
           <section>
             <h2>1.2</h2>
             <p>extra content</p>
           </section>
           <section id="part-2" class="slide--part-title">
             <h1>The part two</h1>
             <div class="part-toc"></div>
           </section>
           <section>
             <h2>2.1</h2><p>hello hello</p>
           </section>
         </body>
       </html>`,
        { url: 'http://localhost' }
      )
      global.window = dom.window
      global.document = dom.window.document

      // when
      fillPartTocs()

      // then
      strictEqual(
        document.querySelector('#part-1 .part-toc').innerHTML,
        '<h2>Content:</h2><ul><li><a href="/#/-1">1.1</a></li><li><a href="/#/-1">1.2</a></li><li><a href="/#/-1">1.2</a></li></ul>'
      )
      strictEqual(
        document.querySelector('#part-2 .part-toc').innerHTML,
        '<h2>Content:</h2><ul><li><a href="/#/-1">2.1</a></li></ul>'
      )
    })
  })
  describe('fillCompleteToc', function () {
    it("it handles 'optional' tag", function () {
      // given
      const dom = new JSDOM(
        `<html>
         <body>
           <section>
             <h1>presentation title</h1>
           </section>
           <section id="toc">
             <ol></ol>
           </section>
           <section id="part-1" class="slide--part-title">
             <h1>The part one - Optional</h1>
             <div class="part-toc"></div>
           </section>
           <section>
             <h2>1.1</h2>
           </section>
         </body>
       </html>`,
        { url: 'http://localhost' }
      )
      global.window = dom.window
      global.document = dom.window.document

      // when
      fillCompleteToc()

      // then
      strictEqual(
        document.querySelector('#toc ol li strong a').innerHTML,
        'The part one - <span class="tag tag--optional">Optional</span>'
      )
    })
  })
})
