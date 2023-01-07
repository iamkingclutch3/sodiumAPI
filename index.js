const express = require('express')
const imgroute = require("./routes/screenshot")
const gcroute = require("./routes/guildcraft")

const app = express()

app.use(express.json())
app.use("/api", imgroute);
app.use("/gc", gcroute);

app.get('/', (req, res) => {
  res.send('Invalid endpoint!')
})

app.listen(process.env.PORT || 5000, () => {
  console.log(`Online listening https://puppeteer-in-repl.iamkingclutch.repl.co`)
})

module.export = app

process.on('uncaughtException', function (exception) {
  console.log(exception)
   });

//Keep alive cron job
const cron = require('cron');

const job = new cron.CronJob('0 */3 * * * *', function() {
  console.log('Keeping alive...');
}, null, true, 'Europe/Madrid');
