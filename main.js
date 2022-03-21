global.mess = {
  apikey: {
    status: false,
    message: 'apikey invalid, get apikey here https://wa.me/6281990498472?text=.getapikey'
  }
}
class zxclient{
    constructor(token, options = {}) {
        if (!token) throw new Error("Unknown Token: Apikey Missing");
        if (typeof token !== "string") throw new SyntaxError("Invalid Token: Token must be a String");
        global.token = token
        this.news = require('./lib/news')
        this.search = require('./lib/search')
        this.downloader = require('./lib/downloader')
      global.apikey
    }
}
module.exports = {zxclient}
