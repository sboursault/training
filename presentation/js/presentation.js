
export function fillTocs() {
  document.querySelectorAll('.slide--part-title').forEach(partTitleSlide => {
    const tocElement = partTitleSlide.querySelector('.part-toc')
    if (tocElement) {
      let tocContent = ''
      let sibling = getSiblingUnlessPartTileSlide(partTitleSlide)
      while (sibling != null) {
        const h2Element = sibling.querySelector('h2')
        if (h2Element) 
          tocContent += `<li>${h2Element.innerHTML}</li>`
        sibling = getSiblingUnlessPartTileSlide(sibling)
      }
      
      tocElement.innerHTML = '<span>Content:</span><ul>' + tocContent + '</ul>'
    }
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
  if (sibling && sibling.classList && sibling.classList.contains('slide--part-title')) {
    sibling = null
  }
  return sibling
}