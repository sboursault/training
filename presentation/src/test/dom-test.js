import { JSDOM } from 'jsdom';
import { strictEqual } from 'assert';
import { createChild, createNode } from '../js/dom.js';


describe('dom', function () {
  it('creates child element with text', function () {

    // given
    const dom = new JSDOM(
      `<html>
         <body>
           <div></div>
         </body>
       </html>`,
      { url: 'http://localhost' },
    );
    global.window = dom.window
    global.document = dom.window.document

    // when
    const div = document.querySelector('div')
    const created = createChild(
        div, 
        'span', 
        {class:'someClass', style: 'text-decoration:underline;'},
        'underlined text'
    )

    // then
    strictEqual(
      div.innerHTML,
      '<span class="someClass" style="text-decoration:underline;">underlined text</span>'
    )
    strictEqual(
        created.parentNode, div
    )
  })

  it('creates child element with child', function () {

    // given
    const dom = new JSDOM(
      `<html>
         <body>
           <div></div>
         </body>
       </html>`,
      { url: 'http://localhost' },
    );
    global.window = dom.window
    global.document = dom.window.document

    // when
    const div = document.querySelector('div')
    const created = createChild(
        div, 
        'span', 
        {class:'someClass'},
        createNode('a', {href: '/'}, 'home')
    )

    // then
    strictEqual(
      div.innerHTML,
      '<span class="someClass"><a href="/">home</a></span>'
    )
    strictEqual(
        created.parentNode, div
    )
  })
})
