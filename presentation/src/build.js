import ejs from 'ejs'
import fs from 'fs/promises'
import {
  leftPadCode,
  processLinkTags,
  processLinks,
  processHelpTags,
  processExerciseTags,
  removeFalsyIfs,
} from './js/html-processor.js'

const context = {
  e2eTool: process.argv[2] === 'pw' ? 'Playwright' : 'Cypress',
  cy: process.argv[2] === 'cy',
  pw: process.argv[2] === 'pw',
}

await fs.mkdir('build/md', { recursive: true })

const templates = ['index.html'].concat(
  (await fs.readdir('src/md'))
    .filter((file) => file.endsWith('.md'))
    .map((file) => 'md/' + file)
)

export function renderTemplatedFiles() {
  return fs.mkdir('build/md', { recursive: true }).then(() =>
    Promise.all(
      templates.map((file) =>
        ejs
          .renderFile('src/' + file, context, {
            openDelimiter: '{',
            closeDelimiter: '}',
            async: true,
          })
          .then((html) => removeFalsyIfs(html, context.pw ? 'pw' : 'cy'))
          .then(leftPadCode)
          .then(processLinkTags)
          .then(processExerciseTags)
          .then(processLinks)
          .then(processHelpTags)
          .then((html) => fs.writeFile('build/' + file, html))
      )
    )
  ).then(() => console.log('Templates rendered'))
}

export function copyAssets() {
  return Promise.all(
    ['css', 'img', 'js'].map((dir) =>
      fs.cp('src/' + dir, 'build/' + dir, { recursive: true })
    )
  )
    .then(() =>
      ['reveal.js', 'leader-line'].map((module) =>
        fs.cp('node_modules/' + module, 'build/node_modules/' + module, {
          recursive: true,
        })
      )
    )
    .then(() => console.log('Assets copied'))
}

console.log('Template context:')
console.log(context)
console.log('Template list:')
console.log(templates)

await copyAssets()
await renderTemplatedFiles()
