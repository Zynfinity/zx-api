const axios = require('axios')
const cheerio = require('cheerio')

//chara myanimelist
exports.character = async(chara) => {
    return new Promise(async (resolve, reject) => {
        axios.get(`https://myanimelist.net/character.php?q=${chara}&cat=character`).then(async({data}) => {
            const $ = cheerio.load(data)
            url1 = $('#content').find('td:nth-child(2) > a').attr('href')
            const result = {}
            axios.get(url1).then(({data}) => {
                const $$ = cheerio.load(data)
                result.name = $$('#content').find('h2.normal_header').text()
                mentah = $$('#content > table > tbody > tr > td:nth-child(2)').text()
                bio = mentah.split(result.name)[1].split('\n\n')[0]
                spl = bio.split('\n')
                for(let i of spl){
                    if(i.split(': ')[1] != undefined){
                        result[i.split(':')[0].toLowerCase().replace(/ /g, '_')] = i.split(': ')[1]
                    }
                }
                result.picture = []
                axios.get(url1 + 'pics').then(({data}) => {
                    const $$$ = cheerio.load(data)
                    $$$('#content').find('div.picSurround > a').each(function(){
                        result.picture.push($$$(this).attr('href'))
                    })
                    resolve({
                        creator: global.creator,
                        status: true,
                        ...result
                    })
                })
            })
        })
    })
}