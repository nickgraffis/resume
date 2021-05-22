const puppeteer = require('puppeteer')
const fs = require('fs-extra')
const jsdom = require("jsdom");

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
    console.log('Done')
    return pdf
  }
  
  async function buildAll() {
    const html = await fs.readFile('dist/index.html', 'utf8')
    const css = await fs.readFile('dist/assets/index.4c84e427.css', 'utf8')
    const dom = new jsdom.JSDOM(html)
    dom.window.document.querySelector("head").innerHTML += `<style>
    ${css}
    </style>`;
    dom.window.document.querySelectorAll("a").target = '_blank'
    dom.window.document.querySelectorAll("a").rel = 'noreferrer'
    await fs.writeFile('dist/index.html', dom.serialize())
    const newHTML = await fs.readFile('dist/index.html', 'utf8')
    await buildPDF(newHTML)
    console.log('done')
  }
  
  buildAll().catch(e => {
    console.error(e)
    process.exit(1)
  })