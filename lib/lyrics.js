const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const got = require('got');


function lyric(song) {
return new Promise((resolve, reject) => {
axios.get(`https://www.lyrics.com/lyrics/${song.replace(/ +/g, "%20")}`).then(({data}) => {
let s = cheerio.load(data)
let h = {
"title": s("div.best-matches div.album-thumb img").attr("title"),
"link": `https://www.lyrics.com${s("div.best-matches div.album-thumb a").attr("href")}`,
"thumb": s("div.best-matches div.album-thumb img").attr("src")

}
//console.log(h)
//fs.writeFileSync('./data.html', data)


axios.get(h.link).then(({data}) => {
let so = cheerio.load(data)
let g = so("#lyric-body-text").text().trim()

let result = {
"link": h,
"lyrics": g
}
resolve(result)
//fs.writeFileSync('./data.html', data)
})
})
})
}

module.exports = { lyric }