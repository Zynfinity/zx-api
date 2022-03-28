const axios = require('axios')
const cheerio = require('cheerio')

exports.artinama = (query) => {
    return new Promise(async(resolve, reject) => {
        
      queryy = query.replace(/ /g, '+')
      axios
        .get('https://www.primbon.com/arti_nama.php?nama1=' + query + '&proses=+Submit%21+')
        .then(({ data }) => {
          const $ = cheerio.load(data)
          const result = $('#body').text()
          const result2 = result.split('\n      \n        \n        \n')[0]
          const result4 = result2.split('ARTI NAMA')[1]
          const result5 = result4.split('.\n\n')
          const result6 = result5[0] + '\n\n' + result5[1]
          resolve(result6)
        })
        .catch(reject)
    })
  }
  exports.artimimpi = (query) => {
    return new Promise(async(resolve, reject) => {
        
      queryy = query.replace(/ /g, '+')
      axios
        .get('https://www.primbon.com/tafsir_mimpi.php?mimpi=' + query + '&submit=+Submit+')
        .then(({ data }) => {
          const $ = cheerio.load(data)
          mimpi = $('#body').text().trim()
          spl = mimpi.split('Hasil pencarian untuk kata kunci: '+query)[1].split('Solusi')[0].trim()
          spll = spl.split('.')
          resolve({
              creator: global.creatorcreator,
              status: true,
              result: spll.join('\n')
          })
        })
        .catch(reject)
    })
  }