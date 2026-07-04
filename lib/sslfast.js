const axios = require("axios")
const cheerio = require("cheerio")
const fs = require("fs")

function ssli(name) {
return new Promise((resolve, reject) => {
axios.post("https://osint.sh/subdomain/", `domain=${name}`).then(({data}) => {
let s = cheerio.load(data)
let key = []
let keyres = []
s("table tr").each(function (a, b) {
key.push({"domain": s(b).find("td a").attr("href"), "ip": s(b).find("td:nth-child(3)").text().trim(), "cf": s(b).find("td img").attr("src")})
	})

for(let i of key) {
if(i.domain === undefined) continue 
keyres.push(i)
	}
resolve(keyres)
//fs.writeFileSync("./data.html", data)
})
})
}

module.exports = { ssli }