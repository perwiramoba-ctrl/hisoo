const axios = require("axios")
const cheerio = require("cheerio")

async function igg(limk) {
return new Promise((resolve, reject) => {
axios.post(
    'https://instaoffline.net/process/',
    new URLSearchParams({
        'q': limk
    }),
    {
        headers: {
            'authority': 'instaoffline.net',
            'accept': 'application/json, text/javascript, */*; q=0.01',
            'accept-language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'cookie': 'PHPSESSID=jnbrn1d14pc2v3m6i5k2nu1n46; popCookie=1; _ga=GA1.2.1437853609.1661507461; _gid=GA1.2.414210094.1661507461; _gat_gtag_UA_78205517_3=1',
            'origin': 'https://instaoffline.net',
            'referer': 'https://instaoffline.net/?q=https://www.instagram.com/p/CQzYfdCLS9W/?utm_source=ig_web_copy_link',
            'sec-ch-ua': '"Chromium";v="105", "Not)A;Brand";v="8"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent': 'Mozilla/5.0 (Linux; Android 12; RMX3363) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Mobile Safari/537.36',
            'x-requested-with': 'XMLHttpRequest'
        }
    }
).then(({data}) => {
	const $ = cheerio.load(data.html)
	uio = []
	$("a.button").each(function (a,b) {
	uio.push({
"type": $(b).text(),
"link":$(b).attr("href")
})
})
	/**console.log(uio)*/
	resolve(uio)
	})
	})
}

module.exports = { igg }