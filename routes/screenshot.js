const router = require("express").Router()
const puppeteer = require("puppeteer")
const path = require('path');
const fs = require('fs')

router.get("/", async(req, res) => {
  res.json({ message: 'Hello World'})
})

router.get("/getimg", async(req, res) => {
console.log("Creating half for " + req.query.url)
if(isValidHttp(req.query.url) === false) return res.status(400).json({ error: "Not a valid hostname or ip" })
if(await hss(req.query.url, res) === false) return res.status(400).json({ error: "Not a valid hostname or ip" })

res.status(200).json({ "data": await hss(req.query.url, res)})
console.log("Created")
})

router.get("/getfimg", async(req, res) => {
  console.log("Creating full for " + req.query.url)
  if(isValidHttp(req.query.url) === false) return res.status(400).json({ error: "Not a valid hostname or ip" })
  if(await ss(req.query.url, res) === false) return res.status(400).json({ error: "Not a valid hostname or ip" })
  
  res.status(200).json({ "data": await ss(req.query.url, res)})
  console.log("Created")
  })

module.exports = router;

const ss = async (req, res) => {
  try{
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] })
    const page = await browser.newPage()
  
    try{
      await page.goto(req, { waitUntil: 'load', timeout: 10000 })
    }catch(error){
      console.log(error)
      await browser.close()
      return false
    }

    await page.goto(req, { waitUntil: "networkidle0" })
    const img = await page.screenshot({ fullPage: true, type: "png" })
    await browser.close()
    return img.toString('base64')
  }catch(error){
    await browser.close()
    console.log(error)
  }
}

const hss = async (req, res) => {
  try{
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] })
    const page = await browser.newPage()
  
    try{
      await page.goto(req, { waitUntil: 'load', timeout: 10000 })
    }catch(error){
      console.log(error)
      await browser.close()
      return false
    }

    await page.goto(req, { waitUntil: "networkidle0" })
    const img = await page.screenshot({ defaultViewport: { width: 1920, height: 1080 }, type: "png" })
    await browser.close()
    return img.toString('base64')
  }catch(error){
    await browser.close()
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
