const axios = require('axios')
async function cekapi(apikey) {
    cek = await axios.get('https://restapi-beta.herokuapp.com/api/cekapikey?apikey=' + apikey)
    //if(!cek.data.status) return console.log('apikey invalid')
    return cek.data.status
}
module.exports = cekapi
