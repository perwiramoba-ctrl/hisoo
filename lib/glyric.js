const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const got = require('got');

function glyric(text) {
return new Promise((resolve, reject) => {
got(`https://www.google.com/search?q=lyric+song+${text}&oq=lyric+song+${text}&aqs=chrome..69i57j0i22i30j0i10i22i30j0i8i10i13i30.9505j0j9&client=ms-android-oppo-rvo2&sourceid=chrome-mobile&ie=UTF-8`).then(({body}) => {
s = cheerio.load(body)
song = s("div.BNeawe.tAd8D.AP7Wnd").text().trim()
resolve(song)
//fs.writeFileSync("./data.html", body)
})
})
}

module.exports = { glyric }