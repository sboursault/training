import { createChild, createNode, addText } from './dom.js';
    

export function fillCompleteToc() {
  const ulLevel1 = document.querySelector('#toc ol')
  document.querySelectorAll('.slide--part-title:not(.slide-background)').forEach(partTitleSlide => {
      const partTitle = partTitleSlide.querySelector('h1')
      const li = createChild(ulLevel1, 'li')
      const tocLink = createNode('a', {href: getSlideUrl(partTitleSlide)}, partTitle.textContent)
      createChild(li, 'strong', {}, tocLink)
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


function fillPartToc(ul, partTitleSlide) {
  let slide = getSiblingUnlessPartTileSlide(partTitleSlide)
  while (slide != null) {               
    const h2Element = slide.querySelector('h2')
    const exclude = h2Element.getAttribute('data-toc-exclude')
    if (exclude === null) {
      const tags = h2Element.getAttribute('data-tags') || ''
      let tocLabel = h2Element.getAttribute('data-toc-label') || h2Element.innerText
      if (tocLabel.endsWith('Optional'))
        tocLabel = tocLabel.substring(0, tocLabel.length - 'Optional'.length)
      if (tocLabel.endsWith('Practice'))  
        tocLabel = tocLabel.substring(0, tocLabel.length - 'Practice'.length)
      const tocLink = createNode('a', {href: getSlideUrl(slide)})
      addText(tocLink, tocLabel.replace('</>', '').trim())
      if (tocLabel.indexOf('</>') !== -1 || tags.indexOf('practice') !== -1) 
        createChild(tocLink, 'span', {class:'tag'}, 'Practice')
      if (tags.indexOf('optional') !== -1)
        createChild(tocLink, 'span', {class:'tag tag--optional'}, 'Optional')      
      createChild(ul, 'li', {}, tocLink)
    }
    slide = getSiblingUnlessPartTileSlide(slide)
  }
}

let allSlides;

function getSlideUrl(slide) {
  if (!allSlides)
    allSlides = document.querySelectorAll('.slides > section')
  const slideIndex = [].indexOf.call(allSlides, slide)
  return `/#/${slideIndex}`
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