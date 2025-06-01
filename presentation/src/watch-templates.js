import chokidar from 'chokidar'
import { renderTemplatedFiles, copyAssets } from './build.js'

//console.log('Template context:')
//console.log(context)
//console.log('Template list:')
//console.log(templates)

//await copyAssets()
//await renderTemplatedFiles()

chokidar.watch('src').on('all', () => renderTemplatedFiles())
