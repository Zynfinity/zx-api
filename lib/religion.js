const axios = require('axios')
const cheerio = require('cheerio')

exports.jadwalshalat = async(loc) => {
    return new Promise(async (resolve, reject) => {
        const {data} = await axios.get('https://umrotix.com/jadwal-sholat/' + loc)
        const $ = cheerio.load(data)
        resolve({
            creator: global.creator,
            status: true,
            location: $('body > div > div.main-wrapper.scrollspy-action > div:nth-child(3) > h1').text().split('Sholat ')[1],
            imsyak: $('body').find('div.panel.daily').find('div:nth-child(1) > p:nth-child(2)').text(),
            subuh: $('body').find('div.panel.daily').find('div:nth-child(2) > p:nth-child(2)').text(),
            dzuhur: $('body').find('div.panel.daily').find('div:nth-child(3) > p:nth-child(2)').text(),
            ashar: $('body').find('div.panel.daily').find('div:nth-child(4) > p:nth-child(2)').text(),
            maghrib: $('body').find('div.panel.daily').find('div:nth-child(5) > p:nth-child(2)').text(),
            isya: $('body').find('div.panel.daily').find('div:nth-child(6) > p:nth-child(2)').text()
        })
    })
}