const axios = require("axios")
const cheerio = require("cheerio")
const fs = require('fs')

function wihow(quer) {
return new Promise((resolve, reject) => {
axios.get("https://id.wikihow.com/wikiHowTo?search=" + quer).then((response) => {
if(response.status === 200) {
const html = response.data
const $ = cheerio.load(html)
const u = cheerio.load(html)
let data = []
$("div a.result_link").each(function(a, b) {
				
data.push({
"title": $(b).find("div.result_title").text().trim(),
"date": $(b).find("li.sr_updated").text().trim().replace(/[\t]/g, "").replace(/[\n]/g, " "),
"view": $(b).find("li.sr_view").text().trim().replace(/[\t]/g, "").replace(/[\n]/g, " "),
"link": $(b).attr("href")
})
})
resolve(data)
}
})
})
}


function wikihow(text) {
return new Promise((resolve, reject) => {
axios.get(text).then((response) => {
if(response.status === 200) {
const html = response.data
const $ = cheerio.load(html)
let data = `[${$("script").text().split("('rightrail1_ad_1')")[1].split("window")[0].replace (/}{/g, "},{")}]`
resolve(JSON.parse(data))
}
})
})
}
	
module.exports = {wihow, wikihow}