const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs")

function subdomain(dom) {
return new Promise((resolve, reject) => {
axios.post('https://subdomains.whoisxmlapi.com/api/lookup',
{
"g-recaptcha-response":null,
"search": `${dom}`,
"lookup":true,
"":`${dom}`
},
{
'headers': {
    "accept": "application/json, text/plain, */*",
    "accept-language": "en-ID,en;q=0.9,id-ID;q=0.8,id;q=0.7,en-GB;q=0.6,en-US;q=0.5",
    "content-type": "application/json",
    "sec-ch-ua": '"Chromium";v="105", "Not)A;Brand";v="8"',
    "sec-ch-ua-mobile": "?1",
    "sec-ch-ua-platform": '"Android"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-csrf-token": "6mdHf92zpGj2YORLOrsasCBUrzsPsB8YCk2Mcevr",
    "x-requested-with": "XMLHttpRequest",
    "cookie": "_rdt_uuid=1664763119621.306c9af6-33ca-4ec8-a4c4-3cd8dcf44010; _ga=GA1.2.239686230.1664763120; _gid=GA1.2.1223480537.1664763120; cebs=1; cf_12389_id=799e74d8-554d-4f64-a70c-09b242e8fbc4; _fbp=fb.1.1664763120641.947280443; _gcl_au=1.1.1583981984.1664763123; __hstc=69031886.2242376b32035bafbb9b4d886494c19e.1664763124955.1664763124955.1664763124955.1; hubspotutk=2242376b32035bafbb9b4d886494c19e; __hssrc=1; XSRF-TOKEN=eyJpdiI6IjdKQ0hDXC9hZUNlbld4NjF5eG9NR3BnPT0iLCJ2YWx1ZSI6Im1OZDJYZWJWcWMzNlhqaWdiOTQ1YStkY3ZqWGFVUVg1NjFNM3NqdHE5bU80Mk1qTnhYVGwzditwdUpFMXpcLzcyIiwibWFjIjoiM2VhMzE4MjdjODlmZTZiZjE4NjU0YjRjY2RjNGJlNDhlNGNmOGU0OWIyNTUzZGQxNWYyZGZhYmUzODk0MzAwNSJ9; emailverification_session=eyJpdiI6ImpNdWNyck9Cb1Z4RUhiVXFRQ0hOeGc9PSIsInZhbHVlIjoiYVVSSEptZlRsbW9NTndMSGwzQk1ySVJ0aVFqOG9FelQ2MWxuU0JpZjlMa1V5Q0ZVcGkzcWJGOWgxXC9rMElVK01CUGxGQnhYcHpHNVRIM3VIS2p2Sm45bmM1clRiZ2FYVlRpRnZJaFJ6dGJiVUpBK01DUDBYVnRLcDB4K1RlXC95WSIsIm1hYyI6IjRkOTJiOGM5MmY4YzUyOWE2NzY5MjQxYzBmNDQwNmFhNmFhZjJhNTgyZDc5MjFhNmRkZjZjYjdhMjcwMGI2YTUifQ%3D%3D; _gat_gtag_UA_91879_2=1; cf_12389_person_last_update=1664763287441; cebsp=4; _ce.s=v~fda46bab6e6d544ec259103323da5cc15198e3d2~vpv~0~v11.rlc~1664763121949~v11slnt~1664763288113; __hssc=69031886.4.1664763124958",
    "Referer": "https://subdomains.whoisxmlapi.com/",
    "Referrer-Policy": "strict-origin"
  }
}).then(async sublink => {
let linknew = sublink.data

axios.get(linknew).then(({data}) => {
const s = cheerio.load(data)
let day = s("subdomains-lookup-component").attr("data")
let _i = JSON.parse(day).result
resolve(_i)
//fs.writeFileSync("./data.html", data)
})
})
})
}

module.exports = { subdomain }