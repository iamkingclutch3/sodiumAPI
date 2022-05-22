const express = require('express')
const imgroute = require("./routes/screenshot")

const app = express()

app.use(express.json())
app.use("/api", imgroute);

app.get('/', (req, res) => {
  res.send('Invalid endpoint!')
})

app.listen(process.env.PORT || 5000, () => {
  console.log(`Online listening https://puppeteer-in-repl.iamkingclutch.repl.co`)
})

module.export = app
