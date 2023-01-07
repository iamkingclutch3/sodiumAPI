const router = require("express").Router()
const request = require("request-promise");
const cheerio = require("cheerio");

let array = []

router.get("/", async(req, res) => {
    res.json({ message: 'Hello Guildcrafters'})
  })

router.get("/bminfo", async(req, res) => {
    console.log("Looking for gc bans in " + req.query.username)
    const result = await request.get(`https://bans.guildcraft.net/bans/submitsearch?searchBy=targetname&searchValue=${req.query.username}`);
    const $ = cheerio.load(result);
    $("#app > main > div > div:nth-child(4) > div > table > tbody > tr").each((index, element) => {
      if(!element) return res.status(404).JSON({ message: "No bans have been found for this user."})
        /*let text = $(element)
        text = text.replace(/(\r\n|\n|\r)/gm, "")
        text = text.replaceAll(/\s+/g, " ")
        let arr = text.split(" ")*/
        array.push({
          Target: $(`#app > main > div > div:nth-child(4) > div > table > tbody > tr:nth-child(${index + 1}) > td:nth-child(1)`).text().replaceAll(/\s+/g, " "),
          Moderator: $(`#app > main > div > div:nth-child(4) > div > table > tbody > tr:nth-child(${index + 1}) > td:nth-child(2)`).text().replaceAll(/\s+/g, " "),
          Reason: $(`#app > main > div > div:nth-child(4) > div > table > tbody > tr:nth-child(${index + 1}) > td:nth-child(3)`).text().replaceAll(/\s+/g, " "),
          Date: $(`#app > main > div > div:nth-child(4) > div > table > tbody > tr:nth-child(${index + 1}) > td:nth-child(4)`).text().replaceAll(/\s+/g, " "),
          Status: $(`#app > main > div > div:nth-child(4) > div > table > tbody > tr:nth-child(${index + 1}) > td:nth-child(5)`).text().replaceAll(/\s+/g, " "),
          Ureason: $(`#app > main > div > div:nth-child(4) > div > table > tbody > tr:nth-child(${index + 1}) > td:nth-child(6)`).text().replaceAll(/\s+/g, " "),
          UModerator: $(`#app > main > div > div:nth-child(4) > div > table > tbody > tr:nth-child(${index + 1}) > td:nth-child(7)`).text().replaceAll(/\s+/g, " "),
          Server: $(`#app > main > div > div:nth-child(4) > div > table > tbody > tr:nth-child(${index + 1}) > td:nth-child(8)`).text().replaceAll(/\s+/g, " ")
        })
        if(index === 19 || index === $("#app > main > div > div:nth-child(4) > div > table > tbody > tr").length - 1){
            res.status(200).send(array)
            array = []
        }
    });
    //console.log(await main(req.query.username))
    console.log("Bminfo sent")
})



module.exports = router;
