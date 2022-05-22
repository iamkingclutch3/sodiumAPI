const router = require("express").Router()
const puppeteer = require("puppeteer")
const path = require('path');

const filepath = path.resolve(__dirname, '../images/example.png');


router.get("/", async(req, res) => {
  res.json({ message: 'Hello World'})
})

router.get("/getimg", async(req, res) => {
console.log("Creating")
await ss(req, res)
  res.sendFile(filepath)
  console.log("Created")
})

module.exports = router;

const ss = async (req, res) => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })
  const page = await browser.newPage()

  await page.goto("https://bans.guildcraft.net/", {"waitUntil" : "networkidle0"})
  await page.screenshot({ path: './images/example.png', fullPage: true })
  return
}