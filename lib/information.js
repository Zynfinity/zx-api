const axios = require('axios')
const cheerio = require('cheerio')
const creator = '@ihsanafajar'

exports.merdekanews = async () => {
    return new Promise(async (resolve) => {
        
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
exports.gempa = async () => {
    return new Promise(async (resolve, reject) => {
        axios
            .get('https://www.bmkg.go.id/gempabumi/gempabumi-dirasakan.bmkg')
            .then(({
                data
            }) => {
                const $ = cheerio.load(data)
                const drasa = []
                $('table > tbody > tr:nth-child(1) > td:nth-child(6) > span')
                    .get()
                    .map((rest) => {
                        dir = $(rest).text()
                        drasa.push(dir.replace('\t', ' '))
                    })
                teks = ''
                for (let i = 0; i < drasa.length; i++) {
                    teks += drasa[i] + '\n'
                }
                const rasa = teks
                const format = {
                    imagemap: $('div.modal-body > div > div:nth-child(1) > img').attr('src'),
                    magnitude: $('table > tbody > tr:nth-child(1) > td:nth-child(4)').text(),
                    kedalaman: $('table > tbody > tr:nth-child(1) > td:nth-child(5)').text(),
                    wilayah: $('table > tbody > tr:nth-child(1) > td:nth-child(6) > a').text(),
                    waktu: $('table > tbody > tr:nth-child(1) > td:nth-child(2)').text(),
                    lintang_bujur: $('table > tbody > tr:nth-child(1) > td:nth-child(3)').text(),
                    dirasakan: rasa,
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
exports.jadwalmplid = async () => {
    return new Promise(async (resolve, reject) => {
        axios.get('https://id-mpl.com/schedule').then(({
            data
        }) => {
            const $ = cheerio.load(data)
            const result = []
            week = 1
            data1 = []
            data2 = []
            jam = []
            replay = []
            for (let i = 57; i <= 64; i++) {
                $(`#mc-${i} > div > div > div`).each(function() {
                    tanggal = $(this).find('div.ticket-date.mb10.mt20').text()
                    $(this).find('div > span.teams-wrap > div > div.match-team1.text-center').each(function(a, b) {
                        data1.push({
                            a: $(b).find('div > div > b').text(),
                            score: $(b).find('div.font-title').text().trim()
                        })
                        result.push({
                            tanggal: tanggal,
                            week: week,
                            jam: '',
                            match: '',
                            score: '',
                            replay: ''
                        })
                    })
                    $(this).find('div > span.teams-wrap > div > div.match-team2.text-center').each(function(a, b) {
                        data2.push({
                            a: $(b).find('div > div > b').text(),
                            score: $(b).find('div.font-title').text().trim()
                        })
                    })
                    $(this).find('div > span.teams-wrap > div').each(function(a, b) {
                        jam.push($(b).find('div.match-score.center > div > b').text())
                        replay.push($(b).find('div.match-vs.match-link.replay > a').attr('href'))
                    })
                })
                for (let i = 0; i < data1.length; i++) {
                    result[i].match = `${data1[i].a} Vs ${data2[i].a}`
                    result[i].jam = jam[i],
                        result[i].replay = replay[i] ? replay[i] : 'Coming Soon'
                    result[i].score = data1[i].score ? `${data1[i].score} : ${data2[i].score}` : 'Coming Soon'
                }
                week += 1
            }
            resolve(result)
        })
    })
}
exports.cuaca = async (place) => {
    var data = await axios.get(`https://www.accuweather.com/id/search-locations?query=${place}`)
    plink = data.request.res.responseUrl.replace('/en/', '/id/').replace('weather-forecast', 'current-weather')
    var $ = cheerio.load(data.data)
    const result = {}
    if ($('body').find('div.locations-list.content-module > a:nth-child(1)').attr('href') != undefined) {
      var data = await axios.get('https://www.accuweather.com' + $('body').find('div.locations-list.content-module > a:nth-child(1)').attr('href'))
      plink = data.request.res.responseUrl.replace('/en/', '/id/').replace('weather-forecast', 'current-weather')
      var $ = cheerio.load(data.data)
    }
    var data = await axios.get(plink)
    var $ = cheerio.load(data.data)
    result['tempat'] = $('body > div > div.nfl-header > div.header-outer > div > a.header-city-link > h1').text()
    result['suhu'] = $('body').find('div.display-temp').text().trim()
    result['deskripsi'] = $('body').find('div.current-weather-card.card-module.content-module.non-ad > div.phrase').text()
    $('body > div > div.two-column-page-content > div.page-column-1 > div.content-module > div.current-weather-card.card-module.content-module.non-ad > div.current-weather-details > div > div').each(function (a, b) {
      if ($(b).find('div:nth-child(1)').text() != 'RealFeel Shade™') {
        result[$(b).find('div:nth-child(1)').text().replace(/ /g, '_').toLowerCase()] = $(b).find('div:nth-child(2)').text()
      }
    })
    return result
  }