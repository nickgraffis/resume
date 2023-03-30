# Nick Graffis | Résumé
### Built with [Handlebars](https://handlebarsjs.com), [Vite](https://vitejs.dev), [Puppeteer](https://github.com/puppeteer/puppeteer), and [WindiCSS](https://windicss.org)

* 👨🏻‍💼 This is my personal resume with data based on the [JSON Resume](https://jsonresume.org/) standard.
* 🥸 The development was made super simple with [vite-handlebars-plugin](https://github.com/alexlafroscia/vite-plugin-handlebars/issues), along with some small modifications.
* 🙏🎨 The design was inspired by [antfu's résumé](https://github.com/antfu/resume), which was apparently inspired by [jsonresumetheme-kwon](https://github.com/icoloma/jsonresume-theme-kwan). 
* 🌩 Hosted by [Netlify](https://www.netlify.com) @ [resume.nickgraffis.me](https://resume.nickgraffis.me)

### Useage
Create a `resume.json` that can be used as the context for your handlebars. Additonal context can be created at `data.json`. <br>This can be something like an accent color, or some meta data.<br><br>

**Creating Multiple Resumes**<br>
The index.html page works with your `data.json` context and your `resume.json` resume.<br>
If you would like to create another resume at `/other` you can do so by creating a directory for that resume.<br>
Inside the directory `other` add in a `resume.json` and `data.json` for context, as-well-as an additional `index.html`.

_When using an additional resume, your PDF will be rendered inside_ `./dist/other.pdf`.

### Thanks
