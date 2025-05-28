import chokidar from 'chokidar'
import { renderTemplatedFiles } from './build.js' 

chokidar.watch('src').on('all', () => renderTemplatedFiles())
