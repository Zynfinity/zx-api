const axios = require('axios')
const cheerio = require('cheerio')
const cekapi = require('./cekapi')
const creator = '@ihsanafajar'
exports.facebook = async (url) => {
    return new Promise(async (resolve, reject) => {
        if (!await cekapi(global.token)) return resolve(global.mess.apikey)
        const param = {
            q: url
        }
        const {
            data
        } = await axios.request({
            url: 'https://fbdownloader.online/api/analyze',
            method: 'post',
            data: new URLSearchParams(Object.entries(param)),
            headers: {
                'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
            }
        })
        resolve(data)
    })
}
exports.twitter = async (url) => {
    return new Promise(async (resolve, reject) => {
        if (!await cekapi(global.token)) return resolve(global.mess.apikey)
        const param = {
            URL: url
        }
        const {
            data
        } = await axios.request('https://twdown.net/download.php', {
            method: 'post',
            data: new URLSearchParams(Object.entries(param)),
            headers: {
                'cookie': '_ga=GA1.2.1179402207.1647696060; _gid=GA1.2.2120988570.1647696060; _gat=1; __gads=ID=656e88e6682c39b4-2253281b06d100e1:T=1647696058:RT=1647696058:S=ALNI_MZ39j_NBhBuM0sjafGz5pKyigruOQ',
                'user-agent': 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'
            }
        })
        const $ = cheerio.load(data)
        user = $('body').find('div:nth-child(2) > h4 > strong').text()
        user != '' ? resolve({
            creator: 'Fajar Ihsana',
            status: true,
            username: user,
            caption: $('body').find('div:nth-child(2) > p').text(),
            thumbnail: $('body').find('div:nth-child(1) > img').attr('src'),
            hd: $('body').find('table > tbody > tr:nth-child(1) > td:nth-child(4) > a').attr('href'),
            sd: $('body').find('table > tbody > tr:nth-child(2) > td:nth-child(4) > a').attr('href')
        }) : resolve({
            creator: 'Fajar Ihsana',
            status: false
        })
    })
}
exports.soundcloud = async (link) => {
    return new Promise(async (resolve, reject) => {
        if (!await cekapi(global.token)) return resolve(global.mess.apikey)
        const param = {
            value: link,
            '2311a6d881b099dc3820600739d52e64a1e6dcfe55097b5c7c649088c4e50c37': '710c08f2ba36bd969d1cbc68f59797421fcf90ca7cd398f78d67dfd8c3e554e3',
        }
        const {
            data
        } = await axios.request('https://www.klickaud.co/download.php', {
            method: 'post',
            data: new URLSearchParams(Object.entries(param)),
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
            }
        })
        const $ = cheerio.load(data)
        resolve({
            judul: $('#header > div > div > div.col-lg-8 > div > table > tbody > tr > td:nth-child(2)').text(),
            download_count: $('#header > div > div > div.col-lg-8 > div > table > tbody > tr > td:nth-child(3)').text(),
            thumb: $('#header > div > div > div.col-lg-8 > div > table > tbody > tr > td:nth-child(1) > img').attr('src'),
            link: $('#dlMP3').attr('onclick').split(`downloadFile('`)[1].split(`',`)[0],
        })
    })
}
exports.tiktok = async (URL) => {
    return new Promise(async (resolve, rejecet) => {
        if (!await cekapi(global.token)) return resolve(global.mess.apikey)
        axios
            .get('https://musicaldown.com/id', {
                headers: {
                    'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
                },
            })
            .then((res) => {
                const $ = cheerio.load(res.data)
                const url_name = $('#link_url').attr('name')
                const token_name = $('#submit-form > div').find('div:nth-child(1) > input[type=hidden]:nth-child(2)').attr('name')
                const token_ = $('#submit-form > div').find('div:nth-child(1) > input[type=hidden]:nth-child(2)').attr('value')
                const verify = $('#submit-form > div').find('div:nth-child(1) > input[type=hidden]:nth-child(3)').attr('value')
                let data = {
                    [`${url_name}`]: URL,
                    [`${token_name}`]: token_,
                    verify: verify,
                }
                axios
                    .request({
                        url: 'https://musicaldown.com/id/download',
                        method: 'post',
                        data: new URLSearchParams(Object.entries(data)),
                        headers: {
                            'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
                            cookie: res.headers['set-cookie'],
                        },
                    })
                    .then((respon) => {
                        const ch = cheerio.load(respon.data)
                        axios
                            .request({
                                url: 'https://musicaldown.com/id/mp3',
                                method: 'post',
                                headers: {
                                    'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
                                    cookie: res.headers['set-cookie'],
                                },
                            })
                            .then((resaudio) => {
                                const hc = cheerio.load(resaudio.data)
                                const a = {
                                    creator: 'Fajar Ihsana',
                                    video: {
                                        preview: ch('body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l4 > img').attr('src'),
                                        link1: ch('body > div.welcome.section > div').find('div:nth-child(2) > div.col.s12.l8 > a:nth-child(5)').attr('href'),
                                        link2: ch('body > div.welcome.section > div').find('div:nth-child(2) > div.col.s12.l8 > a:nth-child(7)').attr('href'),
                                        link3: ch('body > div.welcome.section > div').find('div:nth-child(2) > div.col.s12.l8 > a:nth-child(9)').attr('href'),
                                    },
                                    audio: {
                                        judul: hc('body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8').find('h2').text().split(': ')[1],
                                        link1: hc('body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8 > a:nth-child(5)').attr('href'),
                                        link2: hc('body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8 > a:nth-child(7)').attr('href'),
                                        link3: hc('body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8 > a:nth-child(9)').attr('href')
                                    }
                                }
                                const b = {
                                    creator: 'Fajar Ihsana',
                                    audio: {
                                        judul: hc('body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8').find('h2').text().split(': ')[1],
                                        link1: ch('body > div.welcome.section > div').find('div:nth-child(2) > div.col.s12.l8 > a:nth-child(5)').attr('href'),
                                        link2: ch('body > div.welcome.section > div').find('div:nth-child(2) > div.col.s12.l8 > a:nth-child(7)').attr('href'),
                                        link3: ch('body > div.welcome.section > div').find('div:nth-child(2) > div.col.s12.l8 > a:nth-child(9)').attr('href'),
                                    }
                                }
                                resolve(URL.includes('/music/') ? b : a)
                            })
                    })
            })
    })
}
exports.instagram = async (link) => {
    return new Promise(async (resolve, reject) => {
        if (!await cekapi(global.token)) return resolve(global.mess.apikey)
        const param = {
            url: link,
            submit: ''
        }
        const {
            data
        } = await axios.request('https://downloadgram.org/#downloadhere', {
            method: 'post',
            data: new URLSearchParams(Object.entries(param)),
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
            }
        })
        const $ = cheerio.load(data)
        const result = []
        $('#downloadBox > a').each(function(a, b) {
            result.push($(b).attr('href'))
        })
        resolve(result != '' ? {
            creator: creator,
            status: true,
            result: result
        } : {
            creator: creator,
            status: false
        })
    })
}
exports.gore = async (link) => {
    return new Promise(async (resolve, reject) => {
        if (!await cekapi(global.token)) return resolve(global.mess.apikey)
        axios
            .get(link)
            .then(({
                data
            }) => {
                const $$ = cheerio.load(data)
                const format = {
                    judul: $$('div.single-main-container > div > div.bb-col.col-content > div > div > div > div > header > h1').text(),
                    views: $$('div.single-main-container > div > div.bb-col.col-content > div > div > div > div > div.s-post-meta-block.bb-mb-el > div > div > div.col-r.d-table-cell.col-md-6.col-sm-6.text-right-sm > div > span > span.count').text(),
                    comment: $$('div.single-main-container > div > div.bb-col.col-content > div > div > div > div > div.s-post-meta-block.bb-mb-el > div > div > div.col-r.d-table-cell.col-md-6.col-sm-6.text-right-sm > div > a > span.count').text(),
                    link: $$('video > source').attr('src'),
                }
                const result = {
                    creator: 'Fajar Ihsana',
                    data: format,
                }
                resolve(result)
            })
            .catch(reject)
    })
}
