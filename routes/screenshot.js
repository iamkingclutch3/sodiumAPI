const router = require("express").Router()
const puppeteer = require("puppeteer")
const path = require('path');

const filepath = path.resolve(__dirname, '../images/example.png');


router.get("/", async(req, res) => {
  res.json({ message: 'Hello World'})
})

router.get("/getimg", async(req, res) => {
console.log("Creating for " + req.query.url)
if(isValidHttp(req.query.url) === false) return res.status(400).json({ error: "Not a valid hostname or ip" })
if(await ss(req.query.url, res) === false) return res.status(400).json({ error: "Not a valid hostname or ip" })
await ss(req.query.url, res)
res.status(200).sendFile(filepath)
console.log("Created")
})

module.exports = router;

const ss = async (req, res) => {
  try{
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })
    const page = await browser.newPage()
  
    try{
      await page.goto(req, { waitUntil: 'load', timeout: 10000 })
    }catch(error){
      console.log(error)
      return false
    }

    await page.goto(req, { waitUntil: "networkidle0" })
    await page.screenshot({ path: './images/example.png', fullPage: true })
    return
  }catch(error){
    console.log(error)
  }
}

function isValidHttp(string) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ 
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
    '((\\d{1,3}\\.){3}\\d{1,3}))'+
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
    '(\\?[;&a-z\\d%_.~+=-]*)?'+
    '(\\#[-a-z\\d_]*)?$','i');

    return !!pattern.test(string)
}
