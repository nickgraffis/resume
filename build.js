const jsdom = require("jsdom");
const fs = require('fs-extra');
const puppeteer = require('puppeteer');

/**
 * After vite builds our dist files, turn them into a PDF with puppeteer
 */
async function buildPDF(html) {
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage();
    console.log('Opening puppeteer...')
    await page.setContent(html, { waitUntil: 'networkidle0' })
    console.log('Generating PDF...')
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
    console.log('Saving file...')
    fs.writeFileSync('./dist/resume.pdf', pdf)
    console.log('PDF file saved to dist')
    return pdf
  }
  
  /**
   * After vite builds or html file, we need make changes to render PDF properly
   */
  async function buildAll() {
    const html = await fs.readFile('dist/index.html', 'utf8')
    const css = await fs.readFile('dist/assets/index.css', 'utf8')
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

    //Replace the vite index.html file with our changed one
    await fs.writeFile('dist/index.html', dom.serialize())
    const newHTML = await fs.readFile('dist/index.html', 'utf8')
    console.log('Updated index.html for Puppeteer...')
    await buildPDF(newHTML)
  }
  
  buildAll().catch(e => {
    console.error(e)
    process.exit(1)
  })