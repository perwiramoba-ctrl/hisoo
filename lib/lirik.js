const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const got = require('got');

function lirik(title) {
return new Promise((resolve, reject) => {
got(`https://www.musixmatch.com/search/${title}`).then(({body}) => {
let yio = []
let s = cheerio.load(body)
s("li.showArtist.showCoverart").each(function (a, b) {
yio.push({
"title": s(b).find("span").text(),
"link": `https://www.musixmatch.com${s(b).find("a.title").attr("href")}`
})
})
//_a = yio[0].link
//console.log(yio[0].link)
axios.get(yio[0].link).then(({data}) => {
//let hi = []
let sis = cheerio.load(data)
let kii = {
"url": yio, 
"result": {
"title": sis("meta[property=\"og:title\"]").attr("content"),
"link": sis("meta[property=\"og:url\"]").attr("content"),
"thumb": sis("meta[property=\"og:image\"]").attr("content"),
"lirik": sis("span.lyrics__content__ok").text().trim()
}
}
resolve(kii)
})
})
})
}

module.exports = { lirik }