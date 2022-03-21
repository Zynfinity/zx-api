const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')
const creator = '@ihsanafajar'
const cekapi = require('./cekapi')
exports.merdekanews = async () => {
    return new Promise(async (resolve) => {
        if (!await cekapi(global.token)) return resolve(global.mess.apikey)
        axios.get('https://www.merdeka.com/peristiwa/').then(({
            data
        }) => {
            const $ = cheerio.load(data)
            const judul = []
            const upload = []
            const link = []
            const thumb = []
            const result = []
            $('#mdk-content-center > div.inner-content > ul > li > div').each(function(a, b) {
                deta = $(b).find('h3 > a').text()
                judul.push(deta)
                link.push('https://www.merdeka.com' + $(b).find('h3 > a').attr('href'))
                upload.push($(b).find('div > span').text())
                thumb.push($(b).find('div > a > img').attr('src'))
            })
            for (let i = 0; i < judul.length; i++) {
                result.push({
                    judul: judul[i],
                    upload_date: upload[i],
                    link: link[i],
                    thumb: thumb[i],
                })
            }
            resolve(result)
        })
    })
}
exports.metronews = async () => {
    return new Promise(async (resolve) => {
        if (!await cekapi(global.token)) return resolve(global.mess.apikey)
        axios.get('https://www.metrotvnews.com/news').then(({
            data
        }) => {
            const $ = cheerio.load(data)
            const judul = []
            const desc = []
            const link = []
            const thumb = []
            const tag = []
            const result = []
            $('body > div.container.layout > section.content > div > div.item-list.pt-20 > div > div > h3 > a').each(function(a, b) {
                judul.push($(b).attr('title'))
            })
            $('body > div.container.layout > section.content > div > div.item-list.pt-20 > div > div > p').each(function(a, b) {
                deta = $(b).text()
                desc.push(deta)
            })
            $('body > div.container.layout > section.content > div > div.item-list.pt-20 > div > div > h3 > a').each(function(a, b) {
                link.push('https://www.metrotvnews.com' + $(b).attr('href'))
            })
            $('body > div.container.layout > section.content > div > div.item-list.pt-20 > div > img').each(function(a, b) {
                thumb.push($(b).attr('src').replace('w=300', 'w=720'))
            })
            for (let i = 0; i < judul.length; i++) {
                result.push({
                    judul: judul[i],
                    link: link[i],
                    thumb: thumb[i],
                    deskripsi: desc[i],
                })
            }
            resolve(result)
        })
    })
}
