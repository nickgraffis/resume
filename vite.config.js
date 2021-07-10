import fs from 'fs';
import { resolve } from 'path';
import { helpers } from './src/helpers';
import WindiCSS from 'vite-plugin-windicss';
import handlebars from './vite-plugin-handlebars';

const loadResume = (path = null) => {
  return JSON.parse(fs.readFileSync(`./resume${path ? '-' + path : ''}.json`, 'utf-8'))
}

const pages = {
  '/index.html': {
    ...loadResume(),
    accent: 'bg-fuchsia-700',
    hoverAccent: 'hover:text-fuchsia-700',
    meta: {
      description: 'Nick Graffis is a full stack software engineer specializing in front end technoligies around typescript and javascript, as-well-as serverside technolgies and languages, like node, python, goland, c/c++.'
    }
  },
  '/waterpolo/index.html': {
    ...loadResume('waterpolo'),
    accent: 'bg-cyan-500',
    hoverAccent: 'hover:text-cyan-700',
    meta: {
      description: 'Nick Graffis has been a water polo coach in Southern California for the past 12 years.'
    }
  }
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
        nested: resolve(__dirname, 'waterpolo/index.html')
      },
      output: {
        assetFileNames: `assets/[name].[ext]`
      }
    }
  }
};