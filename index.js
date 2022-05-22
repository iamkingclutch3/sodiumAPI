const express = require('express')
const imgroute = require("./routes/screenshot")

const app = express()

app.use(express.json())
app.use("/api", imgroute);

app.listen(3000, () => {
  console.log(`Online listening https://puppeteer-in-repl.iamkingclutch.repl.co`)
})

module.export = app
