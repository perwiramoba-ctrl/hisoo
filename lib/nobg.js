const axios = require('axios');
const fs = require('fs')


function nobg(localFile) {
return new Promise((resolve, reject) => {
axios.post('https://bgremover.zyro.com/v1/ai/background-remover', {"image_data": `data:image/jpeg;base64,${fs.readFileSync(localFile).toString('base64')}`}).then(({data}) => {
let kuin = data
let bin = kuin.result.replace('data:image/PNG;base64,', '');
binaryData = new Buffer(bin, 'base64').toString('binary');
fs.writeFile("outnobg.png", binaryData, "binary", function(err) {
console.log(err)
let dat = {"file" : "outnobg.png"}
resolve(dat)
})
})
})
}

module.exports = { nobg }
//by Perwira 