//require("./global")
const {
    default: Baileys,
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion,
    generateForwardMessageContent,
    prepareWAMessageMedia,
    generateWAMessageFromContent,
    generateMessageID,
    downloadContentFromMessage,
    jidDecode,
    proto
} = require('@whiskeysockets/baileys');

// --- PERBAIKAN IMPORT STORE UNTUK BAILEYS V7 ---
// Mencoba mengambil makeInMemoryStore dari berbagai kemungkinan path di v7
let makeInMemoryStore;
try {
    // Cara standard v6
    const pkg = require('@whiskeysockets/baileys');
    if (pkg.makeInMemoryStore) makeInMemoryStore = pkg.makeInMemoryStore;
    else {
        // Cara v7 (path spesifik, perhatikan huruf kecil 'store')
        makeInMemoryStore = require('@whiskeysockets/baileys/lib/Store').default || 
                            require('@whiskeysockets/baileys/lib/store').default;
    }
} catch (e) {
    // Fallback jika store gagal dimuat agar bot tidak crash
    console.log("⚠️ Peringatan: Gagal memuat makeInMemoryStore. Fitur anti-delete mungkin tidak jalan.");
    makeInMemoryStore = () => ({ bind: () => {} });
}
// -----------------------------------------------

const {
    Boom
} = require("@hapi/boom");
const pino = require("pino");
const fs = require("fs");
const readline = require("readline");

const FileType = require('file-type')
const path = require('path')
const {
    exec,
    spawn,
    execSync
} = require("child_process")
const PhoneNumber = require('awesome-phonenumber')
const {
    imageToWebp,
    videoToWebp,
    writeExifImg,
    writeExifVid,
    writeExifBug,
    writeExifNew
} = require('./lib/exif')
const {
    smsg,
    isUrl,
    generateMessageTag,
    getBuffer,
    getSizeMedia,
    fetchJson,
    await,
    sleep
} = require('./lib/myfunc')

// --- KONFIGURASI ---
const usePairingCode = true
// -------------------

global.packname = 'Mahel'
global.author = 'Punya mahel 😠'
global.limitawal = {
    "premium": 999999999,
    "free": 10
}
global.nama = "Stiker Created By"
global.wm = "@baaay1701\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"
global.myid = '6282230819722@s.whatsapp.net'
global.prefa = [',', '!', '.', '?', '#', '/']
global.owner = ['6282230819722','6289508136544', '6283123727298', '6287817973713','6289508136544@s.whatsapp.net', '6281236991484@s.whatsapp.net', '6283123727298@s.whatsapp.net', '6287817973713@s.whatsapp.net', '111274096640153@lid']
global.premium = ['6282230819722','6289508136544', '6283123727298', '6287817973713', '6289508136544@s.whatsapp.net', '6281236991484@s.whatsapp.net', '6283123727298@s.whatsapp.net', '6287817973713@s.whatsapp.net', '111274096640153@lid']

// Setup Store
const store = makeInMemoryStore({
    logger: pino().child({
        level: "silent",
        stream: "store"
    }),
});
global.store = store;

const question = (text) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise((resolve) => {
        rl.question(text, (answer) => {
            rl.close();
            resolve(answer)
        });
    });
};

const startConnect = async () => {
    try {
        const {
            state,
            saveCreds
        } = await useMultiFileAuthState(
            "./utils/baileys/sessions"
        );
        
        // Di v7, kita coba fetch version, kalau gagal pakai default
        let version;
        try {
            const v = await fetchLatestBaileysVersion();
            version = v.version;
        } catch (e) { console.log("Gagal fetch version, lanjut...") }

        const conn = Baileys({
            logger: pino({
                level: "silent"
            }),
            printQRInTerminal: !usePairingCode,
            // Browser identity untuk v7 agar pairing lancar
            browser: ["Ubuntu", "Chrome", "20.0.04"], 
            auth: state,
            version,
            generateHighQualityLinkPreview: true,
            patchMessageBeforeSending: (message) => {
                const requiresPatch = !!(
                    message.buttonsMessage ||
                    message.templateMessage ||
                    message.listMessage
                );
                if (requiresPatch) {
                    message = {
                        viewOnceMessageV2: {
                            message: {
                                messageContextInfo: {
                                    deviceListMetadataVersion: 2,
                                    deviceListMetadata: {},
                                },
                                ...message,
                            },
                        },
                    };
                }
                return message;
            },
        });


        // --- LOGIKA PAIRING CODE V7 ---
        if (usePairingCode && !conn.authState.creds.me) {
            console.log('Silakan masukkan nomor WhatsApp Anda untuk mendapatkan Pairing Code.');
            let phoneNumber = await question('Masukan Nomer Whatsapp: ');
            phoneNumber = phoneNumber.replace(/[^0-9]/g, '');
            if (phoneNumber.startsWith('0')) phoneNumber = '62' + phoneNumber.slice(1);
            
            setTimeout(async () => {
                try {
                    console.log(`Sedang meminta code untuk ${phoneNumber}...`);
                    let code = await conn.requestPairingCode(phoneNumber);
                    code = code?.match(/.{1,4}/g)?.join("-") || code;
                    console.log(`\n============================\nKODE PAIRING ANDA : ${code}\n============================\n`);
                } catch (err) {
                    console.log("Gagal request code.");
                    console.error(err);
                }
            }, 3000);
        }

        conn.ev.on("messages.upsert", async (chatUpdate) => {
            try {
                const chat = chatUpdate.messages[0];
                if (!chat.message) return
                chat.message = (Object.keys(chat.message)[0] === 'ephemeralMessage') ? chat.message.ephemeralMessage.message : chat.message
                if (chat.key && chat.key.remoteJid === 'status@broadcast') return await conn.readMessages([chat.key])
                if (chat.key.id.startsWith("3EB0")) return;
                const type = chat.message ? Object.keys(chat.message)[0] : "";
                if (chat && type == "protocolMessage") conn.ev.emit("message.delete", chat.message.protocolMessage.key);
                
                m = smsg(conn, chat)
                // console.log('[DEBUG] sender:', m.sender)
                // console.log('[DEBUG] isCreator:', global.owner.includes(m.sender))
                // console.log('[DEBUG] isPremium:', global.premium.includes(m.sender))        

                require("./hisoka")(conn, m, chatUpdate)
            } catch (err) {
                console.log(err)
            }
        });

        conn.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
            let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split `,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
            let buffer
            if (options && (options.packname || options.author)) {
                buffer = await writeExifVid(buff, options)
            } else {
                buffer = await videoToWebp(buff)
            }
            await conn.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
            return buffer
        }

        conn.downloadMediaMessage = async (message) => {
            let mime = (message.msg || message).mimetype || ''
            let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
            const stream = await downloadContentFromMessage(message, messageType)
            let buffer = Buffer.from([])
            for await (const chunk of stream) {
                buffer = Buffer.concat([buffer, chunk])
            }
            return buffer
        }

        conn.copyNForward = async (jid, message, forceForward = false, options = {}) => {
            let vtype
            if (options.readViewOnce) {
                message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
                vtype = Object.keys(message.message.viewOnceMessageV2.message)[0]
                delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
                delete message.message.viewOnceMessageV2.message[vtype].viewOnce
                message.message = {
                    ...message.message.viewOnceMessageV2.message
                }
            }
            let mtype = Object.keys(message.message)[0]
            let content = await generateForwardMessageContent(message, forceForward)
            let ctype = Object.keys(content)[0]
            let context = {}
            if (mtype != "conversation") context = message.message[mtype].contextInfo
            content[ctype].contextInfo = {
                ...context,
                ...content[ctype].contextInfo
            }
            const waMessage = await generateWAMessageFromContent(jid, content, options ? {
                ...content[ctype],
                ...options,
                ...(options.contextInfo ? {
                    contextInfo: {
                        ...content[ctype].contextInfo,
                        ...options.contextInfo
                    }
                } : {})
            } : {})
            await conn.relayMessage(jid, waMessage.message, {
                messageId: waMessage.key.id
            })
            return waMessage
        }

        conn.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
            let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split `,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
            let buffer
            if (options && (options.packname || options.author)) {
                buffer = await writeExifImg(buff, options)
            } else {
                buffer = await imageToWebp(buff)
            }
            await conn.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
            return buffer
        }
        
conn.linkUp = async (jid, tex, url, img, ttle, bdy, qtd = []) => {
var template = generateWAMessageFromContent(jid, proto.Message.fromObject({
extendedTextMessage: {
 text: tex, contextInfo: {mentionedJid: qtd, externalAdReply: {title: ttle, body: bdy, renderLargerThumbnail: true, mediaType: 1, mediaUrl: url, sourceUrl: url, thumbnail: img}}
},
}), {});conn.relayMessage(jid, template.message, { messageId: template.key.id })
 }
 
        conn.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
            let quoted = message.msg ? message.msg : message
            let mime = (message.msg || message).mimetype || ''
            let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
            const stream = await downloadContentFromMessage(quoted, messageType)
            let buffer = Buffer.from([])
            for await (const chunk of stream) {
                buffer = Buffer.concat([buffer, chunk])
            }
            let type = await FileType.fromBuffer(buffer)
            trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
            await fs.writeFileSync(trueFileName, buffer)
            return trueFileName
        }

        conn.sendText = (jid, text, quoted = '', options) => conn.sendMessage(jid, {
            text: text,
            ...options
        }, {
            quoted
        })

        conn.decodeJid = (jid) => {
            if (!jid) return jid
            if (/:\d+@/gi.test(jid)) {
                let decode = jidDecode(jid) || {}
                return decode.user && decode.server && decode.user + '@' + decode.server || jid
            } else return jid
        }

        conn.ev.on("creds.update", saveCreds);
        
        if (store && store.bind) {
            store.bind(conn.ev);
        }

        conn.ev.on("connection.update",
            async (connect) => {
                const {
                    lastDisconnect,
                    connection
                } = connect;
                if (connection == "connecting")
                    console.log("");
                if (connection == "open")
                    console.log("");
                if (connection === "close") {
                    let reason = new Boom(lastDisconnect.error).output.statusCode;
                    if (reason === DisconnectReason.badSession) {
                        console.log(``);
                        startConnect();
                    } else if (reason === DisconnectReason.connectionClosed) {
                        console.log("");
                        startConnect();
                    } else if (reason === DisconnectReason.connectionLost) {
                        console.log("");
                        startConnect();
                    } else if (reason === DisconnectReason.connectionReplaced) {
                        console.log("");
                        conn.logout();
                    } else if (reason === DisconnectReason.loggedOut) {
                        console.log(``);
                        conn.logout();
                    } else if (reason === DisconnectReason.restartRequired) {
                        console.log("");
                        startConnect();
                    } else if (reason === DisconnectReason.timedOut) {
                        console.log("");
                        startConnect();
                    } else {
                        conn.end(``);
                    }
                }
            });

    } catch (e) {
        console.log(e)
    }
};

startConnect().catch(err => console.log(err) && startConnect())