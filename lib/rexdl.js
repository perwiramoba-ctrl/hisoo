const cheerio = require('cheerio')
const axios = require('axios')

function rexdl(apk) {
	return new Promise((resolve, reject) => {
axios.get('https://rexdl.com/?s=' + apk).then((response) => {
if(response.status === 200) {
const html = response.data
const $ = cheerio.load(html)
let lit = []
$('h2.post-title').each(function (a, b) {
        lit.push({"title": $(b).find('a:nth-child(1)').text(), "html": $(b).find('a').attr('href')})
        
        })

let tes = {
			'list': lit,
			'watermark': 'by ©Perwira'
			}
resolve(tes)
}
})
})
}

function html(dit) {
return new Promise((resolve, reject) => {
axios.get(dit).then(({data}) => {
let htmlii = data;
const k = cheerio.load(htmlii);
let urli = []

k('a').each(function (a, b) {
urli.push(k(b).attr('href'))
})
        
        let liu = {
        	"url": urli.filter(p => p.endsWith('.apk'))
        	}
        
        resolve(liu)
       
       })
       })
       }
       
function rix(din) {
return new Promise((resolve, reject) => {
axios.get(din).then(({data}) => {
let datia = []
let htmli = data;
const p = cheerio.load(htmli);

let th = {
	"thumb": p('#dlbox').find('img').attr('data-src'),
	"otw": p('span.readdownload').find('a').attr('href')
	}
	
	resolve(th)
})
})
}
module.exports = { rexdl, rix, html };