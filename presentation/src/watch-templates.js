import chokidar from 'chokidar'
import { renderTemplatedFiles } from './build.js'
// import { create } from 'browser-sync'

chokidar.watch('src').on('all', () => renderTemplatedFiles())

/*const bs = create();
bs.watch("*.html").on("change", bs.reload);
bs.init({
    server: "./build",
    reloadDelay: 200,
    browser: 'chromium'
});*/
