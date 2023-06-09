import { JSDOM } from 'jsdom';
import { strictEqual } from 'assert';
import { fillTocs } from '../js/presentation.js';

beforeEach(() => {
  const dom = new JSDOM(
    `<html>
       <body>
         <ul data-toc-for="part-1"></ul>
         <h2 data-section-of="part-1">1st h2</h2>
         <h2 data-section-of="part-1">2nd h2</h2>
         <h2>3rd h2</h2>
         <ul data-toc-for="part-2"></ul>
         <h2 data-section-of="part-2">4th h2</h2>
       </body>
     </html>`,
     { url: 'http://localhost' },
  );
  global.window = dom.window
  global.document = dom.window.document
});

describe('fillTocs', function () {
  it('fills elements with a `data-toc-for` from elements with a mathing `data-section-of`', function () {
    fillTocs()
    strictEqual(
      document.querySelector('[data-toc-for="part-1"]').innerHTML, 
      '<li>1st h2</li><li>2nd h2</li>'
    )
    strictEqual(
      document.querySelector('[data-toc-for="part-2"]').innerHTML, 
      '<li>4th h2</li>'
    )
  })
})
