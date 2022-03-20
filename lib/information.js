const axios = require('axios')
const cheerio = require('cheerio')
const creator = '@ihsanafajar'
exports.gempa = async () => {
    return new Promise(async (resolve, reject) => {
      axios
        .get('https://www.bmkg.go.id/gempabumi/gempabumi-dirasakan.bmkg')
        .then(({ data }) => {
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
  exports.jadwalmplid = async() => {
    return new Promise((resolve, reject) => {
        axios.get('https://id-mpl.com/schedule').then(({data}) => {
            const $ = cheerio.load(data)
            const result = []
            week = 1
            data1 = []
            data2 = []
            jam = []
            replay = []
            for(let i=57; i<=64; i++){
                $(`#mc-${i} > div > div > div`).each(function(){
                    tanggal = $(this).find('div.ticket-date.mb10.mt20').text()
                    $(this).find('div > span.teams-wrap > div > div.match-team1.text-center').each(function(a, b){
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
                    $(this).find('div > span.teams-wrap > div > div.match-team2.text-center').each(function(a, b){
                        data2.push({
                            a: $(b).find('div > div > b').text(),
                            score: $(b).find('div.font-title').text().trim()
                        })
                    })
                    $(this).find('div > span.teams-wrap > div').each(function(a, b){
                        jam.push($(b).find('div.match-score.center > div > b').text())
                        replay.push($(b).find('div.match-vs.match-link.replay > a').attr('href'))
                    })
                })
                for(let i=0; i<data1.length; i++){
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