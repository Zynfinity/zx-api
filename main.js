const cekapi = require('./lib/cekapi');
const axios = require('axios')
class zxclient{
    constructor(token, options = {}) {
        if (!token) throw new Error("Unknown Token: Apikey Missing");
        if (typeof token !== "string") throw new SyntaxError("Invalid Token: Token must be a String");
        global.token = token
        this.news = require('./lib/news')
        this.search = require('./lib/search')
        this.downloader = require('./lib/downloader')
    }
}
module.exports = {zxclient}