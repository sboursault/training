import { JSDOM } from 'jsdom';
import { strictEqual } from 'assert';
import { fillPartTocs } from '../js/presentation.js';


describe('fillPartTocs', function () {
  it('fills elements with a `part-toc` class', function () {

    // given
    const dom = new JSDOM(
      `<html>
         <body>
           <section id="s1"><h1>presentation title</h1></section>
           <section id="s2" class="slide--part-title">
             <h1>The part one</h1>
             <div class="part-toc"></div>
           </section>
           <section id="s3"><h2>1.1</h2><p>hello</p></section>
           <section>more content on 1.1</section>
           <section id="s4"><h2>1.2</h2><p>hello again</p></section>
           <section id="s6"><h2>1.2</h2><p>extra content</p></section>
           <section id="s6" class="slide--part-title">
             <h1>The part two</h1>
             <div class="part-toc"></div>
           </section>
           <section id="s7"><h2>2.1</h2><p>hello hello</p></section>
         </body>
       </html>`,
      { url: 'http://localhost' },
    );
    global.window = dom.window
    global.document = dom.window.document

    // when
    fillPartTocs()

    // then
    strictEqual(
      document.querySelector('#s2 .part-toc').innerHTML,
      '<span>Content:</span><ul><li>1.1</li><li>1.2</li></ul>'
    )
    strictEqual(
      document.querySelector('#s6 .part-toc').innerHTML,
      '<span>Content:</span><ul><li>2.1</li></ul>'
    )
  })
})
