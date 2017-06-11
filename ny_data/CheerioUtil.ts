export class CheerioUtil {
    http
    cheerio

    constructor() {
        this.http = require('http');
        this.cheerio = require('cheerio');
    }

    parseUrl(url, params = {}, coverF) {
        var v = this
        return new Promise(function (resolve, reject) {
            v.http.get(url, function (res) {
                var body = '';
                //当接受到数据的时候，http是执行范围请求的。所以每个范围请求就是一个chunk。
                res.on('data', function (chunk) {
                    //buffer是一种node处理二进制信息的格式，不必理会。
                    res.setEncoding('utf8'); //设置buffer字符集
                    body += chunk; //拼接buffer
                });
                //当整个http请求结束的时候
                res.on('end', function () {
                    //成功的状态使用resolve回调函数。
                    resolve(coverF(v.cheerio.load(body), params, body));
                });
                //当执行http请求失败的时候，返回错误信息
                res.on('error', function (e) {
                    reject(e.message);
                });
            });
        });
    }
}

module.exports.CheerioUtil = CheerioUtil;