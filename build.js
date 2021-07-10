const jsdom = require("jsdom");
const fs = require('fs-extra');
const puppeteer = require('puppeteer');

/**
 * After vite builds our dist files, turn them into a PDF with puppeteer
 */
async function buildPDF(html, name) {
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage();
    console.log(`Opening puppeteer for ${name}...`)
    await page.setContent(html, { waitUntil: 'networkidle0' })
    console.log(`Generating PDF for ${name}...`)
    const pdf = await page.pdf({
      format: 'A4', 
      displayHeaderFooter: false, 
      printBackground: true,
      margin: {
        top: '0.4in',
        bottom: '0.4in',
        left: '0.4in',
        right: '0.4in',
      }
    })
    await browser.close()
    console.log(`Saving file ${name}...`)
    fs.writeFileSync(`./dist/${name}.pdf`, pdf)
    console.log('PDF file saved to dist')
    return pdf
  }

  async function build(location) {
    const html = await fs.readFile(`dist/${location}`, 'utf8')
    const css = await fs.readFile('dist/assets/windi.css', 'utf8')
    const dom = new jsdom.JSDOM(html)

    //Add our WindiCSS into a style tag on top of our index.html page for puppeteer
    dom.window.document.querySelector("head").innerHTML += `<style>
      ${css}
    </style>`;

    //Add proper link targets and secure them for lighthouse ;)
    dom.window.document.querySelectorAll("a").forEach((a) => {
      a.target = '_blank';
      a.rel = 'noreferrer';
    })

    //Replace the vite html file with our changed one
    await fs.writeFile(`dist/${location}`, dom.serialize())
    const newHTML = await fs.readFile(`dist/${location}`, 'utf8')
    console.log(`Updated ${location} for Puppeteer...`)
    await buildPDF(newHTML, location === 'index.html' ? 'resume' : location.split('/')[0])
  }
  
  /**
   * After vite builds or html file, we need make changes to render PDF properly
   */
  async function buildAll() {
    //Get all of the sub pages
    const pages = fs.readdirSync("dist", { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && dirent.name !== 'assets')
    .map(dirent => dirent.name)
    //Build each of the pages
    pages.forEach(page => build(page + '/index.html'))

    //After building sub pages build the index.html
    build('index.html')
  }
  
  buildAll().catch(e => {
    console.error(e)
    process.exit(1)
  })