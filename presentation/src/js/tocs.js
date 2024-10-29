import { createChild, createNode, addText } from './dom.js';

export function fillCompleteToc() {
  const toc = document.querySelector('#toc ol')
  document
    .querySelectorAll('.slide--part-title:not(.slide-background)')
    .forEach((partTitleSlide) => {
      const partTitle = partTitleSlide.querySelector('h1').textContent
      const li = createChild(toc, 'li')
      const level1Entry = createLevel1Entry(partTitleSlide, partTitle)
      createChild(li, 'strong', {}, level1Entry)
      const ulLevel2 = createChild(li, 'ul', {})
      fillPartToc(ulLevel2, partTitleSlide)
    })
}

function createLevel1Entry(partTitleSlide, text) {
  const entry = createNode(
    'a',
    { href: getSlideUrl(partTitleSlide) },
    text.replace('Optional', '')
  )
  if (text.indexOf('Optional') !== -1) {
    createChild(entry, 'span', { class: 'tag tag--optional tag--medium' }, 'Optional')
  }
  return entry
}

export function fillPartTocs() {
  document.querySelectorAll('.slide--part-title').forEach((partTitleSlide) => {
    const toc = partTitleSlide.querySelector('.part-toc')
    if (toc) {
      createChild(toc, 'h2', {}, 'Content:')
      const ul = createChild(toc, 'ul')
      fillPartToc(ul, partTitleSlide)
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
      let tocLabel =
        h2Element.getAttribute('data-toc-label') || h2Element.textContent
      if (tocLabel.endsWith('Optional'))
        tocLabel = tocLabel.substring(0, tocLabel.length - 'Optional'.length)
      if (tocLabel.endsWith('Practice'))
        tocLabel = tocLabel.substring(0, tocLabel.length - 'Practice'.length)
      const tocLink = createNode('a', { href: getSlideUrl(slide) })
      addText(tocLink, tocLabel.replace('</>', '').trim())
      if (tocLabel.indexOf('</>') !== -1 || tags.indexOf('practice') !== -1)
        createChild(tocLink, 'span', { class: 'tag' }, 'Practice')
      if (tags.indexOf('optional') !== -1)
        createChild(tocLink, 'span', { class: 'tag tag--optional' }, 'Optional')
      createChild(ul, 'li', {}, tocLink)
    }
    slide = getSiblingUnlessPartTileSlide(slide)
  }
}

let allSlides

function getSlideUrl(slide) {
  if (!allSlides) allSlides = document.querySelectorAll('.slides > section')
  const slideIndex = [].indexOf.call(allSlides, slide)
  return `/#/${slideIndex}`
}

function getSiblingUnlessPartTileSlide(element) {
  let sibling = element.nextElementSibling
  if (sibling == null) return null
  while (
    sibling &&
    sibling.querySelector('h1') == null &&
    sibling.querySelector('h2') == null
  ) {
    sibling = sibling.nextElementSibling
  }
  if (
    sibling &&
    sibling.classList &&
    sibling.classList.contains('slide--part-title')
  ) {
    sibling = null
  }
  return sibling
}
