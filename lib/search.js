const axios = require('axios')
const cheerio = require('cheerio')
const creator = '@ihsanafajar'
exports.happymod = (query) => {
    return new Promise((resolve, reject) => {
      axios
        .get('https://www.happymod.com/search.html?q=' + query)
        .then(({ data }) => {
          const $ = cheerio.load(data)
          const nama = []
          const link = []
          const rating = []
          const thumb = []
          const format = []
          $('body > div.container-row.clearfix.container-wrap > div.container-left > section > div > div > h3 > a').each(function (a, b) {
            nem = $(b).text()
            nama.push(nem)
            link.push('https://happymod.com' + $(b).attr('href'))
          })
          $('body > div.container-row.clearfix.container-wrap > div.container-left > section > div > div > div.clearfix > span').each(function (c, d) {
            rat = $(d).text()
            rating.push(rat)
          })
          $('body > div.container-row.clearfix.container-wrap > div.container-left > section > div > a > img').each(function (e, f) {
            thumb.push($(f).attr('data-original'))
          })
          for (let i = 0; i < link.length; i++) {
            format.push({
              judul: nama[i],
              thumb: thumb[i],
              rating: rating[i],
              link: link[i],
            })
          }
          format != '' ? resolve({
              creator: creator,
              status: true,
              data: format
          }) : resolve({
              creator: creator,
              status: false
          })
        })
        .catch(reject)
    })
  }
  exports.gore = async (query) => {
    return new Promise(async (resolve, reject) => {
      axios.get('https://seegore.com/?s=' + query).then((dataa) => {
        const $$$ = cheerio.load(dataa)
        pagina = $$$('#main > div.container.main-container > div > div.bb-col.col-content > div > div > div > div > nav > ul > li:nth-child(4) > a').text()
        rand = Math.floor(Math.random() * pagina) + 1
        if (rand === 1) {
          slink = 'https://seegore.com/?s=' + query
        } else {
          slink = `https://seegore.com/page/${rand}/?s=${query}`
        }
        axios
          .get(slink)
          .then(({ data }) => {
            const $ = cheerio.load(data)
            const link = []
            const judul = []
            const uploader = []
            const format = []
            const thumb = []
            $('#post-items > li > article > div.content > header > h2 > a').each(function (a, b) {
              link.push($(b).attr('href'))
            })
            $('#post-items > li > article > div.content > header > h2 > a').each(function (c, d) {
              jud = $(d).text()
              judul.push(jud)
            })
            $('#post-items > li > article > div.content > header > div > div.bb-cat-links > a').each(function (e, f) {
              upl = $(f).text()
              uploader.push(upl)
            })
            $('#post-items > li > article > div.post-thumbnail > a > div > img').each(function (g, h) {
              thumb.push($(h).attr('src'))
            })
            for (let i = 0; i < link.length; i++) {
              format.push({
                judul: judul[i],
                uploader: uploader[i],
                thumb: thumb[i],
                link: link[i],
              })
            }
            format != '' ? resolve({
                creator: 'Fajar Ihsana',
                status: true,
                data: format,
              }) : resolve({
                creator: 'Fajar Ihsana',
                status: false
              })
          })
          .catch(reject)
      })
    })
  }
  exports.layarkita = async (query) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`http://167.99.71.200/?s=${query}`)
        .then((data) => {
          const $ = cheerio.load(data.data)
          const judul = []
          const genre = []
          const thumb = []
          const link = []
          const format = []
          $('div > div.item-article > header > h2 > a').each(function (a, b) {
            deta = $(b).text()
            judul.push(deta)
          })
          $('div > div.item-article > header > div.gmr-movie-on').each(function (a, b) {
            deta = $(b).text()
            genre.push(deta)
          })
          $('div > div.content-thumbnail.text-center > a > img').each(function (a, b) {
            thumb.push($(b).attr('src'))
          })
          $('div > div.item-article > header > div.gmr-watch-movie > a').each(function (a, b) {
            link.push($(b).attr('href'))
          })
          for (let i = 0; i < judul.length; i++) {
            format.push({
              judul: judul[i],
              genre: genre[i],
              thumb: thumb[i],
              link_nonton: link[i],
            })
          }
          if (format == '') {
            resolve({
              status: 'error',
            })
          } else {
            resolve(format)
          }
        })
        .catch(reject)
    })
  }
  exports.anoboy = (query) => {
    return new Promise((resolve, reject) => {
      axios
        .get('https://anoboy.digital/?s=' + query)
        .then(({ data }) => {
          const $ = cheerio.load(data)
          const format = []
          const link = []
          const judul = []
          const thumb = []
          const uptime = []
          const result = []
          $('body > div.wrap > div.container > div.column-content > a').each(function () {
            result.push({
              title: $(this).find('div > div.amvj > h3').text(),
              uptime: $(this).find('div > div.jamup').text(),
              thumbnail: $(this).find('div > amp-img').attr('src'),
              link: $(this).attr('href')
            })
          })
          result != '' ? resolve({
            creator: creator,
            status: true,
            data: result,
          }) : resolve({
              creator: creator,
              status: false
          })
        })
        .catch(reject)
    })
  }
  exports.zerochan = (query) => {
    return new Promise((resolve, reject) => {
      axios
        .get('https://www.zerochan.net/search?q=' + query)
        .then(({ data }) => {
          const $ = cheerio.load(data)
          const judul = []
          const result = []
          const id = []
          $('#thumbs2 > li > a > img').each(function (a, b) {
            if (!$(b).attr('alt').startsWith('https://static.zerochan.net/')) {
              judul.push($(b).attr('alt'))
            }
          })
          $('#thumbs2 > li > a').each(function (a, b) {
            id.push($(b).attr('href'))
          })
          for (let i = 0; i < judul.length; i++) {
            result.push('https://s1.zerochan.net/' + judul[i].replace(/\ /g, '.') + '.600.' + id[i].split('/')[1] + '.jpg')
          }
          result != '' ? resolve({
            creator: creator,
            status: true,
            result: result,
          }) : resolve({
              creator: creator,
              status: false
          })
        })
        .catch(reject)
    })
  }
  exports.pinterest = async (querry) => {
    return new Promise(async (resolve, reject) => {
      axios
        .get('https://id.pinterest.com/search/pins/?autologin=true&q=' + querry, {
          headers: {
            cookie:
              '_auth=1; _b="AVna7S1p7l1C5I9u0+nR3YzijpvXOPc6d09SyCzO+DcwpersQH36SmGiYfymBKhZcGg="; _pinterest_sess=TWc9PSZHamJOZ0JobUFiSEpSN3Z4a2NsMk9wZ3gxL1NSc2k2NkFLaUw5bVY5cXR5alZHR0gxY2h2MVZDZlNQalNpUUJFRVR5L3NlYy9JZkthekp3bHo5bXFuaFZzVHJFMnkrR3lTbm56U3YvQXBBTW96VUgzVUhuK1Z4VURGKzczUi9hNHdDeTJ5Y2pBTmxhc2owZ2hkSGlDemtUSnYvVXh5dDNkaDN3TjZCTk8ycTdHRHVsOFg2b2NQWCtpOWxqeDNjNkk3cS85MkhhSklSb0hwTnZvZVFyZmJEUllwbG9UVnpCYVNTRzZxOXNJcmduOVc4aURtM3NtRFo3STlmWjJvSjlWTU5ITzg0VUg1NGhOTEZzME9SNFNhVWJRWjRJK3pGMFA4Q3UvcHBnWHdaYXZpa2FUNkx6Z3RNQjEzTFJEOHZoaHRvazc1c1UrYlRuUmdKcDg3ZEY4cjNtZlBLRTRBZjNYK0lPTXZJTzQ5dU8ybDdVS015bWJKT0tjTWYyRlBzclpiamdsNmtpeUZnRjlwVGJXUmdOMXdTUkFHRWloVjBMR0JlTE5YcmhxVHdoNzFHbDZ0YmFHZ1VLQXU1QnpkM1FqUTNMTnhYb3VKeDVGbnhNSkdkNXFSMXQybjRGL3pyZXRLR0ZTc0xHZ0JvbTJCNnAzQzE0cW1WTndIK0trY05HV1gxS09NRktadnFCSDR2YzBoWmRiUGZiWXFQNjcwWmZhaDZQRm1UbzNxc21pV1p5WDlabm1UWGQzanc1SGlrZXB1bDVDWXQvUis3elN2SVFDbm1DSVE5Z0d4YW1sa2hsSkZJb1h0MTFpck5BdDR0d0lZOW1Pa2RDVzNySWpXWmUwOUFhQmFSVUpaOFQ3WlhOQldNMkExeDIvMjZHeXdnNjdMYWdiQUhUSEFBUlhUVTdBMThRRmh1ekJMYWZ2YTJkNlg0cmFCdnU2WEpwcXlPOVZYcGNhNkZDd051S3lGZmo0eHV0ZE42NW8xRm5aRWpoQnNKNnNlSGFad1MzOHNkdWtER0xQTFN5Z3lmRERsZnZWWE5CZEJneVRlMDd2VmNPMjloK0g5eCswZUVJTS9CRkFweHc5RUh6K1JocGN6clc1JmZtL3JhRE1sc0NMTFlpMVErRGtPcllvTGdldz0=; _ir=0',
          },
        })
        .then(({ data }) => {
          const $ = cheerio.load(data)
          const result = []
          const hasil = []
          $('div > a')
            .get()
            .map((b) => {
              const link = $(b).find('img').attr('src')
              result.push(link)
            })
          result.forEach((v) => {
            if (v == undefined) return
            hasil.push(v.replace(/236/g, '736'))
          })
          hasil.shift()
          hasil != '' ? resolve({
              creator: creator,
              status: true,
              result: hasil
          }) : resolve({
                creator: creator,
                status: false
            })
        })
    })
  }
  exports.sticker = async (query) => {
    return new Promise((resolve) => {
      axios.get(`https://getstickerpack.com/stickers?query=${query}`).then(({ data }) => {
        const $ = cheerio.load(data)
        const link = []
        $('#stickerPacks > div > div:nth-child(3) > div > a').each(function (a, b) {
          link.push($(b).attr('href'))
        })
        rand = link[Math.floor(Math.random() * link.length)]
        axios.get(rand).then(({ data }) => {
          const $$ = cheerio.load(data)
          const url = []
          $$('#stickerPack > div > div.row > div > img').each(function (a, b) {
            url.push($$(b).attr('src').split('&d=')[0])
          })
          url != '' ? resolve({
            creator: 'Fajar Ihsana',
            status: true,
            title: $$('#intro > div > div > h1').text(),
            author: $$('#intro > div > div > h5 > a').text(),
            author_link: $$('#intro > div > div > h5 > a').attr('href'),
            sticker: url,
          }) : resolve({creator: creator, status: false})
        })
      })
    })
  }
  exports.rexdl = async (query) => {
    return new Promise((resolve) => {
      axios.get('https://rexdl.com/?s=' + query).then(({ data }) => {
        const $ = cheerio.load(data)
        const judul = []
        const jenis = []
        const date = []
        const desc = []
        const link = []
        const thumb = []
        const result = []
        $('div > div.post-content').each(function (a, b) {
          judul.push($(b).find('h2.post-title > a').attr('title'))
          jenis.push($(b).find('p.post-category').text())
          date.push($(b).find('p.post-date').text())
          desc.push($(b).find('div.entry.excerpt').text())
          link.push($(b).find('h2.post-title > a').attr('href'))
        })
        $('div > div.post-thumbnail > a > img').each(function (a, b) {
          thumb.push($(b).attr('data-src'))
        })
        for (let i = 0; i < judul.length; i++) {
          result.push({
            judul: judul[i],
            kategori: jenis[i],
            upload_date: date[i],
            deskripsi: desc[i],
            thumb: thumb[i],
            link: link[i],
          })
        }
        resolve(result != '' ? {creator: creator, status: false, result: result} : {creator: creator, status: false})
      })
    })
  }
  exports.chord = async (query) => {
    return new Promise((resolve, reject) => {
      axios.get('https://www.gitagram.com/chord-gitar/depan?do=search&q=' + query).then(({ data }) => {
        const $$ = cheerio.load(data)
        plink = $$('#dokuwiki__content > div.typo.position-relative > div.search_fulltextresult > dl > div:nth-child(1) > dt > a').attr('href')
        if (plink == undefined) return resolve('Chord tidak ditemukan!')
        axios.get(plink).then(({ data }) => {
          const $ = cheerio.load(data)
          chords = $('#dokuwiki__content').find('h3.sectionedit1').text()
          $('#dokuwiki__content').each(function (a, b) {
            chords += $(b).find('div.song-with-chords').text().replace(/#/g, '')
          })
          resolve(chords)
        })
      })
    })
  }
  exports.kbbi = async (kata) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`https://kbbi.kemdikbud.go.id/entri/` + kata)
        .then((data) => {
          const $ = cheerio.load(data.data)
          const arti = []
          const undef = $('body > div.container.body-content > h4:nth-child(6)').text()
          if (undef == ' Entri tidak ditemukan.')
            return resolve({
              creator: creator,
              status: false
            })
          const lema = $('body > div.container.body-content > h2').text()
          $('body > div.container.body-content > ol > li').each(function (a, b) {
            deta = $(b).text()
            if(deta.split('a        ')[1] != undefined) arti.push(deta.split('a        ')[1])
          })
          resolve({
            creator: creator,
            status: true,
            lema: lema,
            arti: arti,
          })
        })
        .catch(reject)
    })
  }
  exports.gsmarena = async (query) => {
    try{
    var { data } = await axios.get('https://www.gsmarena.com/res.php3?sSearch=' + query)
    }catch{
        return({creator: creator, status: false})
    }
    const $ = cheerio.load(data)
    const result = {}
    link = $('#review-body > div > ul > li > a').attr('href')
    var { data } = await axios.get('https://www.gsmarena.com/' + link)
    const $$ = cheerio.load(data)
    result['title'] = $$('#body').find('div.article-info-line.page-specs.light.border-bottom > h1').text()
    result['thumbnail'] = $$('#body').find('div > a > img').attr('src')
    $$('#specs-list > table').each(function (a, b) {
      result[$$(b).find('tr > th').text().toLowerCase().replace(/ /g, '')] = $$(b).find('td.nfo').text().trim()
    })
    return result
  }
  exports.wallpaper = (chara) => {
    return new Promise((resolve, reject) => {
      axios
        .get('https://wall.alphacoders.com/search.php?search=' + chara + '&filter=4K+Ultra+HD')
        .then(({ data }) => {
          const $ = cheerio.load(data)
          const result = []
          $('div.boxgrid > a > picture').each(function (a, b) {
            result.push($(b).find('img').attr('src').replace('thumbbig-', ''))
          })
          resolve(result != '' ? {creator: creator, status: true, result: result} : {creator: creator, status: false})
        })
        .catch(reject)
    })
  }
  exports.carigc = (nama) => {
    return new Promise((resolve, reject) => {
      axios
        .get('http://ngarang.com/link-grup-wa/daftar-link-grup-wa.php?search=' + nama + '&searchby=name')
        .then(({ data }) => {
          const $ = cheerio.load(data)
          const result = []
          const lnk = []
          const nm = []
          $('div.wa-chat-title-container').each(function (a, b) {
            const limk = $(b).find('a').attr('href')
            lnk.push(limk)
          })
          $('div.wa-chat-title-text').each(function (c, d) {
            const name = $(d).text()
            nm.push(name)
          })
          for (let i = 0; i < lnk.length; i++) {
            result.push({
              nama: nm[i].split('. ')[1],
              link: lnk[i].split('?')[0],
            })
          }
          resolve(result != '' ? {creator: creator, status: true, result: result} : {creator: creator, status: false})
        })
        .catch(reject)
    })
  }
  exports.konachan = (chara) => {
    return new Promise((resolve, reject) => {
      let text = chara.replace(' ', '_')
      axios
        .get('https://konachan.net/post?tags=' + text + '+')
        .then(({ data }) => {
          const $$ = cheerio.load(data)
          const no = []
          $$('div.pagination > a').each(function (c, d) {
            no.push($$(d).text())
          })
          let mat = Math.floor(Math.random() * no.length)
          axios.get('https://konachan.net/post?page=' + mat + '&tags=' + text + '+').then(({ data }) => {
            const $ = cheerio.load(data)
            const result = []
            $('#post-list > div.content > div:nth-child(4) > ul > li > a.directlink.largeimg').each(function (a, b) {
              result.push($(b).attr('href'))
            })
            resolve(result != '' ? {creator: creator, status: true, result: result} : {creator: creator, status: false})
          })
        })
        .catch(reject)
    })
  }