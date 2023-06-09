export function fillTocs() {
  document.querySelectorAll('[data-toc-for]').forEach(toc => {
    const part = toc.getAttribute('data-toc-for')
    const items = Array.from(document.querySelectorAll(`[data-section-of=${part}]`))
      .map(item => item.textContent)
    toc.innerHTML = items.map(item => `<li>${item}</li>`).join('')
  })
}
