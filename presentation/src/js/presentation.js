import { addText, createChild } from './dom.js';
import { fillCompleteToc, fillPartTocs } from './tocs.js'
    

function rewriteSlideTitles() {
  document.querySelectorAll('h2').forEach(element => {
    const tags = element.getAttribute('data-tags') || ''
      
    const text = element.innerText;
    if (text.indexOf('</>') !== -1 || tags.indexOf('practice') !== -1) {
      element.innerText = ''
      createChild(element, 'span', {class: ''}, text.replace('</>', '').trim())
      createChild(element, 'span', {class:'tag tag--small ms-50'}, 'Practice')
      if (tags.indexOf('optional') !== -1)
        createChild(element, 'span', {class:'tag tag--small tag--optional'}, 'Optional')
    }
  })
}

export function wrapExercice() {
  document.querySelectorAll('.exercice').forEach(source => {

    const parent = source.parentNode

    const newDiv = document.createElement("div");
    newDiv.classList.add("exercice", "flex-row", "tiny-gap");

    const left = document.createElement("div");
    left.classList.add("exercice__content");
    newDiv.appendChild(left)

    const img = document.createElement('img')
    img.classList.add("exercice__image");
    newDiv.appendChild(img)

    left.innerHTML = source.innerHTML

    newDiv.classList.add(
      ...source.className.split(' ').filter(c => c !== 'exercice')
    )

    parent.removeChild(source)
    parent.appendChild(newDiv)

  })
}

export function wrapLinks() {
  document.querySelectorAll('.url-link').forEach(source => {
    const url = source.innerHTML.replaceAll(/\s/g, '')
    const linkHtml = `<a href="${url}">${url}</a>`
    source.innerHTML = linkHtml
  })
}


export function computePartNumbers() {
  let count = 1
  document.querySelectorAll('part-number').forEach((element) => {
    addText(element, 'Part ' + count++)
  })
}

function isVisible(el) {
  return getComputedStyle(el).visibility !== 'hidden';
}
function drawArrow(elt1, elt2, options) {
  if (isVisible(elt1) && isVisible(elt2))
    new LeaderLine(elt1, elt2, { color: 'var(--r-link-color)', size: 4, ...options || {} });
}

function drawArrows() {
  var section = document.querySelector('section.present');
  var elements = section.querySelectorAll('section.present [data-arrow]');
  Array.from(elements)
    .filter(elt => getComputedStyle(elt).visibility !== 'hidden')
    .forEach(elt => {
      const arrowDefs = elt.getAttribute("data-arrow").split(',')
      Array.from(Array.from(arrowDefs)).forEach(arrowDef => {
        const [arrow,label] = arrowDef.split(':');
        const array = arrow.split('->');
        const from = array[0] ? section.querySelector('#' + array[0]) : elt;
        const to = array[1] ? section.querySelector('#' + array[1]) : elt;
        drawArrow(from, to, { path: 'fluid', endLabel: label });
      })
    })
}
function eraseArrows() {
  const elts = document.getElementsByClassName('leader-line')
  Array.from(elts).forEach(elt => elt.remove())
}


export function init() {

  Reveal.initialize({
    width: 1200,
    height: 750,
    slideNumber: true,
    // Factor of the display size that should remain empty around
    // the content
    margin: 0.04,
    center: false,
    hash: true, // adds # in urls to allow url navigation
    //view: 'scroll',
    //scrollProgress: 'auto',
    navigationMode: 'linear',
    plugins: [RevealMarkdown, RevealNotes, RevealHighlight]
  });
  Reveal.on('ready', event => {
    rewriteSlideTitles()
    fillPartTocs()
    wrapExercice()
    wrapLinks()
    fillCompleteToc(),
    computePartNumbers(),
    setTimeout(
      () => {
        drawArrows()
      }, 200 // without this timeout, the arrow isn't well positionned
    )
  });
  Reveal.on('slidetransitionend', event => {
    drawArrows()
  });
  Reveal.on('slidechanged', event => {
    eraseArrows()
  });
  Reveal.on('fragmentshown', event => {
    setTimeout(
      () => {
        eraseArrows()
        drawArrows()
      }, 300 // wait for the element to be visible
    )
  });
  Reveal.on('fragmenthidden', event => {
    setTimeout(
      () => {
        eraseArrows()
        drawArrows()
      }, 300 // wait for the element to be visible
    )
  });
  Reveal.on('overviewshown', event => { eraseArrows() });
  Reveal.on('overviewhidden', event => { drawArrows() });
}