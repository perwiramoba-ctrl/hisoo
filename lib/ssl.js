const axios = require("axios")
const cheerio = require("cheerio")
const fs = require("fs")

function ssl(ssl) {
return new Promise((resolve, reject) => {
axios.get(`https://www.fairssl.net/en/ssltest-result/${ssl}/SNI/true/`).then(({data}) => {
let s = cheerio.load(data)
let k = `${s("div.test-result").text().replace(/\t/g, "").replace(/\n\n/g, "\n").replace(/: +\n/g, ": ").replace(/\n\n/g, "\n").replace(/\*/g, "")}`
resolve(k)
})
})
}

module.exports = { ssl }