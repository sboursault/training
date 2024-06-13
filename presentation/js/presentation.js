import { createChild, createNode, addText } from './dom.js';
    

export function fillCompleteToc() {
  const ulLevel1 = document.querySelector('#toc ol')
  document.querySelectorAll('.slide--part-title:not(.slide-background)').forEach(partTitleSlide => {
      const partTitle = partTitleSlide.querySelector('h1')
      const li = createChild(ulLevel1, 'li')
      createChild(li, 'strong', {}, partTitle.textContent)
      const ulLevel2 = createChild(li, 'ul', {})
      fillPartToc(ulLevel2, partTitleSlide)
    }
  )
}

export function fillPartTocs() {
  document.querySelectorAll('.slide--part-title').forEach(partTitleSlide => {
    const toc = partTitleSlide.querySelector('.part-toc')
    if (toc) {
      createChild(toc, 'h2', {}, 'Content:')
      const ul = createChild(toc, 'ul')
      fillPartToc(ul, partTitleSlide)
    }
  })
}

function fillPartToc(ul, partTitleSlide) {
  const slides = document.querySelectorAll('.slides > section')
  let sibling = getSiblingUnlessPartTileSlide(partTitleSlide)
  while (sibling != null) {               
    var slideIndex = [].indexOf.call(slides, sibling);
    const h2Element = sibling.querySelector('h2')
    const exclude = h2Element.getAttribute('data-toc-exclude')
    if (exclude === null) {
      const tocLabel = h2Element.getAttribute('data-toc-label') || h2Element.innerText
      const icon = h2Element.getAttribute('data-toc-icon')
      const tocLink = createNode('a', {href: `/#/${slideIndex}`})
      if (icon === 'code') createChild(tocLink,'span', {style:'font-family:monospace; font-size: 85%; margin-right: 0.4rem; letter-spacing: -1px;'}, '<∕>')
      addText(tocLink, tocLabel)
      createChild(ul, 'li', {}, tocLink)
    }
    sibling = getSiblingUnlessPartTileSlide(sibling)
  }
}

export function wrapExercice() {
  document.querySelectorAll('.block--exercice').forEach(source => {

    const parent = source.parentNode

    const newDiv = document.createElement("div");
    newDiv.classList.add("flex-row", "tiny-gap");

    const left = document.createElement("div");
    newDiv.appendChild(left)

    const img = document.createElement('img')
    img.setAttribute("style", "width:25%;padding-bottom:2em;");
    img.setAttribute("src", "img/coding.png");
    newDiv.appendChild(img)

    left.innerHTML = source.innerHTML

    newDiv.classList.add(
      ...source.className.split(' ').filter(c => c !== 'block--exercice')
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

export function addBreadcrumbs() {
  document.querySelectorAll('.slide--part-title').forEach(partTitleSlide => {
    const partName = partTitleSlide.querySelector('h1').innerHTML
    let sibling = getSiblingUnlessPartTileSlide(partTitleSlide)
    while (sibling != null) {
      sibling.innerHTML = `<div class="breadcrumb">${partName} ›</div>${sibling.innerHTML}`
      sibling = getSiblingUnlessPartTileSlide(sibling)
    }
  })
}

function getSiblingUnlessPartTileSlide(element) {
  let sibling = element.nextElementSibling
  if (sibling == null)
    return null
  while (sibling && sibling.querySelector('h1') == null && sibling.querySelector('h2') == null) {
    sibling = sibling.nextElementSibling
  }
  if (sibling && sibling.classList && sibling.classList.contains('slide--part-title')) {
    sibling = null
  }
  return sibling
}

function isVisible(el) {
  return getComputedStyle(el).visibility !== 'hidden';
}
function drawArrow(elt1, elt2, options) {
  if (isVisible(elt1) && isVisible(elt2))
    new LeaderLine(elt1, elt2, { color: 'var(--r-link-color)', size: 7, ...options || {} });
}

function drawArrows() {
  var section = document.querySelector('section.present');
  var elements = section.querySelectorAll('section.present [data-arrow]');
  Array.from(elements)
    .filter(elt => getComputedStyle(elt).visibility !== 'hidden')
    .forEach(elt => {
      const arrowDefs = elt.getAttribute("data-arrow").split(',')
      Array.from(Array.from(arrowDefs)).forEach(arrowDef => {
        const array = arrowDef.split('->');
        const from = array[0] ? section.querySelector('#' + array[0]) : elt;
        const to = array[1] ? section.querySelector('#' + array[1]) : elt;
        drawArrow(from, to, { path: 'fluid' });
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
    fillPartTocs()
    wrapExercice()
    wrapLinks()
    fillCompleteToc()
    // addBreadcrumbs()
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