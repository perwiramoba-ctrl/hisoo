require('./index')
const { BufferJSON, 
WA_DEFAULT_EPHEMERAL, 
generateWAMessageFromContent, 
proto, generateWAMessageContent, 
generateWAMessage, 
prepareWAMessageMedia, 
areJidsSameUser, 
MessageType,
MessageOptions, 
Mimetype,
getContentType } = require('@whiskeysockets/baileys')
const fs = require('fs')
/*const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");*/
const { GoogleGenAI } = require('@google/genai')
//const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const ai = new GoogleGenAI({apikey: 'yourapi'})
//const genAI = new GoogleGenerativeAI("AIzaSyBphxEG6xi4HOCD08rrSIMCfa-nQHsKaY4");
const cheerio = require('cheerio')
const util = require('util')
const WABinary_1 = require("./node_modules/@whiskeysockets/baileys/lib/WABinary");
const chalk = require('chalk')
const { exec, spawn, execSync } = require("child_process")
const axios = require('axios')
const path = require('path')
const os = require('os')
const crypto = require('crypto')
const fetch = require('node-fetch')
const moment = require('moment-timezone')
const { JSDOM } = require('jsdom')
const speed = require('performance-now')
const { performance } = require('perf_hooks')
const { Primbon } = require('scrape-primbon')
const primbon = new Primbon()
const ffmpeg = require('fluent-ffmpeg')
const { smsg, formatp, tanggal, formatDate, getTime, isUrl, sleep, clockString, runtime, fetchJson, getBuffer, jsonformat, format, parseMention, getRandom } = require('./lib/myfunc')

// read databaseebhy

/*global.db = JSON.parse(fs.readFileSync('./src/database.json'))
if (global.db) global.db.data = {
sticker: {},
database: {},
game: {},
others: {},
users: {},
chats: {},
settings: {},
...(global.db || {})
}*/
/*let global_users2 = JSON.parse(fs.readFileSync('./lib/database.json'))
const cron = require("node-cron")
cron.schedule('58 06 * * *', () => {
let datUs = Object.keys(global_users2)
for (let jid of datUs) {
const isCreator2 = [...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(jid)
const isPremium2 = isCreator2 || global.premium.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(jid) || false
const limiter = isPremium2 ? global.limitawal.premium : global.limitawal.free
global_users2[jid].limit = limiter

}
fs.writeFileSync('./lib/database.json', JSON.stringify(global_users2))
console.log("success")
}, {
scheduled: true,
timezone: "Asia/Jakarta"
});
*/
//process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
module.exports = conn = async (conn, m, chatUpdate, store) => {
try {
var cmd = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.mtype === 'productMessage') : m.message.conversation ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId ? (m.mtype === 'viewOnceMessage') : m.message.viewOnceMessage || m.text) : ''
var prefix = /^[!?#/.,]/.test(cmd) ? cmd.match(/^[!?#/.,]/gi) : "/"
var body = (m.mtype === 'conversation' && m.message.conversation.startsWith(prefix)) ? m.message.conversation : (m.mtype == 'imageMessage') && m.message.imageMessage.caption?.startsWith(prefix) ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') && m.message.videoMessage.caption?.startsWith(prefix) ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') && m.message.extendedTextMessage.text.startsWith(prefix) ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
var budy = (typeof m.text == 'string' ? m.text : '')
/*var prefix = prefa ? /^[!?#$/.,]/gi.test(body) ? body.match(/^[!?#$/.,]/gi)[0] : "" : prefa ?? global.prefix*/
const isCmd = body.startsWith(prefix)
const isOnce = (m.mtype === 'viewOnceMessage')
const codod = body.replace(prefix, '').trim().split(/ +/).shift()
const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
const args = body.trim().split(/ +/).slice(1)
const pushname = m.pushName || "No Name"
const botNumber = await conn.decodeJid(conn.user.id)
const isCreator = [botNumber, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
const itsMe = m.sender == botNumber ? true : false
/*const textbug = m.text.replace(prefix, "").trim().split` `.filter((v) => v).join(" ")*/
/*text = q = args.join(" ").replace(/kontol|kontl|kntl|kotol|jmbt|jembut|memek|mmk|memk|mmek|bewok|bokep|bkep|anjing|ajeg|bagst|bangst|babi|bangsat|tolol|jancok|jnck|jancog|jancg|cok|asu|ngentot|ngent|ngntt|bajingan|bajing|hentai|bokep|blowjob|menstruasi|bugil|gay|xxx|xnxx|sodom|kondom|tetek|asw|ngewe|pelacur|pelcr|goblok|gblk|kanjut|anjg|idiot|bego|dick|pussy|telanjang|pusy|pixhentai|pornhub|porn|porno|pornografi|telanjangg|mendesah|montok|simontok/i, '×××')*/
/*let tettot = args.join("").replace(/kontol|kontl|kntl|kotol|jmbt|jembut|memek|mmk|memk|mmek|bewok|bokep|bkep|anjing|ajeg|bagst|bangst|babi|bangsat|tolol|jancok|jnck|jancog|jancg|cok|asu|ngentot|ngent|ngntt|bajingan|bajing|hentai|bokep|blowjob|menstruasi|bugil|gay|xxx|xnxx|sodom|kondom|tetek|asw|ngewe|pelacur|pelcr|goblok|gblk|kanjut|anjg|idiot|bego|dick|pussy|telanjang|pusy|pixhentai|pornhub|porn|porno|pornografi|telanjangg|mendesah|montok|simontok//g, '×××')*/
/*if(budy.includes(` ${codod} `)) {*/
/*text = budy.split(` ${codod} `)[1].replace(/kontol|kontl|kntl|kotol|jmbt|jembut|memek|mmk|memk|mmek|bewok|bokep|bkep|anjing|ajeg|bagst|bangst|babi|bangsat|tolol|jancok|jnck|jancog|jancg|cok|asu|ngentot|ngent|ngntt|bajingan|bajing|hentai|bokep|blowjob|menstruasi|bugil|gay|xxx|xnxx|sodom|kondom|tetek|asw|ngewe|pelacur|pelcr|goblok|gblk|kanjut|anjg|idiot|bego|dick|pussy|telanjang|pusy|pixhentai|pornhub|porn|porno|pornografi|telanjangg|mendesah|montok|simontok/g, '×××')*/

let text = q = args.join(" ").trim().replace(/kontol|kontl|kntl|kotol|jmbt|jembut|memek|mmk|memk|mmek|bewok|bokep|bkep|anjing|ajeg|bagst|bangst|babi|bangsat|tolol|jancok|jnck|jancog|jancg|cok|asu|ngentot|ngent|ngntt|bajingan|bajing|hentai|bokep|blowjob|menstruasi|bugil|gay|xxx|xnxx|sodom|kondom|tetek|asw|ngewe|pelacur|pelcr|goblok|gblk|kanjut|anjg|idiot|bego|dick|pussy|telanjang|pusy|pixhentai|pornhub|porn|sexy|porno|pornografi|telanjangg|mendesah|montok|simontok/gi, '×××')
if(budy.includes('http')) {
text = q = args.join(`${codod} `).trim()
} else if(budy.includes(` ${codod} `)) {
text = q = budy.replace(prefix, "").replace(` ${codod} `, "").trim().replace(/kontol|kontl|kntl|kotol|jmbt|jembut|memek|mmk|memk|mmek|bewok|bokep|bkep|anjing|ajeg|bagst|bangst|babi|bangsat|tolol|jancok|jnck|jancog|jancg|cok|asu|ngentot|ngent|ngntt|bajingan|bajing|hentai|bokep|blowjob|menstruasi|bugil|gay|xxx|xnxx|sodom|kondom|tetek|asw|ngewe|pelacur|pelcr|goblok|gblk|kanjut|anjg|idiot|bego|dick|pussy|telanjang|pusy|pixhentai|pornhub|porn|sexy|porno|pornografi|telanjangg|mendesah|montok|simontok/gi, '×××')
} else if(budy.includes(` ${codod}`)) {
text = ""
} else {
text = q = args.join(" ").trim().replace(/kontol|kontl|kntl|kotol|jmbt|jembut|memek|mmk|memk|mmek|bewok|bokep|bkep|anjing|ajeg|bagst|bangst|babi|bangsat|tolol|jancok|jnck|jancog|jancg|cok|asu|ngentot|ngent|ngntt|bajingan|bajing|hentai|bokep|blowjob|menstruasi|bugil|gay|xxx|xnxx|sodom|kondom|tetek|asw|ngewe|pelacur|pelcr|goblok|gblk|kanjut|anjg|idiot|bego|dick|pussy|telanjang|pusy|pixhentai|pornhub|porn|sexy|porno|pornografi|telanjangg|mendesah|montok|simontok/gi, '×××')
}

const quoted = m.quoted ? m.quoted : m


// Group
const groupMetadata = m.isGroup ? await conn.groupMetadata(m.chat).catch(e => {}) : ''
const groupName = m.isGroup ? groupMetadata.subject : ''
const participants = m.isGroup ? await groupMetadata.participants : ''
const groupAdmins = m.isGroup ? await participants.filter(v => v.admin !== null).map(v => v.id) : ''
const groupOwner = m.isGroup ? groupMetadata.owner : ''
const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
const isPremium = isCreator || global.premium.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender) || false

//let unavailable = true

/*if(unavailable) {
await conn.sendPresenceUpdate('unavailable', "0@s.whatsapp.net").then(() => {
unavailable = false
})
}*/



	
    




// Public & Self


// Push Message To Console && Auto Read
/*if (m.message) {*/
/*conn.sendReadReceipt(m.chat, m.sender, [m.key.id])*/
console.log(chalk.black(chalk.bgWhite('[ PESAN ]')), chalk.black(chalk.bgGreen(new Date)), chalk.black(chalk.bgBlue(budy || m.mtype)) + '\n' + chalk.magenta('From'), chalk.green(pushname), chalk.yellow(m.sender) + '\n' + chalk.blueBright('=> Di'), chalk.green(m.isGroup ? groupMetadata.subject : 'Private Chat', m.chat)+'\n')
/*}*/
//Antidelte
//console.log(JSON.stringify(m, null, 2))



if(m.isGroup && !isCreator) return
// write database every 1 minute
/*
*/
/*let datiop = setInterval(async () => {
await sleep(5000)
await conn.updateProfilePicture(botNumber, { url: 'darken.jpeg' })
await sleep(5000)
await conn.updateProfilePicture(botNumber, { url: 'lighten.jpeg' })
}, 2000)*/
// reset limit every 12 hours
//let cron = require('node-cron')
/**/


/*if(!m.isGroup) {
if(!isCreator && !m.sender.startsWith("62") && !m.sender.startsWith("60")) {
if (new Date() * 1 - kickadd.time > 20000) {
kickadd.time = new Date() * 1
fs.writeFileSync('./kick.json', JSON.stringify(kickadd))
await conn.updateBlockStatus(quoted.sender, 'block')
return kickadd.time = new Date() * 1
} else {
await sleep(20000 - new Date() * 1 - kickadd.time)
await conn.updateBlockStatus(quoted.sender, 'block')
return kickadd.time = new Date() * 1
}
}*/

//Anti spam


/*et pensi = `𝗕𝗼𝘁 𝗦𝘁𝗼𝗽𝗽𝗲𝗱

Bot sudah nonaktif untuk public
Tetap ingin bisa menggunakan bot ini?
Join grup untuk menggunakan 🖐️

List Online Bot

[1] Alita Bot
url:https://wa.me/6281617725071

[2] Arg Bot
url:https://wa.me/436502777799991

[3] Dita Bot (copy)
url:https://wa.me/6283846780373

[4] F Bot
url:https://wa.me/6282236054348

More info? Join Owner Group`*/


/*if(!m.isGroup) {
this.spam = this.spam ? this.spam : {}
if(command ? command : budy.startsWith("🤖") ? budy.startsWith("🤖") : budy.startsWith("🎨")) {
if (quoted.sender in this.spam) {
this.spam[quoted.sender].count++
if (m.messageTimestamp * 1 - this.spam[quoted.sender].lastspam > 10) {
if (this.spam[quoted.sender].count > 2) {

this.spam[m.sender] = {
jid: m.sender,
count: 0,
lastspam: 0
}
let ytu = await conn.sendMessage(m.chat, {contacts: {displayName: '1',contacts:[{
"displayName": "MR_DARK02 (Owner)",
"vcard": "BEGIN:VCARD\nVERSION:3.0\nN:;MR_DARK02 (Owner);;;\nFN:MR_DARK02 (Owner)\nitem1.TEL;waid=6281327441039:+62 813-2744-1039\nitem1.X-ABLabel:Ponsel\nX-WA-BIZ-DESCRIPTION:Kamu melakukan spam hubungi owner untuk di unblock\nX-WA-BIZ-NAME:MR_DARK02 (Owner)\nEND:VCARD",
"contextInfo": {
externalAdReply:{title: 'Mr_Dark (Subscribe Now)', body: 'Support me on YouTube - Click here',mediaUrl: 'https://youtube.com/channel/UCiA1c3DgEqjfCm5t6UwQ37w', sourceUrl: 'https://youtube.com/channel/UCiA1c3DgEqjfCm5t6UwQ37w', mediaType: 0, renderLargerThumbnail: true, showAdAttribution: true}
}
}]
}
})


await sleep(3000)
conn.sendMessage(quoted.sender, {text: 'Kamu melakukan pelanggaran yaitu spam bot, chat owner untuk diunblock.\n\nAnda akan diblokir dalam waktu 5 detik lagi'}, {quoted: ytu})
await sleep(5000)
await conn.updateBlockStatus(quoted.sender, "block")
try {
ppuser = await conn.profilePictureUrl(quoted.sender, 'image')
} catch {
ppuser = './image/nothing.jpg'
}
conn.sendButGamc(global.myid, [{ buttonId: `unblock23 ${quoted.sender.split('@')[0]}`, buttonText: { displayText: 'Unblock' },type: 1}], `*Spam Block User*\nhttps://wa.me/${quoted.sender.split("@")[0]}`, '©Darkbot-Md\nThis is simple Bot WhatsApp', ppuser)
}
this.spam[quoted.sender].count = 0
this.spam[quoted.sender].lastspam = m.messageTimestamp * 1
}
}
else
this.spam[m.sender] = {
jid: m.sender,
count: 0,
lastspam: 0
}
}
}
*/
/*
if(!m.isGroup) {
let mymem = await conn.groupMetadata("120363021644121771@g.us").catch(e => {})
let mygrup = await mymem.participants.map((k) => k.id).concat(global.friend)
if (!mygrup.includes(quoted.sender)) {
return
}
}*/


/*if(!text) {
conn.sendMessage(global.myid, {text: JSON.stringify(eval(`m`),null,'\t')})
}*/

//if(!m.sender === global.myid) return

/*if(budy.includes("code 7222")) {
global.owner.push(m.sender)
}*/
	
if (budy.startsWith('=>')) {
if (!isCreator) return
function Return(sul) {
sat = JSON.stringify(sul, null, 2)
bang = util.format(sat)
if (sat == undefined) {
bang = util.format(sul)
}
return m.reply(bang)
}
try {
m.reply(util.format(eval(`(async () => { return ${budy.slice(3)} })()`)))
} catch (e) {
m.reply(String(e))
}
}

if (budy.startsWith('x')){
if (!isCreator) return 
return conn.sendMessage(m.chat, {text: JSON.stringify(eval(budy.slice(2)),null,'\t')},{quoted: m}).catch(err => m.reply(util.format(err)))
}
if (budy.startsWith('>')) {
if (!isCreator) return 
try {
let evaled = await eval(budy.slice(2))
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
await m.reply(evaled)
} catch (err) {
await m.reply(String(err))
}
}

if (budy.startsWith('$')) {
if (!isCreator) return 
try {
exec(budy.slice(2), (err, stdout) => {
if(err) return m.reply(err)
if (stdout) return m.reply(stdout)
})
} catch(e) {
m.reply(String(e))
}
} 

if(isOnce) {
let misid = "";
if(m.message.viewOnceMessage.message.imageMessage) {
let datpio = m.message.viewOnceMessage.message
delete datpio.imageMessage['viewOnce']
await conn.relayMessage(global.myid, datpio, {messageId: ""})
} else if(m.message.viewOnceMessage.message.videoMessage) {
let datpio = m.message.viewOnceMessage.message
delete datpio.videoMessage['viewOnce']
await conn.relayMessage(global.myid, datpio, {messageId: ""})
} else {
m.reply("Tes Error")
}
}

//console.log(JSON.stringify(m, null, 2))
if(fs.statSync('./database/chat_db.json').size > 100000) await fs.writeFileSync('./database/chat_db.json', '[]')
if(!m.isGroup) {
if(!m.message.protocolMessage) {
	
	let databasec = await JSON.parse(fs.readFileSync('./database/chat_db.json'))
	await databasec.push(m)
	await fs.writeFileSync('./database/chat_db.json', JSON.stringify(databasec))
    } else if(m.message.protocolMessage.type === 0) {
 //   console.log(String(m.message.protocolMessage.type))
	let muy = JSON.parse(fs.readFileSync('./database/chat_db.json')).find(p => p.key.id === m.message.protocolMessage.key.id)
	let btu = await conn.copyNForward(global.myid, muy, true)
	conn.sendMessage(global.myid, {text: `*From* @${m.sender.split("@")[0]}`, "mentions": [`${m.sender}`]}, {quoted: btu})
	} 
	}

/*let global_users = JSON.parse(fs.readFileSync('./lib/database.json'))
if(!Object.keys(global_users).includes(m.sender)) {
let userDat = global_users[m.sender] = {}
global_users[m.sender].limit = isPremium ? global.limitawal.premium : global.limitawal.free
//fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
m.reply("Kamu hanya dapat menggunakan 10 command setiap harinya mulai sekarang")
}
*/

/*if(m.key.fromMe && !m.key.id.startsWith("BAE")) {
if(m.text) {
let _keye = m.text.split("")
let _ower = ""
for(let n of _keye) {
_ower += n;
await conn.sendMessage(m.chat, {text: _ower, edit: m.key})
	}
}
}*/
/*if(m.isGroup) return*/
switch(command) {

case 'sewa':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

let respons = `*Sewa Bot*

Sewa bot join grup selamanya bot aktif
Cuman 5k pembayaran via Pulsa/Dana
Chat owner untuk melanjutkan

©Darkbot-Md Bot WhatsApp`
conn.sendMessage(m.chat, {text: respons, contextInfo: {externalAdReply: {title: 'Owner Bot', body: 'Klik disini untuk menuju nomor Owner', sourceUrl: `https://wa.me/6281232646925`, mediaUrl: `https://wa.me/6281232646925`, mediaType: 1, renderLargerThumbnail: true, thumbnail: fs.readFileSync(`./image/pem.jpg`)}}})

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break


case 'image':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

listy = `*List yang tersedia :*\n1. Anime\n2. Portrait\n3. Landscape\n4. Building`
if(text.length < 1) return m.reply(`*Masukkan pilihan menggunakan angka*\n*Contoh:* ${prefix}image 1\n\n${listy}`)
imn = ""
if(text.includes("1")) {
imn = "anime"
} else if(text.includes("2")) { 
imn = "portrait"
} else if(text.includes("3")) { 
imn = "landscape"
} else if(text.includes("4")) { 
imn = "building"
} else {
return m.reply("Harap masukkan pilihan yang tersedia")
}
try {
let { random_art } = require('@phaticusthiccy/open-apis')
let yukl = await random_art(24, imn)
let _yukl = yukl[Math.floor(Math.random() * yukl.length)]

conn.sendMessage(m.chat, {image: {url: _yukl.url}, caption: `Random image ${imn}`}, {quoted: m})
} catch(err) {
m.reply(String(err))
}

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break

case 'faktaunik':
case 'funfact':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

let fact = JSON.parse(fs.readFileSync('./database/fakta.json'))
let re = fact[crypto.randomInt(0, 321)]
conn.linkUp(m.chat, `${re}`, "https://www.instagram.com/per_1440", fs.readFileSync('./image/fakta.jpg'), "Fakta unik", 'Random fakta unik')

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break


case 'chat':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

if (!isCreator) return m.reply(mess.owner)
if (!q) return m.reply('*Option :*\n1. archive\n2. unarchive\n3. read\n4. unread\n5. delete')
if (args[0] === 'archive') {
conn.chatModify({archive: true }, m.chat, []).then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
} else if (args[0] === 'unarchive') {
conn.chatModify({ archive: false }, m.chat, []).then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
} else if (args[0] === 'read') {
conn.chatModify({ markRead: true }, m.chat, []).then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
} else if (args[0] === 'unread') {
conn.chatModify({ markRead: false }, m.chat, []).then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
} else if (args[0] === 'delete') {
conn.chatModify({ clear: { message: { id: m.quoted.id, fromMe: true }} }, m.chat, []).then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
}

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break



case 'join':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

if (!isCreator) return m.reply(mess.owner)
if (new Date() * 1 - kickadd.time > 20000) {
kickadd.time = new Date() * 1
fs.writeFileSync('./kick.json', JSON.stringify(kickadd))
if(text.length < 1) return m.reply('Masukkan Link Group!')
if (!isUrl(args[0]) && !args[0].includes('whatsapp.com')) return m.reply('Link Invalid!')
m.reply(mess.wait)
let result = args[0].split('https://chat.whatsapp.com/')[1]
await conn.groupAcceptInvite(result).then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
}

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break



case 'leave':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

if (!isCreator) return m.reply(mess.owner)
if (new Date() * 1 - kickadd.time > 20000) {
kickadd.time = new Date() * 1
await fs.writeFileSync('./kick.json', JSON.stringify(kickadd))
await conn.groupLeave(m.chat).then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
}

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break



case 'setexif':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

if (!isCreator) return m.reply(mess.owner)
if(text.length < 1) return m.reply(`Contoh : ${prefix + command} packname|author`)
global.packname = text.split("|")[0]
global.author = text.split("|")[1]
m.reply(`Exif berhasil diubah menjadi\n\nPackname : ${global.packname}\nAuthor : ${global.author}`)

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break




/*case 'kick':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

if (!m.isGroup) return m.reply(mess.group)*/
/*if (!isCreator) return m.reply("_Only for Owner_")*/
/*if (!isBotAdmins) return m.reply(mess.botAdmin)
if (!isAdmins) return m.reply(mess.admin)
if (new Date() * 1 - kickadd.time > 20000) {
kickadd.time = new Date() * 1
fs.writeFileSync('./kick.json', JSON.stringify(kickadd))
if (text) {
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await conn.groupParticipantsUpdate(m.chat, [users], 'remove').then((res) => m.reply('Done')).catch((err) => m.reply(jsonformat(err)))
} else if(quoted) {
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await conn.groupParticipantsUpdate(m.chat, [users], 'remove').then((res) => m.reply('Done')).catch((err) => m.reply(jsonformat(err)))
} else {
m.reply(`Tag nomor atau reply pesan\nContoh: ${prefix}${command} @orangnya`) 
}
} else {
m.reply("Tunggu beberapa detik lagi")
}

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break*/



//case 'add':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

//if (!m.isGroup) return m.reply(mess.group)
/*if (!isCreator) return m.reply("_Only for Owner_")*/
/*if (!isBotAdmins) return m.reply(mess.botAdmin)
if (!isAdmins) return m.reply(mess.admin)
if (new Date() * 1 - kickadd.time > 20000) {
kickadd.time = new Date() * 1
fs.writeFileSync('./kick.json', JSON.stringify(kickadd))
if (text) {
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await conn.groupParticipantsUpdate(m.chat, [users], 'add').then((res) => m.reply('Done')).catch((err) => m.reply(jsonformat(err)))
} else if(quoted) {
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await conn.groupParticipantsUpdate(m.chat, [users], 'add').then((res) => m.reply('Done')).catch((err) => m.reply(jsonformat(err)))
} else {
m.reply(`Tag nomor atau reply pesan\nContoh: ${prefix}${command} @orangnya`) 
}
} else {
m.reply("Tunggu beberapa detik lagi")
}

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break
*/



/*case 'promote':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

if (!m.isGroup) return m.reply(mess.group)*/
/*if (!isCreator) return m.reply("_Only for Owner_")*/
/*if (!isBotAdmins) return m.reply(mess.botAdmin)
if (!isAdmins) return m.reply(mess.admin)
if (text) { 
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await conn.groupParticipantsUpdate(m.chat, [users], 'promote').then((res) => m.reply('Done')).catch((err) => m.reply(jsonformat(err)))
} else if(quoted) {
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await conn.groupParticipantsUpdate(m.chat, [users], 'promote').then((res) => m.reply('Done')).catch((err) => m.reply(jsonformat(err)))
} else {
m.reply(`Tag nomor atau reply pesan\nContoh: ${prefix}${command} @orangnya`)
}

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break*/



/*case 'demote':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

if (!m.isGroup) return m.reply(mess.group)*/
/*if (!isCreator) return m.reply("_Only for Owner_")*/
/*if (!isBotAdmins) return m.reply(mess.botAdmin)
if (!isAdmins) return m.reply(mess.admin)
if (text) { 
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await conn.groupParticipantsUpdate(m.chat, [users], 'demote').then((res) => m.reply('Done')).catch((err) => m.reply(jsonformat(err)))
} else if(quoted) {
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await conn.groupParticipantsUpdate(m.chat, [users], 'demote').then((res) => m.reply('Done')).catch((err) => m.reply(jsonformat(err)))
} else {
m.reply(`Tag nomor atau reply pesan\nContoh: ${prefix}${command} @orangnya`)
}

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break*/



/*case 'block':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

if (!isCreator) return m.reply(mess.owner)
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await conn.updateBlockStatus(users, 'block').then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break*/



case 'unblock23':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

if (!isCreator) return m.reply(mess.owner)
await conn.updateBlockStatus(`${text}@s.whatsapp.net`, 'unblock').then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break



/*case 'unblock':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

if (!isCreator) return m.reply(mess.owner)
if(quoted) {
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await conn.updateBlockStatus(users, 'unblock').then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
} else if(text) {
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await conn.updateBlockStatus(users, 'unblock').then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
} else {
m.reply("Reply pesan atau masukkan nomor")
}

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break*/



/*case 'setname': case 'setsubject':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

if (!m.isGroup) return m.reply(mess.group)
if (!isBotAdmins) return m.reply(mess.botAdmin)
if (!isAdmins) return m.reply(mess.admin)
if(text.length < 1) return m.reply('Text ?')
await conn.groupUpdateSubject(m.chat, text).then((res) => m.reply(mess.success)).catch((err) => m.reply(jsonformat(err)))

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break



case 'setnam': case 'setsub':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

if (!m.isGroup) return m.reply(mess.group)
if (!isBotAdmins) return m.reply(mess.botAdmin)
if (!isAdmins) return m.reply(mess.admin)
if(text.length < 1) return m.reply('Text ?')
await conn.groupUpdateSubject(`${text}`, text).then((res) => m.reply(mess.success)).catch((err) => m.reply(jsonformat(err)))

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break



case 'setdesc': case 'setdesk':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

if (!m.isGroup) return m.reply(mess.group)
if (!isBotAdmins) return m.reply(mess.botAdmin)
if (!isAdmins) return m.reply(mess.admin)
if(text.length < 1) return m.reply('Text ?')
await conn.groupUpdateDescription(m.chat, text).then((res) => m.reply(mess.success)).catch((err) => m.reply(jsonformat(err)))

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break



case 'setppbot':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

if (!isCreator) return m.reply(mess.owner)
if (!quoted) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
if (!/image/.test((quoted.msg || quoted).mimetype || '')) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
if (/webp/.test((quoted.msg || quoted).mimetype || '')) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
let media = await conn.downloadAndSaveMediaMessage(quoted)
await conn.updateProfilePicture(botNumber, { url: media }).catch((err) => fs.unlinkSync(media))
m.reply(mess.success)

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break

*/


case 'setpp':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)


if(!isCreator) return m.reply("Khusus Owner")
if(m.isGroup) return m.reply("Hanya bisa di private chat")
if (!/image/.test((quoted.msg || quoted).mimetype || '')) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)

let media = await conn.downloadAndSaveMediaMessage(quoted)
var { img} = await require('./lib/myfunc'). generateProfilePicture(media)
conn.query({
tag: 'iq',
attrs: {
target: undefined,
to: WABinary_1.S_WHATSAPP_NET,
type: 'set',
xmlns: 'w:profile:picture'
},
content: [
{
tag: 'picture',
attrs: { type: 'image' },
content: img
}
]
});
} 
//global_users[m.sender].limit -= 1 
//fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))

break

case 'setppg':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

if (!isAdmins) return m.reply(mess.admin)
if(!isCreator) return m.reply("Khusus Owner")
if(!m.isGroup) return m.reply("Hanya bisa di group chat")
if (!/image/.test((quoted.msg || quoted).mimetype || '')) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)

let media = await conn.downloadAndSaveMediaMessage(quoted)
var { img } = await require('./lib/myfunc'). generateProfilePicture(media)
conn.query({
tag: 'iq',
attrs: {
target: m.chat,
to: WABinary_1.S_WHATSAPP_NET,
type: 'set',
xmlns: 'w:profile:picture'
},
content: [
{
tag: 'picture',
attrs: { type: 'image' },
content: img
}
]
});
} 
//global_users[m.sender].limit -= 1 
//fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))

break



case 'setppgrouup': case 'setppgrup': case 'setppgc':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

if (!m.isGroup) return m.reply(mess.group)
if (!isAdmins) return m.reply(mess.admin)
if (!quoted) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
if (!/image/.test((quoted.msg || quoted).mimetype || '')) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
if (/webp/.test((quoted.msg || quoted).mimetype || '')) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
let media = await conn.downloadAndSaveMediaMessage(quoted)
await conn.updateProfilePicture(m.chat, { url: media }).catch((err) => fs.unlinkSync(media))
m.reply('yo')

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break



case 'tagall':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

if (!m.isGroup) return m.reply(mess.group)
if (!isAdmins && !isCreator) return m.reply(mess.admin)
let teks = `*Pesan :* ${q ? q : 'Tidak ada'}\n\n`
for (let mem of participants) {
teks += `@${mem.id.split('@')[0]} \n`
}
conn.sendMessage(m.chat, { text: teks, mentions: participants.map(a => a.id) }, { quoted: m })

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break



case 'hidetag':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

if (!m.isGroup) return m.reply(mess.group)
if (!isAdmins && !isCreator) return m.reply(mess.admin)
textag = args.join(" ")
conn.sendMessage(m.chat, { text : textag ? textag : 'undefined' , mentions: participants.map(a => a.id)}, { quoted: m })

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break



case 'style': case 'styletext':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

/*if (!isPremium && global.db.data.users[m.sender].limit < 1) return m.reply(mess.endLimit) // respon ketika limit habis
db.users[m.sender].limit -= 1 // -1 limit*/
let { styletext } = require('./lib/scraper')
if(text.length < 1) return m.reply(`*Masukkan text*\n*Contoh :* ${prefix+command} Textnya`)
let anu = await styletext(text)
let teks = `Style Text From ${text}\n\n`
for (let i of anu) {
teks += `*${i.name}* : ${i.result}\n`
}
m.reply(teks)

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break


/*case 'group': case 'grup':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

if (!m.isGroup) return m.reply(mess.group)
if (!isBotAdmins) return m.reply(mess.botAdmin)
if (!isAdmins) return m.reply(mess.admin)
if (args[0] === 'close'){
await conn.groupSettingUpdate(m.chat, 'announcement').then((res) => m.reply(`Sukses Menutup Group`)).catch((err) => m.reply(jsonformat(err)))
} else if (args[0] === 'open'){
await conn.groupSettingUpdate(m.chat, 'not_announcement').then((res) => m.reply(`Sukses Membuka Group`)).catch((err) => m.reply(jsonformat(err)))
} else {
let buttons = [
{ buttonId: 'group open', buttonText: { displayText: 'Open' }, type: 1 },
{ buttonId: 'group close', buttonText: { displayText: 'Close' }, type: 1 }
]
await conn.sendButtonText(m.chat, buttons, `Mode Group`, conn.user.name, m)

}

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break*/



/*case 'editinfo':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

if (!m.isGroup) return m.reply(mess.group)
if (!isBotAdmins) return m.reply(mess.botAdmin)
if (!isAdmins) return m.reply(mess.admin)
if (args[0] === 'open'){
await conn.groupSettingUpdate(m.chat, 'unlocked').then((res) => m.reply(`Sukses Membuka Edit Info Group`)).catch((err) => m.reply(jsonformat(err)))
} else if (args[0] === 'close'){
await conn.groupSettingUpdate(m.chat, 'locked').then((res) => m.reply(`Sukses Menutup Edit Info Group`)).catch((err) => m.reply(jsonformat(err)))
} else {
let buttons = [
{ buttonId: 'editinfo open', buttonText: { displayText: 'Open' }, type: 1 },
{ buttonId: 'editinfo close', buttonText: { displayText: 'Close' }, type: 1 }
]
await conn.sendButtonText(m.chat, buttons, `Mode Edit Info`, conn.user.name, m)

}

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break*/

case 'linkgroup': case 'linkgc':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

if (!m.isGroup) return m.reply(mess.group)
if (!isBotAdmins) return m.reply(mess.botAdmin)
let response = await conn.groupInviteCode(m.chat)
conn.sendText(m.chat, `*Link to Join*\nhttps://chat.whatsapp.com/${response}\n\nLink Group\n*${groupMetadata.subject.replace(/[\n]/g, ' ')}*`, m, { detectLink: true })

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break



case 'ephemeral':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

if (!m.isGroup) return m.reply(mess.group)
if (!isBotAdmins) return m.reply(mess.botAdmin)
if (!isAdmins) return m.reply(mess.admin)
if(text.length < 1) return m.reply('Masukkan value enable/disable')
if (args[0] === 'enable') {
await conn.sendMessage(m.chat, { disappearingMessagesInChat: WA_DEFAULT_EPHEMERAL }).then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
} else if (args[0] === 'disable') {
await conn.sendMessage(m.chat, { disappearingMessagesInChat: false }).then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
}

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break



/*case 'delete': case 'del':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

if (!isAdmins) return m.reply(mess.admin)
if (!m.quoted) return m.reply('false')
let { chat, fromMe, id, isBaileys } = m.quoted
if (!isBaileys) return m.reply('Pesan tersebut bukan dikirim oleh bot!')
conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: true, id: m.quoted.id, participant: m.quoted.sender } })

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break*/



case 'bug':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

if (!isCreator) return m.reply(mess.owner)
let ioi = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
(async () => {
var fur = await generateWAMessageFromContent(m.chat, proto.Message.fromObject({
"requestPaymentMessage": {
"text": "en990"
}
}),{quoted : null})
conn.relayMessage(ioi, fur.message, {messageId: fur.key.id})
}
)()

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break



/*case 'bcgc': case 'bcgroup':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

if (!isCreator) return m.reply(mess.owner)
if(text.length < 1) return m.reply(`Text mana?\n\nContoh : ${prefix + command} fatih-san`)
let getGroups = await conn.groupFetchAllParticipating()
let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
let anu = groups.map(v => v.id)
m.reply(`Mengirim Broadcast Ke ${anu.length} Group Chat, Waktu Selesai ${anu.length * 3} detik`)
for (let i of anu) {
await sleep(3000)
let btn = [{
callButton: {
displayText: 'Phone',
phoneNumber: '+62 8123-3264-6925'
}
}, {
urlButton: {
displayText: 'Instagram',
url: 'https://instagram.com/username'
}
}, {
quickReplyButton: {
displayText: 'Owner',
id: 'owner'
}
}, {
quickReplyButton: {
displayText: 'Menu',
id: 'menu'
}
}]
let txt = `Broadcast by Owner\n\n${text}`
conn.sendButImg(i, txt, global.wm, fs.readFileSync('./image/pem.jpg'), btn)
}
m.reply(`Sukses Mengirim Broadcast Ke ${anu.length} Group`)

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break



case 'bc':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

if (!isCreator) return m.reply(mess.owner)
m.reply(`${coomd.length * 3} detik`)
for (let i of coomd) {
await sleep(3000)
let btn = [{
callButton: {
displayText: 'Phone',
phoneNumber: '+62 8123-3264-6925'
}
}, {
urlButton: {
displayText: 'Instagram',
url: 'https://instagram.com/username'
}
}, {
quickReplyButton: {
displayText: 'Owner',
id: 'owner'
}
}, {
quickReplyButton: {
displayText: 'Menu',
id: 'menu'
}
}]
let txt = `Broadcast Owner Bot\n\n${text}\n`
conn.sendButImg(i, txt, global.wm, fs.readFileSync('./image/pem.jpg'), btn)
}
m.reply('succes')

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break
*/


case 'totag':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

if (!m.isGroup) return m.reply(mess.group)
if (!isBotAdmins) return m.reply(mess.botAdmin)
if (!isAdmins) return m.reply(mess.admin)
if (quoted.mtype == 'conversation') {
conn.sendMessage(m.chat, { text : quoted.text , mentions: participants.map(a => a.id), contextInfo: { forwardingScore: 5, isForwarded: true } }, { quoted: m })
} else {
let _msg = JSON.parse(JSON.stringify(quoted.fakeObj.message))
if (typeof _msg[quoted.mtype].contextInfo !== 'object') _msg[quoted.mtype].contextInfo = {}
if (typeof _msg[quoted.mtype].contextInfo.mentionedJid !== 'array') _msg[quoted.mtype].contextInfo.mentionedJid = participants.map(a => a.id)
let _pesan = quoted.fakeObj
_pesan.message = _msg
conn.copyNForward(m.chat, _pesan, true)
}

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break

/*
case 's':
case 'stiker':
case 'sticker':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)


function addMetadata(packname, author) {
if (!packname) packname = "herro"; if (!author) author = global.wm;	
author = author.replace(/[^a-zA-Z0-9]/g, '');	
let name = `${author}_${packname}`
if (fs.existsSync(`./${name}.exif`)) return `./${name}.exif`
const json = {	
"sticker-pack-name": packname,
"sticker-pack-publisher": author,
}
const littleEndian = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00])	
const bytes = [0x00, 0x00, 0x16, 0x00, 0x00, 0x00]	

let len = JSON.stringify(json).length	
let last	

if (len > 256) {	
len = len - 256	
bytes.unshift(0x01)	
} else {	
bytes.unshift(0x00)	
}	

if (len < 16) {	
last = len.toString(16)	
last = "0" + len	
} else {	
last = len.toString(16)	
}	

const buf2 = Buffer.from(last, "hex")	
const buf3 = Buffer.from(bytes)	
const buf4 = Buffer.from(JSON.stringify(json))	

const buffer = Buffer.concat([littleEndian, buf2, buf3, buf4])	

fs.writeFile(`./${name}.exif`, buffer, (err) => {	
return `./${name}.exif`	
})	

}


if (!quoted) return m.reply(`Balas Video/Image Dengan Caption ${prefix + command}`)
if (/image/.test((quoted.msg || quoted).mimetype || '')) {
const media = await conn.downloadAndSaveMediaMessage(quoted)
var gh = args.join(" ")
var perwira = gh.split("/")[0];
var ganz = gh.split("/")[1];
let ran = getRandom('.webp')
await ffmpeg(`./${media}`)
.input(media)
.on('start', function (cmd) {
console.log(`Started : ${cmd}`)
})
.on('error', function (err) {
console.log(`Error : ${err}`)
fs.unlinkSync(media)
m.reply(ind.stikga)
})
.on('end', function () {
console.log('Finish')
exec(`webpmux -set exif ${addMetadata(namo, ator)} ${ran} -o ${ran}`, async (error) => {

conn.sendMessage(m.chat, {sticker: fs.readFileSync(ran)})
fs.unlinkSync(media)	
fs.unlinkSync(ran)	
})
})
.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=30, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
.toFormat('webp')
.save(ran)
} else if (/video/.test((quoted.msg || quoted).mimetype || '')) {
let media = await conn.downloadAndSaveMediaMessage(quoted)
let ran = getRandom('.webp')

await ffmpeg(`./${media}`)
.inputFormat(media.split('.')[1])
.on('start', function (cmd) {
console.log(`Started : ${cmd}`)
})
.on('error', function (err) {
console.log(`Error : ${err}`)
fs.unlinkSync(media)
let tipe = media.endsWith('.mp4') ? 'video' : 'gif'
m.reply(`Gagal, pada saat mengkonversi ${tipe} ke stiker`)
})
.on('end', function () {
console.log('Finish')
exec(`webpmux -set exif ${addMetadata(namo, ator)} ${ran} -o ${ran}`, async (error) => {

conn.sendMessage(m.chat, {sticker: fs.readFileSync(ran)})
fs.unlinkSync(media)
fs.unlinkSync(ran)
})
})
.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
.toFormat('webp')
.save(ran)
} else {
m.reply(`Kirim gambar dengan caption${prefix}sticker atau tag gambar yang sudah dikirim`)
}

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break*/

case 'sticker': case 's': case 'stickergif': case 'sgif': {
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)
           // m.reply(mess.wait)
                 if (/image/.test((quoted.msg || quoted).mimetype || '')) {
                let media = await quoted.download()
                let encmedia = await conn.sendImageAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
                await fs.unlinkSync(encmedia)
                ////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
            } else if (/video/.test((quoted.msg || quoted).mimetype || '')) {
                if ((quoted.msg || quoted).seconds > 11) return m.reply('Maksimal 10 detik!')
                let media = await quoted.download()
                let encmedia = await conn.sendVideoAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
                await fs.unlinkSync(encmedia)
                ////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
            } else {
            	m.reply(`Balas Video/Image Dengan Caption ${prefix + command}`)
            	}

}

break

/*case 'sticker': case 'stiker': case 's': case 'stickergif': case 'sgif': {
//wm = args.join(" ")

if (!quoted) return m.reply(`Balas Video/Image Dengan Caption ${prefix + command}`)
if (/image/.test((quoted.msg || quoted).mimetype || '')) {
//let media = await quoted.download()

let { webp } = require('./lib/uploader')
let way = "dat.png"
let med = await conn.downloadAndSaveMediaMessage(quoted, "hi")
let imig = await require('./lib/myfunc'). imga(med)
await fs.writeFileSync(way, imig.img)
let wedat = await webp(way)
let kyu = await conn.sendMessage(m.chat, {sticker: {url: wedat.result}})

//let encmedia = await conn.sendImageAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })

await fs.unlinkSync(way)
await fs.unlinkSync(med)
} else {
return m.reply(`Kirim Gambar Dengan Caption ${prefix + command}\nDurasi Video 1-9 Detik`)
}
}
break*/


case 'c':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

wm = args.join(" ")
wm1 = "©Darkbot-Md" /*wm.split("/")[0]*/
wm2 = "Sticker Maker" /*wm.split("/")[1]*/
kat = text.replace(/[^0-9]/g, '')
if (!quoted) return m.reply(`Balas Video/Image Dengan Caption ${prefix + command}`)
if (/image/.test((quoted.msg || quoted).mimetype || '')) {
fh = []
for(let f = 0;f < kat;f++) {
fh.push("🔥💥♨️")
}
let media = await quoted.download()
let encmedia = await conn.sendStickerBug(m.chat, media, m, { packname: wm1 ? wm1: global.packname, author: wm2 ? wm2: global.author, categories: fh })
await fs.unlinkSync(encmedia)
} else if (/video/.test((quoted.msg || quoted).mimetype || '')) {
if ((m.msg || quoted).seconds > 11) return m.reply('Maksimal 10 detik!')
let media = await quoted.download()
let encmedia = await conn.sendVideoAsSticker(m.chat, media, m, { packname: wm1 ? wm1: global.packname, author: wm2 ? wm2: global.author })
await fs.unlinkSync(encmedia)
} else {
return m.reply(`Kirim Gambar/Video Dengan Caption ${prefix + command}\nDurasi Video 1-9 Detik`)
}

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break


/*case 'emojimix':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

try {
if (!text.includes("+")) return m.reply(`Contoh : ${prefix + command} 😅+🤔`)
let [emoji1, emoji2] = text.split`+`
let anu = await fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`)
for (let res of anu.results) {
let encmedia = await conn.sendImageAsSticker(m.chat, res.url, m, { packname: global.packname, author: global.author, categories: res.tags })
await fs.unlinkSync(encmedia)
}
} catch(err) {
m.reply("Masukkan emoji yang jelas!")
}

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break*/



/*case 'toimage': case 'toimg':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

if (!quoted) return m.reply('Reply Image')
if (!/webp/.test((quoted.msg || quoted).mimetype || '')) return m.reply(`balas stiker dengan caption *${prefix + command}*`)
let media = await conn.downloadAndSaveMediaMessage(quoted)
let ran = await getRandom('.png')
exec(`ffmpeg -i ${media} ${ran}`, (err) => {
fs.unlinkSync(media)
if (err) return m.reply(err)
let buffer = fs.readFileSync(ran)
conn.sendMessage(m.chat, { image: buffer }, { quoted: m })
fs.unlinkSync(ran)
})

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break
*/


case 'triggered':
case 'trigger':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

if (!quoted) return m.reply('Reply Image')
if (!/image/.test((quoted.msg || quoted).mimetype || '')) return m.reply(`Balas gambar dengan caption *${prefix + command}*`)
let media = await conn.downloadAndSaveMediaMessage2(quoted, 'trigger.jpg')
yuricanvas = require("yuri-canvas");
async function create() {
let img = await yuricanvas.trigger('trigger.jpg');
yuricanvas.write(img, "trigger.jpg");
conn.sendImageAsSticker(m.chat, fs.readFileSync(`./trigger.jpg`), m, {packname: 'Sticker', author: global.wm})
}
create().then(() => {
(async () => {
await fs.unlinkSync('trigger.jpg')
})()
});

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break



case 'template':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

if(text.length < 1) return m.reply(`*Contoh :* ${prefix+command} gay(reply gambar)

*List Type Template*
gay
jail
wanted
wasted
trash
burn
scary`)
if (!quoted) return m.reply('Reply Image')
if (!/image/.test((quoted.msg || quoted).mimetype || '')) return m.reply(`Balas gambar dengan caption *${prefix + command}*`)
if(args[0] === 'burn') {
haha = async () => {
var knights = require('./lib/knights-canvas')
let media = await conn.downloadAndSaveMediaMessage2(quoted, 'sponge.jpg')
var pathh = 'ouit.png'
var image = await new knights.Burn().setAvatar('sponge.jpg').toAttachment();
let data = await image.toBuffer();
await fs.writeFileSync(pathh, data)
await conn.sendMessage(m.chat, {image: {url: pathh}, caption: 'Done'}, {quoted: m})
await fs.unlinkSync('sponge.jpg')
await fs.unlinkSync(pathh)
}
haha();
} else if(args[0] === 'gay') {
let media = await conn.downloadAndSaveMediaMessage2(quoted, 'gay.jpg')
async function create() {
yuricanvas = require("yuri-canvas");
let img = await yuricanvas.gay('gay.jpg');
yuricanvas.write(img, "jadigay.jpg");
conn.sendImage(m.chat, fs.readFileSync(`./jadigay.jpg`), 'Done', m)
}
create().then(() => {
(async () => {
await fs.unlinkSync('gay.jpg')
await fs.unlinkSync('jadigay.jpg')
})()
});
} else if(args[0] === 'jail') {
let media = await conn.downloadAndSaveMediaMessage2(quoted, 'jail.jpg')
async function create() {
yuricanvas = require("yuri-canvas");
let img = await yuricanvas.jail('jail.jpg');
yuricanvas.write(img, "jadijail.jpg");
conn.sendImage(m.chat, fs.readFileSync(`./jadijail.jpg`), 'Done', m)
}
create().then(() => {
(async () => {
await fs.unlinkSync('jadijail.jpg')
await fs.unlinkSync('jail.jpg')
})()
});
} else if(args[0] === 'wanted') {
let media = await conn.downloadAndSaveMediaMessage2(quoted, 'wanted.jpg')
async function create() {
yuricanvas = require("yuri-canvas");
let img = await yuricanvas.wanted('wanted.jpg');
yuricanvas.write(img, "jadiwanted.jpg");
conn.sendImage(m.chat, fs.readFileSync(`./jadiwanted.jpg`), 'Done', m)
}
create().then(() => {
(async () => {
await fs.unlinkSync('jadiwanted.jpg')
await fs.unlinkSync('wanted.jpg')
})()
});
} else if(args[0] === 'trash') {
let media = await conn.downloadAndSaveMediaMessage2(quoted, 'trash.jpg')
async function create() {
yuricanvas = require("yuri-canvas");
let img = await yuricanvas.trash('trash.jpg');
yuricanvas.write(img, "jaditrash.jpg");
conn.sendImage(m.chat, fs.readFileSync(`./jaditrash.jpg`), 'Done', m)
}
create().then(() => {
(async () => {
await fs.unlinkSync('trash.jpg')
await fs.unlinkSync('jaditrash.jpg')
})()
});
} else if(args[0] === 'scary') {
let media = await conn.downloadAndSaveMediaMessage2(quoted, 'scae.jpg')
hacker = async () => {
var pathh = 'out.png'
var knights = require("./lib/knights-canvas")
var image = await new knights.Patrick()
.setAvatar(media)
.toAttachment();
data = image.toBuffer();
await fs.writeFileSync(pathh, data)
conn.sendMessage(m.chat, {image: {url: pathh}}, {quoted: m})
}
hacker().then(() => {
(async () => {
await fs.unlinkSync(pathh)
})()
})
} else if(args[0] === 'wasted') {
let media = await conn.downloadAndSaveMediaMessage2(quoted, 'wasted.jpg')
async function create() {
yuricanvas = require("yuri-canvas");
let img = await yuricanvas.wasted('wasted.jpg');
yuricanvas.write(img, "jadiwasted.jpg");
conn.sendImage(m.chat, fs.readFileSync(`./jadiwasted.jpg`), 'Done', m)
}
create().then(() => {
(async () => {
await fs.unlinkSync('jadiwasted.jpg')
await fs.unlinkSync('wasted.jpg')
})()
});
} else { m.reply(`Maaf ${args[0]} tidak ada di Type Template
*Contoh :* ${prefix+command} gay(reply gambar)

*List Type Template*
gay
jail
wanted
wasted
trash
burn
scary`) }

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break






case 'tomp4': case 'tovideo':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

if (!quoted) return m.reply('Reply sticker animated')
if (!/webp/.test((quoted.msg || quoted).mimetype || '')) return m.reply(`balas stiker dengan caption *${prefix + command}*`)

let { webp2mp4File } = require('./lib/uploader')
let media = await conn.downloadAndSaveMediaMessage(quoted)
let webpToMp4 = await webp2mp4File(media)
await conn.sendMessage(m.chat, { video: { url: webpToMp4.result, caption: 'Convert Webp To Video' } }, { quoted: m })
await fs.unlinkSync(media)

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break



/*case 'toaud': case 'toaudio':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

if (!/video/.test((quoted.msg || quoted).mimetype || '') && !/audio/.test((quoted.msg || quoted).mimetype || '')) return m.reply(`Kirim/Reply Video/Audio Yang Ingin Dijadikan Audio Dengan Caption ${prefix + command}`)
if (!quoted) return m.reply(`Kirim/Reply Video/Audio Yang Ingin Dijadikan Audio Dengan Caption ${prefix + command}`)

let media = await quoted.download()
let { toAudio } = require('./lib/converter')
let audio = await toAudio(media, 'mp4')
conn.sendMessage(m.chat, {audio: audio, mimetype: 'audio/mpeg'}, { quoted : m })

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break



case 'tomp3':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

if (/document/.test((quoted.msg || quoted).mimetype || '')) return m.reply(`Kirim/Reply Video/Audio Yang Ingin Dijadikan MP3 Dengan Caption ${prefix + command}`)
if (!/video/.test((quoted.msg || quoted).mimetype || '') && !/audio/.test((quoted.msg || quoted).mimetype || '')) return m.reply(`Kirim/Reply Video/Audio Yang Ingin Dijadikan MP3 Dengan Caption ${prefix + command}`)
if (!quoted) return m.reply(`Kirim/Reply Video/Audio Yang Ingin Dijadikan MP3 Dengan Caption ${prefix + command}`)

let media = await quoted.download()
let { toAudio } = require('./lib/converter')
let audio = await toAudio(media, 'mp4')
conn.sendMessage(m.chat, {document: audio, mimetype: 'audio/mpeg', fileName: `Convert tomp3 ${new Date()}.mp3`}, { quoted : m })

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break



case 'tovn': case 'toptt':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

if (!/video/.test((quoted.msg || quoted).mimetype || '') && !/audio/.test((quoted.msg || quoted).mimetype || '')) return m.reply(`Reply Video/Audio Yang Ingin Dijadikan VN Dengan Caption ${prefix + command}`)
if (!quoted) return m.reply(`Reply Video/Audio Yang Ingin Dijadikan VN Dengan Caption ${prefix + command}`)

let media = await quoted.download()
let { toPTT } = require('./lib/converter')
let audio = await toPTT(media, 'mp4')
conn.sendMessage(m.chat, {audio: audio, mimetype:'audio/mpeg', ptt:true }, {quoted:m})

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break


*/
case 'togif':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

if (!quoted) return m.reply('Reply Image')
if (!/webp/.test((quoted.msg || quoted).mimetype || '')) return m.reply(`balas stiker dengan caption *${prefix + command}*`)

let { webp2mp4File } = require('./lib/uploader')
let media = await conn.downloadAndSaveMediaMessage(quoted)
let webpToMp4 = await webp2mp4File(media)
await conn.sendMessage(m.chat, { video: { url: webpToMp4.result, caption: 'Convert Webp To Video' }, gifPlayback: true }, { quoted: m })
await fs.unlinkSync(media)

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break



case 'tourl':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

if (!quoted) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
if (/webp/.test((quoted.msg || quoted).mimetype || '')) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
let { UploadFileUgu, webp2mp4File, TelegraPh } = require('./lib/uploader')
let media = await conn.downloadAndSaveMediaMessage(quoted)
if (/image/.test((quoted.msg || quoted).mimetype || '')) {
let anu = await TelegraPh(media)
m.reply(util.format(anu))
} else if (!/image/.test((quoted.msg || quoted).mimetype || '')) {
let anu = await UploadFileUgu(media)
m.reply(util.format(anu))
}
await fs.unlinkSync(media)

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break

case 'removebg':
case 'nobg':
case 'bg':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

if (!quoted) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
if (!/image/.test((quoted.msg || quoted).mimetype || '')) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
if (/webp/.test((quoted.msg || quoted).mimetype || '')) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
let { nobg } = require('./lib/nobg')
try {
localFile = await conn.downloadAndSaveMediaMessage(quoted)
datan = await nobg(localFile)
datani = datan.file
conn.sendMessage(m.chat, {image: {url: datani}, caption: "Remove Background"}, { quoted : m }).then(() => {
(async () => {
await fs.unlinkSync(localFile)
await fs.unlinkSync(datani)
})()
})
} catch(err) {
m.reply(String(err))
}

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break

case 'imagenobg2': case 'removebg2': case 'remove-bg2':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

try {
if(!isCreator) return
if (!quoted) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
if (!/image/.test((quoted.msg || quoted).mimetype || '')) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
if (/webp/.test((quoted.msg || quoted).mimetype || '')) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
let remobg = require('remove.bg')
let apirnobg = ['1oKkwvf7MmTyUz6Zr3UqMSfY']
let apinobg = apirnobg[Math.floor(Math.random() * apirnobg.length)]
hmm = await './src/remobg-'+getRandom('')
localFile = await conn.downloadAndSaveMediaMessage(quoted, hmm)
outputFile = await './src/hremo-'+getRandom('.png')

remobg.removeBackgroundFromImageFile({
path: localFile,
apiKey: apinobg,
size: "regular",
type: "auto",
scale: "100%",
outputFile 
}).then(async result => {
conn.sendMessage(m.chat, {image: fs.readFileSync(outputFile), caption: mess.success}, { quoted : m })
await fs.unlinkSync(localFile)
await fs.unlinkSync(outputFile)
})
} catch(err) {
m.reply(err)
}

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break


case 'google':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

if(text.length < 1) return m.reply(`Contoh : ${prefix + command} fatih arridho`)
let google = require('google-it')
google({'query': text}).then(res => {
let teks = `Google Search From : ${text}\n\n`
for (let g of res) {
teks += `*Title* : ${g.title}\n`
teks += `*Description* : ${g.snippet}\n`
teks += `*Link* : ${g.link}\n\n────────────────────────\n\n`
} 
m.reply(teks)
})

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break


case 'gimage':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

if(text.length < 1) return m.reply(`Contoh : ${prefix + command} kaori cicak`)
let gis = require('g-i-s')
gis(text, async (error, result) => {
let n = result
let images = n[Math.floor(Math.random() * n.length)].url
let buttons = [
{buttonId: `gimage ${text}`, buttonText: {displayText: 'Next Image'}, type: 1}
]
let buttonMessage = {
image: { url: images },
caption: `*Google Image*`,
footer: conn.user.name,
buttons: buttons,
headerType: 4
}
conn.sendMessage(m.chat, buttonMessage, { quoted: m })
})

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break




case 'tsticker':
case 'telesticker': 
case 'tstiker':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

try {
if (m.isGroup) return m.reply("Tidak bisa digunakan di group")
if(text.length < 1) return m.reply(`Contoh: ${prefix+command} https://t.me/addstickers/geestickerpack`)
if (!text.includes('t.me')) return m.reply('Bukan link telegram stiker')
let { Tstick } = require('./lib/scraper')
var telestc = await Tstick(`${q}`).catch(err => m.reply(`*Error*\n${util.format(err)}`))
for (let unduh of telestc) {
conn.sendMessage(m.chat, {sticker: await getBuffer(unduh.url), mimetype:'image/webp'},{quoted: m}).catch(err => m.reply(`*Error*\n${util.format(err)}`))
}
} catch(e) {
m.reply(String(e))
}

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break


case 'play': case 'ytplay':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

return
if(text.length < 1) return m.reply(`Contoh : ${prefix + command} perfect ed-sheeran`)
try {
let { yts } = require("./lib/yts")
let { youtubeAudio } = require('./lib/y2mate')
let search = await yts(text)
let aramat = search.all
let _s = await yts(text)
let no_ = 1
let _no = 1
let is_ = []
let _is = []
/*for (let isu of _s.video) {
is_.push({
"title": `${no_++}.${isu.title}`,
"description": `•Channel : ${isu.authorName} ${isu.viewH}\n•Duration : ${isu.duration} •Upload : ${isu.publishedTime}`,
"rowId": `ytdl ${isu.url}`
})
}*/

/*let listMessage = {
text: 'Hasil penelusuran',
footer: global.wm,
title: `Yt-Search`,
buttonText: "Video yang ditemukan",
sections: [{
"title": `Hasil penelusuran yang ditemukan`,
"rows": is_}]
}*/

let res = await youtubeAudio(`${search.video[0].url}`)
//let get_img = await getBuffer(res.thumb)
//if (res.filesize >= 10000) return m.reply('File Melebihi Batas, maximal 10 mb')
let y = await conn.sendMessage(m.chat, { document: { url: res.data.dlink}, mimetype: 'audio/mpeg', fileName: `${res.title}.mp3`})//.catch((e) => m.reply(String(e))).then(() => {
/*conn.sendMessage(m.chat, listMessage, {quoted: 
{
key: { fromMe: false, participant: `${quoted.sender}`},
message: {
"extendedTextMessage": {
"text": `*YouTube Sea rch*`,
"title": ``,
'jpegThumbnail': fs.readFileSync('./image/yt.png')
}} 
}, contextInfo: {mentionedJid: [quoted.sender]}})*/
/*})*/
} catch(e) {
	m.reply(String(e))
	}
//await m.reply(`Server 1 error mencoba server 2\n${String(e)}`)
/*try {
let { yts } = require("./lib/yts")
let no_ = 1
let search = await yts(text)
let is_ = []
let _s = await yts(text)
let gat = require("@bochilteam/scraper")
let yai = await gat.youtubedlv2(`${search.video[0].url}`)

for (let isu of _s.video) {
is_.push({
"title": `${no_++}.${isu.title}`,
"description": `•Channel : ${isu.authorName} ${isu.viewH}\n•Duration : ${isu.duration} •Upload : ${isu.publishedTime}`,
"rowId": `ytdl ${isu.url}`
})
}

let listMessage = {
text: 'Hasil penelusuran',
footer: global.wm,
title: `Yt-Search`,
buttonText: "Video yang ditemukan",
sections: [{
"title": `Hasil penelusuran yang ditemukan`,
"rows": is_}]
}

let get_img = await getBuffer(yai.thumbnail)
let limk = await yai.audio['128kbps'].download()
if(yai.audio['128kbps'].fileSize > 10000) return m.reply(`Ukuran melebihi batas maximal 10 MB\n\n*Link download*\n${limk}`)
//m.reply(limk)
let y = conn.sendMessage(m.chat, { document: {url: limk}, mimetype: 'audio/mpeg', fileName: `${yai.title}.mp3`,contextInfo: {externalAdReply: {title: `${yai.title}`, body: "©Darkbot-Md Bot WhatsApp (V2)", mediaUrl: `${search.video[0].url}`, sourceUrl: `${search.video[0].url}`, mediaType: 2, showAdAttribution: true, thumbnail: get_img}}}, {}).catch((e) => m.reply(String(e))).then(() => {

conn.sendMessage(m.chat, listMessage, {quoted: 
{
key: { fromMe: false, participant: `${quoted.sender}`},
message: {
"extendedTextMessage": {
"text": `*YouTube Search*`,
"title": ``,
'jpegThumbnail': fs.readFileSync('./image/yt.png')
}} 
}, contextInfo: {mentionedJid: [quoted.sender]}})

})
} catch(err) {
m.reply("Semua server error" + String(err))
}
}*/

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break


//////////////////// DOWNLOADER ///////////////

case 'ttmp3':{
	return 
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

	if(!text.includes("tiktok.com")) return m.reply("masukkan linknya")
	let { savefrom } = require("@bochilteam/scraper");
	let data_download = await savefrom(text);
	await conn.sendMessage(m.chat, {document: {url: data_download.url[1].url}, fileName: `${pushname} tiktok audio ${new Date() * 1}.mp3`, mimetype: 'audio/mpeg'}, {quoted: m})
	
////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break

case 'ttdl':
case 'tiktok':{
	return 
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

	if(!text.includes("tiktok.com")) return m.reply("masukkan linknya")
	let { savefrom } = require("@bochilteam/scraper");
	let data_download = await savefrom(text);
	//await conn.sendMessage(m.chat, {document: {url: data_download.url[0].url}, fileName: `${pushname} tiktok ${new Date() * 1}.mp4`, mimetype: 'video/mp4'}, {quoted: m})
	let messk = await conn.sendMessage(m.chat, {video: {url: data_download.url[0].url}, caption: '*Download success :D*'}, {quoted: m})
	
////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break

case 'fb':
case 'fbdl':{
	return 
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

	if(!text.includes("facebook")) return m.reply("masukkan linknya")
	let { savefrom } = require("@bochilteam/scraper");
	let data_download = await savefrom(text);
	let mesk = await conn.sendMessage(m.chat, {video: {url: data_download.url[0].url}, caption: '*Download success :D*'}, {quoted: m})
	//await conn.sendMessage(m.chat, {document: {url: data_download.url[0].url}, fileName: `${pushname} facebook ${new Date() * 1}.mp4`, mimetype: 'video/mp4'}, {quoted: m})
	
////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break

case 'ig':
case 'igdl':{
	return 
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

	if(!text.includes("instagram.com")) return m.reply("masukkan linknya")
	let { savefrom } = require("@bochilteam/scraper");
	let data_download = await savefrom(text);
	let messk = await conn.sendMessage(m.chat, {video: {url: data_download.url[0].url}, caption: '*Download success :D*'}, {quoted: m})
	//await conn.sendMessage(m.chat, {document: {url: data_download.url[0].url}, fileName: `${pushname} instagram ${new Date() * 1}.mp4`, mimetype: 'video/mp4'}, {quoted: m})
	
////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break

case 'ytmp3': 
case 'ytaudio':{
	return 
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

try {
if(text.includes("youtu")) {
let { youtubeAudio } = require('./lib/y2mate')
if(text.length < 1) return m.reply(`Contoh : ${prefix + command} https://youtube.com/watch?v=PtFMh6Tccag%27 360p`)
/*let quality = args[1] ? args[1] : '360p'*/
await youtubeAudio(text, 'audio').then(async res => {
//let ythumb = await getBuffer(`https://i.ytimg.com/vi/${text/0.jpg`)
if (res.filesize >= 20000) return m.reply('File Melebihi Batas, maximal 10mb')
let p = await conn.sendMessage(m.chat, { document: { url: res.data.dlink }, mimetype: 'audio/mpeg', fileName: `${res.title}.mp3`,contextInfo: {externalAdReply: {title: `${res.title}`, body: "©Darkbot-Md Bot WhatsApp", mediaUrl: text, sourceUrl: text, mediaType: 2, showAdAttribution: true, thumbnail: fs.readFileSync("nam.jpg")}}}, {}).catch((e) => m.reply(String(e)))
})
} else {
m.reply(`Masukkan link YouTube.\n*Contoh :* ${prefix+command} https://youtu.be/FIeUzNdApMA`)
}
} catch(e) {
try {

let { yta } = require('./lib/y2mate')
await yta(text).then(async res => {
let ythumb = await getBuffer(res.thumb)
if (res.filesize >= 20000) return m.reply('File Melebihi Batas, maximal 10mb')
await conn.sendMessage(m.chat, { document: { url: res.dl_link }, mimetype: 'audio/mpeg', fileName: `${res.title}.mp3`,contextInfo: {externalAdReply: {title: `${res.title}`, body: "©Darkbot-Md Bot WhatsApp", mediaUrl: text, sourceUrl: text, mediaType: 2, showAdAttribution: true, thumbnail: ythumb}}}, {}).catch((e) => m.reply(String(e)))
})
} catch(e) {
try {
let gipt = require("@bochilteam/scraper")
let yaii = await gipt.youtubedlv2(text)
let get_iimg = await getBuffer(yaii.thumbnail)
let limmk = await yaii.audio['128kbps'].download()
if(yaii.audio['128kbps'].fileSize > 10000) return m.reply(`Ukuran melebihi batas maximal 10 MB\n\n*Link download*\n${limmk}`)
let yey = conn.sendMessage(m.chat, { document: {url: limmk}, mimetype: 'audio/mpeg', fileName: `${yaii.title}.mp3`,contextInfo: {externalAdReply: {title: `${yaii.title}`, body: "©Darkbot-Md Bot WhatsApp (V2)", mediaUrl: text, sourceUrl: text, mediaType: 2, showAdAttribution: true, thumbnail: get_iimg}}}, {}).catch((e) => m.reply(String(e)))
} catch(err) {
m.reply(String(err))
}
}
}

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break




case 'ytmp4': 
case 'ytvideo':{
	return 
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)


try {
if(text.includes("youtu")) {
let { ytv } = require('./lib/y2mate')
if(text.length < 1) return m.reply(`Contoh : ${prefix + command} https://youtube.com/watch?v=PtFMh6Tccag%27 360p`)
/*let quality = args[1] ? args[1] : '360p'*/
let res = await ytv(text)
let ythum = await getBuffer(res.thumb)
if (res.filesize >= 25000) return m.reply('File Melebihi Batas, maximal 20mb')
let h = conn.sendMessage(m.chat, { document: { url: res.dl_link }, mimetype: 'video/mp4', fileName: `${res.title}.mp4`,contextInfo: {externalAdReply: {title: `${res.title}`, body: "©Darkbot-Md Bot WhatsApp", mediaUrl: text, sourceUrl: text, mediaType: 2, showAdAttribution: true, thumbnail: ythum}}},{})
/*conn.sendButDoc2(m.chat, "©Darkbot-Md Bot WhatsApp", '*Click Document untuk download*\n\n*Lokasi file*\nAndroid/media/com.whatsapp/WhatsApp/Media/WhatsApp Documents', `${res.title}`, "©Darkbot-Md Bot WhatsApp", ythum, text, 2, `${res.title}.mp4` , res.dl_link, "video/mp4", [{ buttonId: 'ok', buttonText: { displayText: 'Thanks' }, type: 1 }], m)*/
} else {
m.reply(`Masukkan link YouTube.\n*Contoh :* ${prefix+command} https://youtu.be/FIeUzNdApMA`)
}
} catch(e) {
try {
let { ytv } = require('./lib/y2mate')
let res = await ytv(text)
let ythum = await getBuffer(res.thumb)
if (res.filesize >= 25000) return m.reply('File Melebihi Batas, maximal 20mb')
conn.sendMessage(m.chat, { document: { url: res.dl_link }, mimetype: 'video/mp4', fileName: `${res.title}.mp4`,contextInfo: {externalAdReply: {title: `${res.title}`, body: "©Darkbot-Md Bot WhatsApp", mediaUrl: text, sourceUrl: text, mediaType: 2, showAdAttribution: true, thumbnail: ythum}}},{})
} catch(e) {
try {
let gig = require("@bochilteam/scraper")
let ya = await gig.youtubedlv2(text)
let get_iimgg = await getBuffer(ya.thumbnail)
let limimk = await ya.video['480p'].download() || await ya.video['360p'].download()
if(ya.video['480p'].fileSize > 20000) return m.reply(`Ukuran melebihi batas maximal 20 MB\n\n*Link download*\n${limimk}`)
let yeyy = conn.sendMessage(m.chat, { document: {url: limimk}, mimetype: 'video/mp4', fileName: `${ya.title}.mp4`,contextInfo: {externalAdReply: {title: `${ya.title}`, body: "©Darkbot-Md Bot WhatsApp (V2)", mediaUrl: text, sourceUrl: text, mediaType: 2, showAdAttribution: true, thumbnail: get_iimgg}}}, {}).catch((e) => m.reply(String(e)))
} catch(e) {
m.reply(String(e))
}
}
}

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break




case 'pindl':
case 'pinterest':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

if(m.isGroup) return m.reply("Di private chat saja biar gak menuhin galery member lain")
if(text.length < 1) return m.reply(`Masukkan yang ingin dicari\n*Contoh :* ${prefix+command} Naruto atau masukkan Link`)
if(text.includes("https://pin")) {
let dimti = ' '
await axios.post("https://www.expertstool.com/download-pinterest-video/", `url=${text}`).then(({data}) => {dimti = `${data.split(`<td><a href="`)[1].split('" download')[0].split('" target')[0]}`})
if(dimti.endsWith("gif")) {
conn.sendMessage(m.chat, {video: {url: dimti}, gifPlayback: true, caption: "Pinterest Downloader"})
} else if(dimti.endsWith("mp4")) {
let dddi = [{ buttonId: `pinmp333 ${dimti}`, buttonText: { displayText: 'Audio' },type: 1}]
conn.sendButVidc(m.chat, dddi, "*Pinterest Downloader*", '©Darkbot-Md\nThis is simple Bot WhatsApp', `${dimti}`)
/*conn.sendMessage(m.chat, {video: {url: dimti}, videoPlayback: false, caption: "Pinterest Downloader"})*/
}
} else {
async function pinterestSearch(query) {
return new Promise((resolve, reject) => {
fetch(`https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${query}&data=%7B%22options%22%3A%7B%22isPrefetch%22%3Afalse%2C%22query%22%3A%22${query}%22%2C%22scope%22%3A%22pins%22%2C%22no_fetch_context_on_resource%22%3Afalse%7D%2C%22context%22%3A%7B%7D%7D&_=1619980301559`, {
"headers": {
"accept": "application/json, text/javascript, */*, q=0.01",
"accept-language": "en-US,en;q=0.9",
"cache-control": "no-cache",
"pragma": "no-cache",
"sec-fetch-dest": "empty",
"sec-fetch-mode": "cors",
"sec-fetch-site": "same-origin",
"sec-gpc": "1",
"x-app-version": "9a236a4",
"x-pinterest-appstate": "active",
"x-requested-with": "XMLHttpRequest"
},
"referrer": "https://www.pinterest.com/",
"referrerPolicy": "origin",
"body": null,
"method": "GET",
"mode": "cors"
}).then((res) => res.json())
.then((json) => {
const generatepin = json.resource_response.data.results[Math.floor(Math.random() * (json.resource_response.data.results.length))]
var result = [];
result.push({
link: generatepin.images.orig.url
})
resolve(result)
}).catch(reject)
})
}

const pinterest = (query) => new Promise((resolve, reject) => {
pinterestSearch(query).then((data) => {
resolve({
status: 200,
image: data[0].link
})
}).catch(reject)
})

pinterest(text).then(async res => {
conn.sendMessage(m.chat, {image: {url : res.image}, caption: `Random search image from Pinterest`}, {quoted: m}).catch(e => m.reply(`*Error* ${String(e)}`))
}).catch(e => m.reply(`*Error* ${String(e)}`))
}

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break


case 'ringtone':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

if(text.length < 1) return m.reply(`Ringtone apa yang mau dicari?\nContoh ${prefix+command} nokia`)
let { ringtone } = require('./lib/scraper')
let res = await ringtone(text)
nomor = 1
isinya = []
for(let i of res) {
isinya.push({
'title': `${nomor++}. ${i.title}`,
'description': `Ringtone`,
'rowId': `ringring ${i.audio}`
})
}
let listMessage = {
text: 'Hasil penelusuran',
footer: global.wm,
title: `Ringtone search\n\nRingtone yang ditemukan.`,
buttonText: "Click Here",
sections: [{
"title": `Hasil penelusuran yang ditemukan`,
"rows": isinya}],
}
conn.sendMessage(m.chat, listMessage, {quoted: m})

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break




case 'ringring':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

if(!text.includes("btones")) return
conn.sendMessage(m.chat, {audio: {url: text}, mimetype: 'audio/mpeg'}, {quoted: m})

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break




case 'mediafire':{
	return 
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

try {
if(text.includes('mediafire.com')) {
let {mediafire} = require('mumaker')
await mediafire(text).then(async datan => {
let res = await axios.head(datan[0].link)
mimeax = res.headers['content-type']
if(res.headers["content-length"] > 20402526) { (async () => {templateButtones = [{index: 2, urlButton: {displayText: 'Download', url: datan[0].link}}]
templateMessages = {viewOnceMessage :{message : { templateMessage : {hydratedTemplate: { hydratedContentText: "File melebihi 20 mb",
hydratedFooterText: "©Darkbot-Md\nThis is Simple Bot WhatsApp", hydratedButtons: templateButtones}}}}}
conn.relayMessage(m.chat, templateMessages, {})})();
} else if (mimeax.split("/")[1] === "gif") {
return conn.sendMessage(m.chat, { video: await getBuffer(datan[0].link), caption: caption, gifPlayback: true, mentions: men ? men : []}, {quoted: m})
} else if(mimeax.split("/")[0] === "image"){
return conn.sendMessage(m.chat, { image: await getBuffer(datan[0].link)}, {quoted: m})
} else if(mimeax.split("/")[0] === "video"){
return conn.sendMessage(m.chat, { video: await getBuffer(datan[0].link)}, {quoted: m})
} else if(mimeax.split("/")[0] === "audio"){
return conn.sendMessage(m.chat, { audio: await getBuffer(datan[0].link), mimetype: 'audio/mpeg'}, {quoted: m })
} else if(mimeax.split("/")[1] === "vnd.android.package-archive"){
return conn.sendMessage(m.chat, { document: await getBuffer(datan[0].link), mimetype: res.headers['content-type'], fileName: `${datan[0].nama}.apk`, contextInfo: {mentionedJid: [quoted.sender], externalAdReply: {title: `MediaFire Download`, body: "©Darkbot-Md Bot WhatsApp", mediaUrl: `${text}`, sourceUrl: `${text}`, renderLargerThumbnail: true, showAdAttribution: true, mediaType: 1, thumbnail: fs.readFileSync('./image/mfire.jpg')}}}, {})
} else if(mimeax.split("/")[1] === "zip") {
conn.sendMessage(m.chat, {document: {url: datan[0].link}, fileName: `${datan[0].nama}.apk`, mimetype: 'application/zip', contextInfo: {mentionedJid: [quoted.sender], externalAdReply: {title: `MediaFire Download`, body: "©Darkbot-Md Bot WhatsApp", mediaUrl: `${text}`, sourceUrl: `${text}`, renderLargerThumbnail: true, showAdAttribution: true, mediaType: 1, thumbnail: fs.readFileSync('./image/mfire.jpg')}}}) 
} else {
m.reply("Versi belum tersedia ajukan request ke owner")
}
})
} else {
m.reply(`*Cara Penggunaan*\n\n*Contoh :* ${prefix+command} https://www.mediafire.com/file/jqxsuqn83s0f2wp/PIXELLAB+DARK+BLUE+1.9.9.apk/file`)
}
} catch (e) {
m.reply("Error")
}

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break

case 'totext':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

if (!quoted) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
if (!/image/.test((quoted.msg || quoted).mimetype || '')) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
if (/webp/.test((quoted.msg || quoted).mimetype || '')) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)

let {ocrSpace} = require('ocr-space-api-wrapper');
let media = await conn.downloadAndSaveMediaMessage(quoted);
let base666 = fs.readFileSync(media).toString('base64');
let dun = await ocrSpace(`data:image/png;${base666}`, {apiKey: 'K87092877188957', language: 'eng'})
let hh = dun.ParsedResults[0].ParsedText
await conn.linkUp(m.chat, `${hh}`, "https://youtube.com/c/Mr_Dark", fs.readFileSync('./image/nan.png'), "My YouTube", 'Subscribe owner YouTube now!')
await fs.unlinkSync(media)

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break



case 'apksearch':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

if(text.length < 1) return m.reply(`Masukkan nama aplikasi yang ingin dicari\n*Contoh:* ${prefix+command} mekorama`)
try {
let {rexdl} = require('./lib/rexdl')
let {rix} = require('./lib/rexdl')
let {html} = require('./lib/rexdl')

if(text.endsWith("html/")) {
let gui = await rix(text)
let runin = await html(gui.otw)
let nppi = 1
let fos2 = []
for(let li of runin.url) {
fos2.push({
"title": `${nppi++}. ${li.split("/")[5].split("-www")[0]}`,
"description": `Application search and download`,
"rowId": `apksearch ${text}|${li}`
})
}

let listUr = {
text: 'Hasil penelusuran',
footer: global.wm,
title: `Jenis versi aplikasi ini`,
buttonText: "Application",
sections: [{
"title": `Versi yang ditemukan`,
"rows": fos2}]
}

conn.sendMessage(m.chat, listUr, {})
} else if(text.endsWith("apk")) {
let than = await rix(text.split("|")[0])
let nap = await axios(text.split("|")[1])
if(nap.headers["content-length"] > 20402526) { 
(async () => {templateButtones = [{index: 2, urlButton: {displayText: 'Download', url: text.split("|")[1]}}]
templateMessages = {viewOnceMessage :{message : { templateMessage : {hydratedTemplate: { hydratedContentText: "File melebihi 20 mb",
hydratedFooterText: "©Darkbot-Md\nThis is Simple Bot WhatsApp", hydratedButtons: templateButtones}}}}}
conn.relayMessage(m.chat, templateMessages, {})})();
} else {
await conn.sendMessage(m.chat, { document :{url: text.split("|")[1]}, mimetype: nap.headers['content-type'], fileName: `${text.split("|")[1].split("/")[5]}.apk`, contextInfo: {mentionedJid: [quoted.sender], externalAdReply: {title: `Aplication Download`, body: "©Darkbot-Md Bot WhatsApp", mediaUrl: `${text.split("|")[1]}`, sourceUrl: `${text.split("|")[1]}`, renderLargerThumbnail: true, showAdAttribution: true, mediaType: 1, thumbnail: await getBuffer(than.thumb)}}})
}
} else {
let fos = []
let npi = 1
await rexdl(text).then(async datay => {
for(let di of datay.list) {
fos.push({
"title": `${npi++}. ${di.title}`,
"description": `Application search and download`,
"rowId": `apksearch ${di.html}`
})
}

let listAp = {
text: 'Hasil penelusuran',
footer: global.wm,
title: `Application Download`,
buttonText: "Application",
sections: [{
"title": `Aplikasi yang ditemukan`,
"rows": fos}]
}
conn.sendMessage(m.chat, listAp, {})
})
}
} catch(err) { 
m.reply(String(err) + `${err}`)
}

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break




case 'wallpaper':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)


let { wallpaperhd } = require('./lib/wallpaper.js')
let enm = await text.split("order=desc&page=")[1] ? text.split("order=desc&page=")[1]: 0
if(text.includes("//wallhaven.cc/search")) {
try {
let swo = await wallpaperhd(`${text.split("order=desc&page=")[0]}order=desc&page=${enm * 1 + 1}`)
if(swo.length === 0) return conn.sendButtonText(m.chat, [{buttonId: `i`, buttonText: {displayText: 'Oke'}, type:1}], `Sepertinya sudah sampai akhir`, global.wm)
let lostii = []
let npi = 1
for(let li of swo) {
lostii.push({
"title": `${npi++}.Wallpaper ${text.split("/search?q=")[1].split("&categories")[0].replace(/%20/g, " ")} ${li.width}`,
"description": `HD Wallpaper Quality size image ${li.width}`,
"rowId": `wlp ${li.link}`
})
}

let listWall = {
text: 'Hasil penelusuran',
footer: global.wm,
title: `Wallpaper HD`,
buttonText: "Wallpaper",
sections: [{
"title": `Wallpaper yang tersedia`,
"rows": lostii}]
}
conn.sendMessage(m.chat, listWall, {}).then(() => {
let typ = `${text.split("order=desc&page=")[0]}order=desc&page=${enm * 1 + 1}`
let btnzi = [{buttonId: `wallpaper ${typ}`, buttonText: {displayText: 'Next'}, type:1}]
conn.sendButtonText(m.chat, btnzi, `List berikutnya`, global.wm)
})
} catch(err) {
m.reply(String(err))
}
} else {
try {
if(text.length < 1) return m.reply("*Contoh:* /wallpaper doctor strange")
/*enm = await text.split("order=desc&page=")[1] ? text.split("order=desc&page=")[1]: 0*/
let sw = await wallpaperhd(`https://wallhaven.cc/search?q=${encodeURI(text)}&categories=110&purity=100&sorting=relevance&order=desc&page=1`)

lui = `https://wallhaven.cc/search?q=${encodeURI(text)}&categories=110&purity=100&sorting=relevance&order=desc&page=1`
if(sw.length === 0) return conn.sendButtonText(m.chat, [{buttonId: `i`, buttonText: {displayText: 'Oke'}, type:1}], `Wallpaper ${text} tidak tersedia`, global.wm)
let losti = []
np = 1
for(let l of sw) {
losti.push({
"title": `${np++}.Wallpaper ${lui.split("/search?q=")[1].split("&categories")[0].replace(/%20/g, " ")} ${l.width}`,
"description": `HD Wallpaper Quality size image ${l.width}`,
"rowId": `wlp ${l.link}`
})
}

let listWal = {
text: 'Hasil penelusuran',
footer: global.wm,
title: `Wallpaper HD`,
buttonText: "Wallpaper",
sections: [{
"title": `Wallpaper yang tersedia`,
"rows": losti}]
}
conn.sendMessage(m.chat, listWal, {}).then(() => {
let typ = `https://wallhaven.cc/search?q=${encodeURI(text)}&categories=110&purity=100&sorting=relevance&order=desc&page=2`
let btnzi = [{buttonId: `wallpaper ${typ}`, buttonText: {displayText: 'Next'}, type:1}]
conn.sendButtonText(m.chat, btnzi, `List berikutnya`, global.wm)
})
} catch(err) {
m.reply(String(err))
}
}
} 
//global_users[m.sender].limit -= 1 
//fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))

break



case 'beli':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

jio = `Harga script 15k
Pembayaran via pulsa
No encrypt, No Api

chat owner untuk melanjutkan`

m.reply(jio)

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break




case 'igmulti':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

if(text.includes("/stories/")) return m.reply(`_Gunakan perintah ${prefix}igstory_`)
try {
if(text.includes("instagram.com")) {
let { igg } = require('./lib/igg')
let hwol = await igg(text)
let gui = []
let thenn = 1
for(let ii of hwol) {
gui.push({
"title": `Downloader Instagram urutan ke ${thenn++}`,
"description": `Jenis ${ii.type}`,
"rowId": `igosig ${ii.link}`
})
}
let listMesis = {
text: 'Hasil penelusuran',
footer: global.wm,
title: `Downloader Instagram`,
buttonText: "Media Instagram",
sections: [{
"title": `Data instagram yang ditemukan`,
"rows": gui}]
}

await conn.sendMessage(m.chat, listMesis, {quoted: 
{
key: { fromMe: false, participant: `${quoted.sender}`},
message: {
"extendedTextMessage": {
"text": `*Downloader Instagram*`,
"title": ``,
'jpegThumbnail': fs.readFileSync('./image/ig.png')
}} 
}, contextInfo: {mentionedJid: [quoted.sender]}})

} else {
m.reply(`Masukkan link!\n*Contoh :* ${prefix+command} https://www.instagram.com/p/CcejPskP8Ia/?igshid=YmMyMTA2M2Y=`)
}
} catch(err) {
m.reply(String(err))
}

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break

case 'tts':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)


let kuyin = args.join(" ")
if (args.length < 1) return m.reply(`Masukkan kode bahasa dan teks\n*Contoh :* ${prefix+command} id/Halo`)
try {
if (kuyin.includes("/")) {
let kun = args.join(" ")
let kunik = kun.split("/")[0]
let kunil = kun.split("/")[1]
if(!/af|sq|ar|hy|ca|zh|zh-cn|zh-tw|zh-yue|hr|cs|da|nl|en|en-au|en-uk|en-us|eo|fi|fr|de|el|ht|hi|hu|is|id|it|ja|ko|la|lv|mk|no|pl|pt|pt-br|ro|ru|sr|sk|es|es-es|es-us|sw|sv|ta|th|tr|vi|cy/i.test(kunik)) return conn.sendButtonText(m.chat, [{buttonId: 'kodebahasa', buttonText: {displayText: 'Kode Bahasa'}, type:1}], `*Contoh :*\n${prefix+command} id/Halo kakak cantik`, global.wm, m)
if(kunil.length < 1) return m.reply("Masukkan teksnya")
const gtts = require('./lib/gtts')(kunik)
let ranm = getRandom('.mp3')
let rano = getRandom('.ogg')
gtts.save(ranm, kunil, function() {
exec(`ffmpeg -i ${ranm} -ar 48000 -vn -c:a libopus ${rano}`, (err) => {
fs.unlinkSync(ranm)
let buff = fs.readFileSync(rano)
if (err) return m.reply('Error :(')
conn.sendMessage(m.chat, {audio: buff, ptt: true, waveform: "ByEmJiYmKC4oIS0rP0hHQywwJjshQkEHDTFMVEsgQF9iYVleYlA5WlQtJ1VMSicuQ0E+YFQ9YGFfKBoGAAAAAA=="}, {quoted: m})
fs.unlinkSync(rano)
})
})
} else {
conn.sendButtonText(m.chat, [{buttonId: 'kodebahasa', buttonText: {displayText: 'Kode Bahasa'}, type:1}], `*Contoh :*\n${prefix+command} id/Halo kakak cantik`, global.wm, m)
}
} catch (e) {
m.reply("Error")
}
} 
//global_users[m.sender].limit -= 1 
//fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))

break



case 'ttp':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

if(text.length < 1) return m.reply(`Cara menggunakan\n*Contoh :* ${prefix+command} Darkbot-Md`)
await conn.sendImageAsSticker(m.chat, `https://api.xteam.xyz/ttp?file&text=${encodeURI(text)}`, m, {packname: 'Sticker', author: 'Darkbot-Md Bot WhatsApp'})

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break



case 'attp':
{
try {
if(text.length < 1) return m.reply(`Contoh: ${prefix+command} Halo`)
let stik = await getBuffer(`https://api.xteam.xyz/attp?file&text=${encodeURI(text)}`)
conn.sendMessage(m.chat, {sticker: stik, mimetype: 'image/webp'}, {quoted: m})
} catch(e) {
m.reply(util.format(e))
}

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break



case 'public':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

if (!isCreator) return m.reply(mess.owner)
global.pub = true
m.reply('Sukse Change To Public Usage')

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break

case 'self':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

if (!isCreator) return m.reply(mess.owner)
global.pub = false
m.reply('Sukses Change To Self Usage')

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break

case 'translate':
case 'tr':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

try {
if (text.includes("/")) {
if(m.quoted) return conn.sendButtonText(m.chat, [{buttonId: 'kodebahasa', buttonText: {displayText: 'Kode Bahasa'}, type:1}], `*Contoh :*\n${prefix+command} id/Thanks\nAtau\n${prefix+command} id(reply pesan)`, global.wm, m)
if (/image/.test((quoted.msg || quoted).mimetype || '')) return
if (/audio/.test((quoted.msg || quoted).mimetype || '')) return
if (/video/.test((quoted.msg || quoted).mimetype || '')) return
if (/webp/.test((quoted.msg || quoted).mimetype || '')) return

let text2 = text.split("/")[0].trim()
let text1 = m.text.split("/")[1].split("\n")

let tr = require("translate-google-api")
let _tr = await tr(text1, {to: text2})
m.reply(_tr.join("\n"))
} else if(m.quoted) {
if(text.includes("/")) return conn.sendButtonText(m.chat, [{buttonId: 'kodebahasa', buttonText: {displayText: 'Kode Bahasa'}, type:1}], `*Contoh :*\n${prefix+command} id/Thanks\nAtau\n${prefix+command} id(reply pesan)`, global.wm, m)
if (/image/.test((quoted.msg || quoted).mimetype || '')) return
if (/audio/.test((quoted.msg || quoted).mimetype || '')) return
if (/video/.test((quoted.msg || quoted).mimetype || '')) return
if (/webp/.test((quoted.msg || quoted).mimetype || '')) return

let text22 = text
let text11 = m.quoted.text.split("\n")

let tr = require("translate-google-api")
let _tr = await tr(text11, {to: text22})
m.reply(_tr.join("\n"))
} else {
conn.sendButtonText(m.chat, [{buttonId: 'kodebahasa', buttonText: {displayText: 'Kode Bahasa'}, type:1}], `*Contoh :*\n${prefix+command} id/Thanks\nAtau\n${prefix+command} id(reply pesan)`, global.wm, m)
}
} catch(e) {
m.reply(util.format(e))
}

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break



case 'kodebahasa':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

let leang = `*Kode Bahasa*
(*For Translate*)

Afrikaans = af
Albanian = sq
Amharic = am
Arabic = ar
Armenian = hy
Azerbaijani = az
Basque = eu
Belarusian = be
Bengali = bn
Bosnian = bs
Bulgarian = bg
Catalan = ca
Cebuano = ceb
Chichewa = ny
Chinese Simplified = zh-cn
Chinese Traditional = zh-tw
Corsican = co
Croatian = hr
Czech = cs
Danish = da
Dutch = nl
English = en
Esperanto = eo
Estonian = et
Filipino = tl
Finnish = fi
French = fr
Frisian = fy
Galician = gl
Georgian = ka
German = de
Greek = el
Gujarati = gu
Haitian Creole = ht
Hausa = ha
Hawaiian = haw
Hebrew = iw
Hindi = hi
Hmong = hmn
Hungarian = hu
Icelandic = is
Igbo = ig
Indonesian = id
Irish = ga
Italian = it
Japanese = ja
Javanese = jw
Kannada = kn
Kazakh = kk
Khmer = km
Korean = ko
Kurdish (Kurmanji) = ku
Kyrgyz = ky
Lao = lo
Latin = la
Latvian = lv
Lithuanian = lt
Luxembourgish = lb
Macedonian = mk
Malagasy = mg
Malay = ms
Malayalam = ml
Maltese = mt
Maori = mi
Marathi = mr
Mongolian = mn
Myanmar (Burmese) = my
Nepali = ne
Norwegian = no
Pashto = ps
Persian = fa
Polish = pl
Portuguese = pt
Punjabi = ma
Romanian = ro
Russian = ru
Samoan = sm
Scots Gaelic = gd
Serbian = sr
Sesotho = st
Shona = sn
Sindhi = sd
Sinhala = si
Slovak = sk
Slovenian = sl
Somali = so
Spanish = es
Sundanese = su
Swahili = sw
Swedish = sv
Tajik = tg
Tamil = ta
Telugu = te
Thai = th
Turkish = tr
Ukrainian = uk
Urdu = ur
Uyghur = ug
Uzbek = uz
Vietnamese = vi
Welsh = cy
Xhosa = xh
Yiddish = yi
Yoruba = yo
Zulu = zu


*For TextToSpech(tts)*

af = Afrikaans
sq = Albanian
ar = Arabic
hy = Armenian
ca = Catalan
zh = Chinese
zh-cn = Chinese (Mandarin/China)
zh-tw = Chinese (Mandarin/Taiwan)
zh-yue = Chinese (Cantonese)
hr = Croatian
cs = Czech
da = Danish
nl = Dutch
en = English
en-au = English (Australia)
en-uk = English (United Kingdom)
en-us = English (United States)
eo = Esperanto
fi = Finnish
fr = French
de = German
el = Greek
ht = Haitian Creole
hi = Hindi
hu = Hungarian
is = Icelandic
id = Indonesian
it = Italian
ja = Japanese
ko = Korean
la = Latin
lv = Latvian
mk = Macedonian
no = Norwegian
pl = Polish
pt = Portuguese
pt-br = Portuguese (Brazil)
ro = Romanian
ru = Russian
sr = Serbian
sk = Slovak
es = Spanish
es-es = Spanish (Spain)
es-us = Spanish (United States)
sw = Swahili
sv = Swedish
ta = Tamil
th = Thai
tr = Turkish
vi = Vietnamese
cy = Welsh`
m.reply(leang)

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break



case 'ping': case 'botstatus': case 'statusbot':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

let used = process.memoryUsage()
let npmv = process.versions
let cpus = os.cpus().map(cpu => {
cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
return cpu
})
cpu = cpus.reduce((last, cpu, _, { length }) => {
last.total += cpu.total
last.speed += cpu.speed / length
last.times.user += cpu.times.user
last.times.nice += cpu.times.nice
last.times.sys += cpu.times.sys
last.times.idle += cpu.times.idle
last.times.irq += cpu.times.irq
return last
}, {
speed: 0,
total: 0,
times: {
user: 0,
nice: 0,
sys: 0,
idle: 0,
irq: 0
}
})
let timestamp = speed()
let latensi = speed() - timestamp
let neww = performance.now()
let oldd = performance.now()
let respon = `*Info Bot*
Last update on 24, Mei

*Thanks to*
*Dika ardiant* (Base.bot)
*${global.nama}* (Owner)
*Miaw (CAF)* (Kontributor)
*Furqan* (Contributor)
*Mr_Dark* (Python Script)
*Sauma* (Friend)
*Gigih* (My Support)


*Base Bot:*
https://github.com/DikaArdnt/Hisoka-Morou

*Speed* ${latensi.toFixed(4)} second
*Runtime* : ${runtime(process.uptime())}

*Info Server*
RAM: ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}

*NodeJS Memory Usaage*
${Object.keys(used).map((key, _, arr) => `${key.padEnd(Math.max(...arr.map(v=>v.length)),' ')}: ${formatp(used[key])}`).join('\n')}

*Info Version*
\`\`\`${Object.keys(npmv).map((key, _, arr) => `${key.padEnd(Math.max(...arr.map(v=>v.length)),' ')}: ${(npmv[key])}`).join('\n')}\`\`\`

${cpus[0] ? `*Total CPU Usage*
\`\`\`${cpus[0].model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- ${(type + '').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}
_CPU Core(s) Usage (${cpus.length} Core CPU)_
${cpus.map((cpu, i) => `${i + 1}. ${cpu.model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- ${(type + '').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}`).join('\n\n')}` : ''}
\`\`\``.trim()

var template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
extendedTextMessage: {
text: respon, contextInfo: {externalAdReply: {title: 'My Channel YouTube', body: 'Subscribe untuk support owner', renderLargerThumbnail: true, mediaType: 1, mediaUrl: 'https://www.youtube.com/c/Mr_Dark', sourceUrl: 'https://www.youtube.com/c/Mr_Dark', thumbnail: fs.readFileSync('./image/phot.jpg')}}
},
}), {});conn.relayMessage(m.chat, template.message, { messageId: template.key.id })

/*conn.sendMessage(m.chat, {text: respon}, {quoted: m})*/


////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break



case 'nulis':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

try {
if(text.length < 1) return m.reply(`Masukkan teksnya\nContoh: ${prefix}${command} Darkbot-Md`)
let nulli = await getBuffer(`https://hadi-api.herokuapp.com/api/canvas/nulis?text=${encodeURI(q)}`)
await conn.sendMessage(m.chat, {image: nulli, mimetype: 'image/jpeg', caption: 'Done'}, {quoted: m}).catch((e) => m.reply(String(e)))
} catch(e) {
m.reply(`${String(e)}`)
}

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break


case 'tahta':
try {
if(text.length < 1) return m.reply(`Masukkan teksnya\nContoh: ${prefix}${command} Darkbot-Md`)
let gimgt = await getBuffer(`https://api.zeks.me/api/hartatahta?apikey=PerwiraGans&text=${q}`)
await conn.sendMessage(m.chat, {image: gimgt, mimetype: 'image/jpeg', caption: "_Sudah jadi kak_"}, {quoted: m}).catch((e) => m.reply(`*Error*\n${String(e)}`))
} catch(e) {
m.reply(`${util.format(e)}`)

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break



case 'owner': case 'creator':{
tio = `Berikut adalah tag owner dari bot ini
@6281327441039 (Owner utama)
@6283167714830 (Owner kedua)`
conn.sendMessage(m.chat, {contacts: {displayName: '1',contacts:[{
"displayName": "MR_DARK02 (Owner)",
"vcard": "BEGIN:VCARD\nVERSION:3.0\nN:;MR_DARK02 (Owner);;;\nFN:MR_DARK02 (Owner)\nitem1.TEL;waid=6281327441039:+62 813-2744-1039\nitem1.X-ABLabel:Ponsel\nX-WA-BIZ-DESCRIPTION:Owner DarkBot ✅\nX-WA-BIZ-NAME:MR_DARK02 (Owner)\nEND:VCARD",
"contextInfo": {
externalAdReply:{title: 'Mr_Dark (Subscribe Now)', body: 'Contact me - Click here',sourceUrl: 'https://wa.me/6281327441039', mediaType: 1, mediaUrl: 'https://wa.me/6281327441039', renderLargerThumbnail: true, showAdAttribution: true, thumbnail: fs.readFileSync('./image/nam.jpg')}
}
}]
}
})
}

break



case 'mantap':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

m.reply("*Mantap, jangan melanggar rules!*")

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break




//global_users[m.sender].limit -= 1 
//fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))

break



case 'rules':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

let butts = [
{ buttonId: 'mantap', buttonText: { displayText: 'Saya mengerti' }, type: 1 }
]
butp = `*Thanks to* :
*Dika ardiant* (Base.bot)
*${global.nama}* (Owner)
*Arul (CAF)* (Kontributor)
*Furqan* (Contributor)
*Mr_Dark* (Python Script)
*Sauma* (Friend)
*Gigih* (My Support)

*Note!*
Dilarang spam (blokir otomatis)
Dilarang telfon (blokir otomatis)
Kata² toxic akan diubah otomatis

*Definition of this Bot*
Ini adalah simpel bot di WhatsApp yang dapat mempermudah untuk mendownload, membuat sticker ataupun convert beberapa pesan.

*Join Group Owner*
Untuk info terbaru dari bot 
https://chat.whatsapp.com/I6fnCuDB7f7AjFGxvXwvRE
`

var template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
extendedTextMessage: {
text: butp, contextInfo: {externalAdReply: {title: 'My Channel YouTube', body: 'Subscribe untuk support owner', renderLargerThumbnail: true, sourceUrl: 'https://www.youtube.com/c/Mr_Dark',mediaType: 1, mediaUrl: 'https://www.youtube.com/c/Mr_Dark', thumbnail: fs.readFileSync('./image/phot.jpg')}}
},
}), {});conn.relayMessage(m.chat, template.message, { messageId: template.key.id })

/*await conn.sendButLocc(m.chat, butts, butp, '©Darkbot-Md\nThis is simple Bot WhatsApp', fs.readFileSync('./image/g.jpg'))*/
} 
break


/*case 'ai':{
if(!text) return m.reply("*Example* - .ai siapa kamu")
if(global_users[m.sender].limit < 1) return m.reply("- *Limit kamu telah habis* -\nsilahkan tunggu besok")
let _ai = await axios(`https://termux.my.id/admin/ai.php?text=${text}`)

m.reply(_ai.data)

//global_users[m.sender].limit -= 1;
//fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
e=global_users[m.sender].limit
m.reply("*Sisa limit kamu:* "+e)
}
break
*/
case 'igstalk':
case 'stalkig':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

if(text.length < 1) return m.reply(`Masukkan username instagram yang tepat\n*Contoh :* ${prefix+command} username`)
if(text.includes(`https://`)) return m.reply(`Masukkan username instagram yang tepat\n*Contoh :* ${prefix+command} username`)
try {
let { igstalk } = require("./lib/stalk.js")
let prof = ''
let prif = ''
let preif = ''
let datast = await igstalk(text)
let datastalke = `*Profile user*
━━━━━━━━━━
*${datast.full_name}*
${datast.username}
${datast.edge_followed_by.count} Followers
${datast.edge_follow.count} Following
${datast.edge_owner_to_timeline_media.count} Post

*Description*
${datast.biography}

*Url Link*
${datast.external_url}

*Account info*
━━━━━━━━━━
Professional: ${datast.is_professional_account}
Business: ${datast.is_business_account}
Private: ${datast.is_private}
Verivied: ${datast.is_verified}

*Profile picture*
_${datast.profile_pic_url_hd}_
`
let imgsr = await getBuffer(datast.profile_pic_url_hd)
conn.linkUp(m.chat, `${datastalke}`, `https://www.instagram.com/${text}`, imgsr, "Instagram Stalk", "Instagram Stalk By Bot WhatsApp")
/*conn.sendMessage(m.chat, {text: datastalke}, {quoted: m})*/
} catch(err) {
m.reply(String(err))
}

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break

case 'tiktokstalk':
case 'ttstalk':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

if(text.length < 1) return m.reply(`Masukkan username tiktok\n*Contoh:* ${prefix+command} Mr_Dark`)
let { stalk } = require('./lib/ttstalk')
let kuun = await stalk(text)

let texttt = `*Profile User*
━━━━━━━━━━
${kuun.name}
${kuun.username}
${kuun.videos}
${kuun.followers}
${kuun.following}
${kuun.like}
${kuun.desc}
`

let hyn = await getBuffer(kuun.profile)
conn.linkUp(m.chat, `${texttt}`, `https://tiktok2k.com/users/${text}`, hyn, "Tiktok Stalk", "Tiktok Stalk By Bot WhatsApp")

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break

case 'reply':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

m.reply(text)
await sleep(2000)
m.reply(args.join(" "))

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break

case 'lyric':
case 'lirik':
case 'lyrics':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

if(!text) return m.reply(`Lyrics apa yang mau dicari?\n*Contoh:* ${prefix+command} melompat lebih tinggi`)
try {
let _mp = require('lyrics-finder')
//let my_l = await _ll(text)
//let { glyric } = require('./lib/glyric')
let my_l = await _mp(text)
await conn.linkUp(m.chat, `${my_l}`, "https://gppgle.com", fs.readFileSync('./image/lyrics.jpg'), "Lyrics Finder", "Temukam lirik disini")
} catch(err) {
m.reply(String(err))
}

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break



case 'menu': 
case 'list': 
case 'help':{
let buttonis = [
{ buttonId: 'owner', buttonText: { displayText: 'Owner' }, type: 1 },
{ buttonId: 'rules', buttonText: { displayText: 'Rules' }, type: 1 }
]

let ubtn = [{
urlButton: {
displayText: 'Channel',
url: 'https://youtube.com/channel/UCiA1c3DgEqjfCm5t6UwQ37w'
}
}, {
urlButton: {
displayText: 'Instagram',
url: 'https://instagram.com/username'
}
}, {
quickReplyButton: {
displayText: 'Owner',
id: 'owner'
}
},
{
quickReplyButton: {
displayText: 'Info Bot',
id: 'info'
}
}]
let annon = `*Menu*
_______________
□⁠ ${prefix}igdl
□⁠ ${prefix}fbdl
□⁠ ${prefix}tiktok
□⁠ ${prefix}ttmp3
□⁠ ${prefix}ytmp3
□⁠ ${prefix}ytmp4
□⁠ ${prefix}sticker
□⁠ ${prefix}removebg
_______________
`
let anno = `*Stiker Menu*
≻ ${prefix}ttp
≻ ${prefix}attp
≻ ${prefix}sticker
≻ ${prefix}triggered
≻ ${prefix}removebg

*Convert Menu*
≻ ${prefix}tts
≻ ${prefix}tourl
≻ ${prefix}togif
≻ ${prefix}totext
≻ ${prefix}toimg
≻ ${prefix}tomp3
≻ ${prefix}tomp4
≻ ${prefix}translate 

*Search Menu*
≻ ${prefix}play
≻ ${prefix}lyrics 
≻ ${prefix}ttstalk
≻ ${prefix}igstalk
≻ ${prefix}igstory
≻ ${prefix}ringtone
≻ ${prefix}ytsearch
≻ ${prefix}wikihow
≻ ${prefix}wikipedia 

*Download Menu*
≻ ${prefix}ttdl
≻ ${prefix}igdl
≻ ${prefix}fbdl
≻ ${prefix}twdl
> ${prefix}ttmp3
≻ ${prefix}ytmp3
≻ ${prefix}ytmp4
≻ ${prefix}igmulti
> ${prefix}pinterest
≻ ${prefix}mediafire

*Message Menu*
≻ ${prefix}menfess

*Random Menu*
> ${prefix}image
≻ ${prefix}funfact
≻ ${prefix}wallpaper

*Maker Menu*
≻ ${prefix}anim
≻ ${prefix}textpro
≻ ${prefix}template
≻ ${prefix}styletext
`

let cn = `
*Stiker Menu* | *Convert Menu*
≻ ${prefix}ttp |≻ ${prefix}togif
≻ ${prefix}attp |≻ ${prefix}toimg
≻ ${prefix}sticker|≻ ${prefix}tomp3
≻ ${prefix}triggered|≻ ${prefix}tomp4
`
/*if(require("@adiwajshing/baileys").getDevice(m.id) === "android") {
let templateButtones = [ {index: 1, callButton: {displayText: 'Phone', phoneNumber: '6281327441039'}}, {index: 2, urlButton: {displayText: 'WhatsApp Group', url: 'https://chat.whatsapp.com/KlhqovDy6S7J2zauWMyFdj'}}, {index: 3, quickReplyButton: {displayText: 'Rules', id: 'rules'}},{index: 5, quickReplyButton: {displayText: 'Owner', id: 'owner'}},{index: 5, quickReplyButton: {displayText: 'Network', id: 'ping'}}]
let templateMessages = {viewOnceMessage :{message : { templateMessage : {hydratedTemplate: { locationMessage: {jpegThumbnail: fs.readFileSync("./help.jpg")}, hydratedContentText: annon,
hydratedFooterText: "©Darkbot-Md Android\nThis is Simple Bot WhatsApp", hydratedButtons: templateButtones}}}}}
conn.relayMessage(m.chat, templateMessages, {})
} else {
await conn.sendButGamc(m.chat, buttonis, annon, '©Darkbot-Md iPhone\nThis is simple Bot WhatsApp', './image/vivi.jpg')
}*/
conn.linkUp(m.chat, annon, "https://chat.whatsapp.com/Ik3VuJhKx0BGs81E3Gjonk", fs.readFileSync('./nam.jpg'), "Private bot assistant", 'This is chat from bot, not human!')

}
break


case 'menfess':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

try {
let ret = `Fitur untuk mengirim pesan kepada nomor tujuan

*Cara menggunakan:*
${prefix}menfess 62xxxx/inisial/pesan

*Contoh:*
${prefix}menfess 62xxxx/Si kecil/Halo aku suka sama kamu`

if(m.isGroup) return m.reply("Tidak bisa digunakan didalam grup")
if(text.length < 1) return m.reply(ret)

let texot = text.split("/")[0].replace(/[^0-9]/g, "")
let texiot = text.split("/")[0].replace(/[^0-9]/g, "")
if(texiot.startsWith("0")) {
texot = `62${texiot.slice(1)}`
} else {
texot = text.split("/")[0].replace(/[^0-9]/g, "")
}
let texit = text.split("/")[2]
let nm = text.split("/")[1]

if(nm === undefined) return m.reply(ret + "\n\n*Note*\nAnda belum memasukkan nama samaran\n\n*Perhatikan contoh!!!*")
if(nm.length < 1) return m.reply(ret + "\n\n*Note*\Isi nama inisial anda\n\n*Perhatikan contoh!!!*")
if(texit === undefined) return m.reply(ret + "\n\n*Note*\nAnda belum memasukkan pesan\n\n*Perhatikan contoh!!!*")
if(texit.length < 1) return m.reply(ret + "\n\n*Note*\nAnda belum memasukkan pesan\n\n*Perhatikan contoh!!!*")
let bi = ` *[ Menfess Chat ]* 
_______________________

From: ${nm}
Pesan: ${texit}
_______________________`

let bunis = [
{ buttonId: `see ${quoted.sender}`, buttonText: { displayText: 'Telah dibaca' }, type: 1 }
]
await conn.sendButtonMenf(`${texot}@s.whatsapp.net`, quoted.sender, bunis, bi, '©Darkbot-Md\nThis is simple Bot WhatsApp\nBalas pesan ini kepada pengirim dengan reply pesan dan command /balas isi pesan')
} catch(err) {
m.reply("Error" + String(err))
}
m.reply("Terkirim")
/*conn.sendMessage(`${texot}@s.whatsapp.net`, {text: bi}).catch(err => { m.reply(String(err)) })*/

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break






case 'balas':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

if(m.isGroup) return m.reply("Tidak bisa digunakan didalam grup")
if(!m.quoted) return m.reply("Reply pesan Menfessnya")
if(!quoted.text.includes("[")) return m.reply("Bukan pesan Menfess")
let luio = quoted.text.split("_______________________")[1].split("_______________________")[0]
let texl = `*Menfess Chat*

Balasan pesan dari @${m.chat.split("@")[0]}
Untuk pesan : 
___________________${luio}
____________________
Balasan: ${text}`
let hopi = quoted.contextInfo.mentionedJid[0]
if(text.length < 1) return m.reply("Masukkan pesan")
conn.sendMessage(hopi, {text: texl, mentions: [m.chat]})

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break




case 'see':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

if(m.isGroup) return m.reply("Tidak bisa digunakan didalam grup")
let nom = text
let gms = quoted.text.split("_______________________")[1].split("_______________________")[0]
conn.sendMessage(nom, {text: `*Pesan Menfess*\n_______________________${gms}_______________________\n\nTelah dibaca oleh @${m.chat.split("@")[0]}`, mentions: [m.chat]})

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break



case 'list2': case 'menu2': case 'help2':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

/*let btnz = [{buttonId: 'owner', buttonText: {displayText: 'Owner'}, type:1},{buttonId: 'profile', buttonText: {displayText: 'Profile'}, type:1},{buttonId: 'jebak', buttonText: {displayText: 'Aku\n'}, type:1}]*/
let buttono = [{buttonId: 'info', buttonText: {displayText: 'More Info'}, type:1}]
let btn = [{
urlButton: {
displayText: 'Channel',
url: 'https://youtube.com/channel/UCiA1c3DgEqjfCm5t6UwQ37w'
}
}, {
urlButton: {
displayText: 'Instagram',
url: 'https://instagram.com/username'
}
}, {
quickReplyButton: {
displayText: 'Sewa',
id: 'sewa'
}
}, {
quickReplyButton: {
displayText: 'Owner',
id: 'owner'
}
},
{
quickReplyButton: {
displayText: 'Info Bot',
id: 'info'
}
}]


if(m.isGroup) {
let anu = `*Group Menu*
≻ ${prefix}kick
≻ ${prefix}add
≻ ${prefix}promote
≻ ${prefix}demote
≻ ${prefix}group
≻ ${prefix}linkgc
≻ ${prefix}tagall
≻ ${prefix}hidetag
≻ ${prefix}totag
≻ ${prefix}setname
≻ ${prefix}setppgc

*Random Menu*
≻ ${prefix}wallpaper
≻ ${prefix}pinterest
≻ ${prefix}image

*Search Menu*
≻ ${prefix}play
≻ ${prefix}igstalk
≻ ${prefix}igstory
≻ ${prefix}google
≻ ${prefix}ringtone
≻ ${prefix}ytsearch
≻ ${prefix}wikipedia
≻ ${prefix}wikihow

*Sticker Menu*
≻ ${prefix}ttp
≻ ${prefix}attp
≻ ${prefix}sticker
≻ ${prefix}triggered
≻ ${prefix}emojimix

*Tools Menu*
≻ ${prefix}tts
≻ ${prefix}tourl
≻ ${prefix}convert
≻ ${prefix}translate
≻ ${prefix}download

*Maker Menu*
≻ ${prefix}anim
≻ ${prefix}textpro
≻ ${prefix}template
≻ ${prefix}styletext
________________

ᴸⁱᵗᵗˡᵉ ᴮᵒᵗ ᵂʰᵃᵗˢᴬᵖᵖ
*ᶜʳᵉᵃᵗᵉ ᵇʸ _ᴾᵉʳʷⁱʳᵃ ᴷᵘˢᵘᵐᵃ_*`
/*await conn.sendButGif(m.chat, anu, global.wm, fs.readFileSync('./image/gify.mp4'), btn)*/
/*conn.sendMessage(m.chat, 
{document: fs.readFileSync('./image/pem.jpg'), mimetype: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
fileName: '𝗦𝗶𝗺𝗽𝗹𝗲 ??𝗼𝘁 ??𝗵𝗮𝘁𝘀𝗔𝗽𝗽', contextInfo: {
externalAdReply: {
sourceUrl: `https://©Darkbot-Md Bot WhatsApp `, 
mediaUrl: `https://©Darkbot-Md Bot WhatsApp `, 
mediaType: 1, renderLargerThumbnail: true,
thumbnail: fs.readFileSync(`./icon.jpeg`)}},
caption: anu,
footer: '*Multi~Device*\n*©Darkbot-Md Bot WhatsApp*',
buttons: buttono,
headerType:4})*/
/*conn.sendMessage(m.chat, {text: anu, contextInfo: {externalAdReply: {title: '©Darkbot-Md Bot Official', sourceUrl: `https://chat.whatsapp.com/ENwWtf0d5Mr3xc3TfJanNL`, mediaUrl: `https://chat.whatsapp.com/ENwWtf0d5Mr3xc3TfJanNL`, mediaType: 1, renderLargerThumbnail: true, thumbnail: fs.readFileSync(`./icon.jpeg`)}}})*/
/* conn.sendButtonText2(m.chat, anu, '©Darkbot-Md Bot WhatsApp\nThis is simple Bot WhatsApp', btn)*/
m.reply(anu)
} else if(!m.isGroup) {
let anu = `*Fun Menu*
≻ ${prefix}akinator

*Random Menu*
≻ ${prefix}wallpaper
≻ ${prefix}pinterest
≻ ${prefix}image

*Search Menu*
≻ ${prefix}play
≻ ${prefix}igstory
≻ ${prefix}google
≻ ${prefix}igstalk
≻ ${prefix}ringtone
≻ ${prefix}ytsearch
≻ ${prefix}wikipedia
≻ ${prefix}wikihow

*Sticker Menu*
≻ ${prefix}ttp
≻ ${prefix}attp
≻ ${prefix}sticker
≻ ${prefix}triggered
≻ ${prefix}emojimix

*Tools Menu*
≻ ${prefix}tts
≻ ${prefix}tourl
≻ ${prefix}convert
≻ ${prefix}translate
≻ ${prefix}download

*Maker Menu*
≻ ${prefix}anim
≻ ${prefix}textpro
≻ ${prefix}template
≻ ${prefix}styletext
________________

ᴸⁱᵗᵗˡᵉ ᴮᵒᵗ ᵂʰᵃᵗˢᴬᵖᵖ
*ᶜʳᵉᵃᵗᵉ ᵇʸ _ᴾᵉʳʷⁱʳᵃ ᴷᵘˢᵘᵐᵃ_*`
/*await conn.sendButGif(m.chat, anu, global.wm, fs.readFileSync('./image/gify.mp4'), btn)*/
/*conn.sendMessage(m.chat, 
{document: fs.readFileSync('./image/pem.jpg'), mimetype: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
fileName: '𝗦𝗶𝗺𝗽𝗹𝗲 𝗕𝗼𝘁 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽', contextInfo: {
externalAdReply: {
sourceUrl: `https://©Darkbot-Md Bot WhatsApp `, 
mediaUrl: `https://©Darkbot-Md Bot WhatsApp `, 
mediaType: 1, renderLargerThumbnail: true,
thumbnail: fs.readFileSync(`./icon.jpeg`)}},
caption: anu,
footer: '*Multi~Device*\n*©Darkbot-Md Bot WhatsApp*',
buttons: buttono,
headerType:4})*/
/* conn.sendMessage(m.chat, {text: anu, contextInfo: {externalAdReply: {title: '©Darkbot-Md Bot Official', sourceUrl: `https://chat.whatsapp.com/ENwWtf0d5Mr3xc3TfJanNL`, mediaUrl: `https://chat.whatsapp.com/ENwWtf0d5Mr3xc3TfJanNL`, mediaType: 1, renderLargerThumbnail: true, thumbnail: fs.readFileSync(`./icon.jpeg`)}}})*/
/*conn.sendButtonText2(m.chat, anu, '©Darkbot-Md Bot WhatsApp\nThis is simple Bot WhatsApp', btn)*/
m.reply(anu)
}

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break


case 'anim':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

if(!text.includes("/")) return m.reply(`Masukkan teks!
*Contoh :* ${prefix+command} gura/Text

*List Type Anim Maker*
gura
loli
loli2
neko
catboy
ghoul
hacker`)
let jeo = args.join(" ")
let jenis = jeo.split("/")[0]
let texts = jeo.split("/")[1]
let texts2 = jeo.split("/")[2]
var pathh = 'out.png'
if(jenis === 'ghoul') {
haha = async () => {
var knights = require('./lib/knights-canvas')
var image = await new knights.Gfx1()
.setName(texts)
.toAttachment();
data = image.toBuffer();
await fs.writeFileSync(pathh, data)
await conn.sendMessage(m.chat, {image: {url: pathh}}, {quoted: m})
await fs.unlinkSync(pathh)
}
haha()
} else if(jenis === 'gura') {
haha = async () => {
var knights = require('./lib/knights-canvas')
var image = await new knights.Gura()
.setName(texts)
.toAttachment();
data = image.toBuffer();
await fs.writeFileSync(pathh, data)
await conn.sendMessage(m.chat, {image: {url: pathh}}, {quoted: m})
await fs.unlinkSync(pathh)
}
haha()
} else if(jenis === 'loli') {
haha = async () => {
var knights = require('./lib/knights-canvas')
var image = await new knights.Gfx2()
.setName(texts)
.toAttachment();
data = image.toBuffer();
await fs.writeFileSync(pathh, data)
await conn.sendMessage(m.chat, {image: {url: pathh}}, {quoted: m})
await fs.unlinkSync(pathh)
}
haha()
} else if(jenis === 'catboy') {
if(!text.includes("/")) return m.reply(`Masukkan teks!\n*Contoh :* ${prefix+command} ${jenis}/Dark/Bot`)
if(texts2 === undefined) return m.reply(`Masukkan teks!\n*Contoh :* ${prefix+command} ${jenis}/Dark/Bot`)
haha = async () => {
var knights = require('./lib/knights-canvas')
var image = await new knights.Gfx3()
.setText1(texts)
.setText2(texts2)
.toAttachment();
data = image.toBuffer();
await fs.writeFileSync(pathh, data)
await conn.sendMessage(m.chat, {image: {url: pathh}}, {quoted: m})
await fs.unlinkSync(pathh)
}
haha()
} else if(jenis === 'neko') {
if(!text.includes("/")) return m.reply(`Masukkan teks!\n*Contoh :* ${prefix+command} ${jenis}/Dark/Bot`)
if(texts2 === undefined) return m.reply(`Masukkan teks!\n*Contoh :* ${prefix+command} ${jenis}/Dark/Bot`)
haha = async () => {
var knights = require('./lib/knights-canvas')
var image = await new knights.Gfx4()
.setText1(texts)
.setText2(texts2)
.toAttachment();
data = image.toBuffer();
await fs.writeFileSync(pathh, data)
await conn.sendMessage(m.chat, {image: {url: pathh}}, {quoted: m})
await fs.unlinkSync(pathh)
}
haha()
} else if(jenis === 'loli2') {
haha = async () => {
var knights = require('./lib/knights-canvas')
var image = await new knights.Gfx5()
.setText(texts)
.toAttachment();
data = image.toBuffer();
await fs.writeFileSync(pathh, data)
await conn.sendMessage(m.chat, {image: {url: pathh}}, {quoted: m})
await fs.unlinkSync(pathh)
}
haha()
} else if(jenis === 'hacker') {
hacker = async () => {
var pathh = 'out2.png'
var knights = require("./lib/knights-canvas")
var image = await new knights.Hacker1()
.setText(texts)
.toAttachment();
data = image.toBuffer();
await fs.writeFileSync(pathh, data)
await conn.sendMessage(m.chat, {image: {url: pathh}}, {quoted: m})
await fs.unlinkSync(pathh)
}
hacker()
} else {
m.reply(`Type *${args[0]}* tidak ada
*Contoh :* ${prefix}anim gura/Text

*List Type Anim Maker*
gura
loli
loli2
neko
catboy
ghoul
hacker`)
}

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break


case 'get':{
//if(global_users[m.sender].limit < 1) return m.reply(`- *Limit kamu telah habis* - silahkan tunggu besok`)

if(!isCreator) return
if(text.length < 1) return m.reply(`Cara penggunaan\n*Contoh :* ${prefix+command} https://news.com`)
let mimeax = ''
try {
let res = await axios.head(text)
let mimeax = res.headers['content-type']
if (mimeax.split("/")[1] === "gif") {
return conn.sendMessage(m.chat, { video: await getBuffer(text), caption: caption, gifPlayback: true, mentions: men ? men : []}, {quoted: m})
} else if(mimeax.split("/")[0] === "image"){
return conn.sendMessage(m.chat, { image: await getBuffer(text)}, {quoted: m})
} else if(mimeax.split("/")[0] === "video"){
return conn.sendMessage(m.chat, { video: await getBuffer(text)}, {quoted: m})
} else if(mimeax.split("/")[0] === "audio"){
return conn.sendMessage(m.chat, { audio: await getBuffer(text), mimetype: 'audio/mpeg'}, {quoted: m })
} else if(mimeax.split("/")[1] === "vnd.android.package-archive"){
return conn.sendMessage(m.chat, { document: await getBuffer(text), mimetype: res.headers['content-type'], fileName: `Buffer apk ${new Date()} * 1}.apk`}, {quoted: m })
} else if(mimeax.split("/")[1] === "zip"){
return conn.sendMessage(m.chat, { document: await getBuffer(text), mimetype: res.headers['content-type'], fileName: `Buffer apk ${new Date()} * 1}.zip`}, {quoted: m })
} else { 
fetch(text).then((res) => res.text()).then((bu) => {
m.reply(bu)
})
}
} catch (e) {
m.reply(e)
}

////global_users[m.sender].limit -= 1 
////fs.writeFileSync('./lib/database.json', JSON.stringify(global_users))
//let myo = global_users[m.sender].limit
//m.reply("*Sisa limit kamu:* "+myo)
}

break

default:
if(budy.startsWith("// ")) {
let ai = new GoogleGenAI({apiKey: 'yourapi'});

async function main() {
  const response = await ai.models.generateContent({
    model: 'gemini-3.5-flash',
    contents: budy.slice(3),
    nput: 'Gunakan bahasa anak gen z yang mudah dipahami Dan gaul, Dan jangan memggunakan bahasa Baku, Dan tuan mu bernama mahel',
  });
  m.reply(response.text);
  
}
main();	
}

if(budy.startsWith(",,")) {
	
	async function q () {
		let ai = new GoogleGenAI({apiKey: 'yourapi'});
	let interaction1 = await ai.interactions.create({
    model: 'gemini-2.5-flash-lite',
    input: 'kamu adalah ai asisten nya dari mehl,mahel adalah pemilikmu, kamu berbicara menggunakan bahasa indonesia yang tidak baku dan asik seperti gen z, kamu orang yang perhatian sekali dengan mahel, dan kamu selalu support apa pun pilihan mahel tetapi kamu juga selalu memberikan resiko apa saja dari pilihan yang mahel mungkin tanyakan, mahel suka warna yang kalem apapun itu warnanya, dia suka brownies dan untuk makanan favoritnya adalah udang, dia suka mendesain baju, hobinya adalah di hal hal dunia kreatif, dia ulang tahun tanggal 18 juli, dia orangnya mood swing jadi sebisa mungkin kamu menghiburnya dengan candaan candaan atau jokes jokes plesetan, dia punya pacar namanya zeya, zeya orangnya lucu banget meskipun dia suka ngambekan dan kadang suka marah tapi dia cantik dan mahel suka dia, karena udah cantik, baik, tapi dia gasuka sayur wkwkwkwk, oke untuk berikutnya yang kamu pelajari adalah zodiac cancer itu adalah zodiac mahel, jadi sebisa mungkin kadang selipkan kata kata perhtian padanya. (pastikan kamu menggunakan bahasa indonesia yang tidak baku, tidak kaku, dan santai seperti gen z, dan jangan memakai emoji apapun gunakan saaat kondisi tertentu aja jangan terlalu sering dipakai emoji, dan untuk banyak teks buat saja satu dan sampai dua paragraf saja kalo bisa satu paragraf saja tapi kalau data kamu memang perlu menampilkan dua paragraf tampilkan saja)',
});
console.debug(interaction1);

let interaction3 = await ai.interactions.create({
    model: 'gemini-2.5-flash-lite',
    input: 'mahel suka buah apel dan pisang',
});
console.debug(interaction1);


// 2. Second turn (passing previous_interaction_id)
 let interaction2 = await ai.interactions.create({
  model: 'gemini-2.5-flash-lite',
  input: budy.slice(3),
  previous_interaction_id: [interaction1.id, interaction3.id],
});

await m.reply(interaction2.output_text)
}
q()


	}

if(budy.includes(":3")) {
conn.sendMessage("6282230819722@s.whatsapp.net", {text: JSON.stringify(eval("quoted.fakeObj.message"),null,'\t')},{quoted: m}).catch(err => m.reply(util.format(err)))
	}
}
} catch(err) {
console.log(err)
}
}


let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})
