import fs from 'fs';
import { resolve } from 'path';
import { helpers } from './src/helpers';
import WindiCSS from 'vite-plugin-windicss';
import handlebars from './vite-plugin-handlebars';

const loadResume = (path = null) => {
  return JSON.parse(fs.readFileSync(`./${path ? path + '/' : ''}resume.json`, 'utf-8'))
}

const pageDirs = fs.readdirSync("./", { withFileTypes: true })
    .filter(dir => {
     return dir.isDirectory() 
      && (dir.name !== 'src' 
      && dir.name !== 'vite-plugin-handlebars' 
      && dir.name !== '.netlify' 
      && dir.name !== 'dist'
      && dir.name !== 'node_modules'
      && dir.name !== '.git')
    }).map(dir => dir.name)

const pages = {
  '/index.html': {
    ...loadResume(),
    ...JSON.parse(fs.readFileSync(`./data.json`))
  },
  ...Object.fromEntries(pageDirs.map(dir => [`/${dir}/index.html`, {
    ...loadResume(dir),
    ...JSON.parse(fs.readFileSync(`${dir}/data.json`))
  }]))
}

export default {
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'src'),
      context(path) {
        return pages[path];
      },
      registerHelpers: helpers
    }),
    WindiCSS({
      safelist: 'hover:text-fuchsia-700 hover:text-cyan-700 bg-cyan-500'
    })
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ...(pageDirs.length) && { 
          ...pageDirs.map(page => resolve(__dirname, `${page}/index.html`))
        }
      },
      output: {
        assetFileNames: `assets/[name].[ext]`
      }
    }
  }
};