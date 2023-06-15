import { JSDOM } from 'jsdom';
import { strictEqual } from 'assert';
import { fillTocs, addBreadcrumbs } from '../js/presentation.js';


describe('fillTocs', function () {
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
           <section id="s4"><h2>1.2</h2><p>hello again</p></section>
           <section id="s5" class="slide--part-title">
             <h1>The part two</h1>
             <div class="part-toc"></div>
           </section>
           <section id="s6"><h2>2.1</h2><p>hello hello</p></section>
         </body>
       </html>`,
      { url: 'http://localhost' },
    );
    global.window = dom.window
    global.document = dom.window.document

    // when
    fillTocs()

    // then
    strictEqual(
      document.querySelector('#s2 .part-toc').innerHTML,
      '<span>Content:</span><ul><li>1.1</li><li>1.2</li></ul>'
    )
    strictEqual(
      document.querySelector('#s5 .part-toc').innerHTML,
      '<span>Content:</span><ul><li>2.1</li></ul>'
    )
  })
})

describe('addBreadcrumbs', function () {
  it('adds breadcrumbs from the part title', function () {

    // given
    const dom = new JSDOM(
      `<html>
         <body>
           <section id="s1"><h1>presentation title</h1></section>
           <section id="s2" class="slide--part-title"><h1>The part one</h1></section>
           <section id="s3"><p>hello</p></section>
           <section id="s4"><p>hello again</p></section>
           <section id="s5" class="slide--part-title"><h1>The part two</h1></section>
           <section id="s6"><p>hello hello</p></section>
         </body>
       </html>`,
      { url: 'http://localhost' },
    );
    global.window = dom.window
    global.document = dom.window.document

    // when
    addBreadcrumbs()

    // then
    strictEqual(
      document.querySelector('#s3').innerHTML,
      `<div class="breadcrumb">The part one ›</div><p>hello</p>`,
    )
    strictEqual(
      document.querySelector('#s4').innerHTML,
      `<div class="breadcrumb">The part one ›</div><p>hello again</p>`,
    )
    strictEqual(
      document.querySelector('#s6').innerHTML,
      `<div class="breadcrumb">The part two ›</div><p>hello hello</p>`,
    )
  })
})