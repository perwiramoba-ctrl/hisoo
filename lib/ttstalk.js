const axios = require("axios");
const cheerio = require("cheerio");

function stalk(nam) {
return new Promise((resolve, reject) => {
axios.get("https://tiktok2k.com/users/" + nam).then(({data}) => {
kun = data
c = cheerio.load(kun)

kuun = {
	"name": c('div.user__title').find('h4').text(),
	"username": c('div.user__title').find('h1').text(),
	"videos": `${c('ul.list li.list__item').text().split("Videos")[0]} Videos`,
	"followers": `${c('ul.list li.list__item').text().split("Videos")[1].split("Followers")[0]} Followers`,
	"following": `${c('ul.list li.list__item').text().split("Videos")[1].split("Followers")[1].split("Following")[0]} Following`,
	"like": `${c('ul.list li.list__item').text().split("Videos")[1].split("Followers")[1].split("Following")[1].split("Like")[0]} Like`,
	"desc": c('div.user__info-desc').text().replace(/\n                    /g, "").replace(/\n                /g, ""),
	"profile": c("div.user__img").css("background-image").split("url('")[1].split("')")[0]
	}

resolve(kuun)
})
})
}

module.exports = { stalk }