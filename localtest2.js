const request = require("request-promise");
const cheerio = require("cheerio");

let array = []

async function main() {
    const result = await request.get("https://bans.guildcraft.net/bans/submitsearch?searchBy=targetname&searchValue=Hello");
    const $ = cheerio.load(result);
    $("#app > main > div > div:nth-child(4) > div > table > tbody > tr").each((index, element) => {
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
        if(index === 19) console.log(array)
    });
   }

   main();

   