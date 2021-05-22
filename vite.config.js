import fs from 'fs';
import { resolve } from 'path';
import { helpers } from './src/helpers';
import WindiCSS from 'vite-plugin-windicss';
import handlebars from './vite-plugin-handlebars';

const loadResume = () => {
  return JSON.parse(fs.readFileSync('./resume.json', 'utf-8'))
}

export default {
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'src'),
      context: { 
        ...loadResume(),
        meta: {
          description: 'Nick Graffis is a full stack software engineer specializing in front end technoligies around typescript and javascript, as-well-as serverside technolgies and languages, like node, python, goland, c/c++.'
        }
      },
      registerHelpers: helpers
    }),
    WindiCSS(),
  ],
};