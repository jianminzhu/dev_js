"use strict";
var CheerioUtil = (function () {
    function CheerioUtil() {
        this.http = require('http');
        this.cheerio = require('cheerio');
    }
    CheerioUtil.prototype.getUrl = function (url, params) {
        if (params === void 0) { params = {}; }
        var v = this;
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
                    resolve(body);
                });
                //当执行http请求失败的时候，返回错误信息
                res.on('error', function (e) {
                    reject(e);
                });
            });
        });
    };
    CheerioUtil.prototype.parseUrl = function (url, params, coverF) {
        if (params === void 0) { params = {}; }
        var v = this;
        return new Promise(function (resolve, reject) {
            v.getUrl(url, params).then(function (body) {
                resolve(coverF(v.cheerio.load(body), params, body));
            }, function (err) {
                reject(err);
            });
        });
    };
    return CheerioUtil;
}());
exports.CheerioUtil = CheerioUtil;
module.exports.CheerioUtil = CheerioUtil;
