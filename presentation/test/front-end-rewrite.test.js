import { JSDOM } from 'jsdom'
import { strictEqual } from 'assert'
import { computePartNumbers } from '../src/js/presentation.js'



describe('front-end-rewrite', function () {
  it('fills part numbers', function () {
    // given
    const dom = new JSDOM(
      `<html>
         <body>
           <section id="part-1">
            <div class="part-title">
              <part-number></part-number>
              <h1>Getting started</h1>
            </div>
          </section>
          <section id="part-2">
            <div class="part-title">
              <part-number></part-number>
              <h1>Another part</h1>
            </div>
          </section>
         </body>
       </html>`,
      { url: 'http://localhost' }
    )
    global.window = dom.window
    global.document = dom.window.document

    // when
    computePartNumbers()

    // then
    strictEqual(
      document.querySelector('#part-1 .part-title').innerHTML,
      `
              <part-number>Part 1</part-number>
              <h1>Getting started</h1>
            `
    )
    strictEqual(
      document.querySelector('#part-2 .part-title').innerHTML,
      `
              <part-number>Part 2</part-number>
              <h1>Another part</h1>
            `
    )

    //               <!-- add class part-title__number -->
  })
})
