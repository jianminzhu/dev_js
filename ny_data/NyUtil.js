"use strict";
var NYUtil = (function () {
    function NYUtil() {
    }
    NYUtil.toMap = function (arr, keysWithSplit) {
        var keyArr = keysWithSplit.split(",");
        var obj = {};
        keyArr.forEach(function (it, index) {
            try {
                obj[it.trim()] = arr[index] || "";
            }
            catch (e) {
                console.log("error");
            }
        });
        return obj;
    };
    NYUtil.p = function () {
        var rp = this.rp;
        var toMap = this.toMap;
        return new Promise(function (resolve, reject) {
            var opt = {
                url: "http://hq.sinajs.cn/etag.php?_=" + new Date().getTime() + "&list=hf_CL",
                headers: {
                    'Pragma': 'no-cache',
                    'Accept-Language': 'en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
                    'Accept': ' */*',
                    'Referer': 'http://finance.sina.com.cn/futures/quotes/CL.shtml',
                    'Cache-Control': ' no-cache'
                }
            };
            rp(opt).then(function (body) {
                var arr = body.replace(/.{1,}"(.{1,})".{1,}/gi, "$1").split(",");
                var p = toMap(arr, "p,change,b,s,h,l,time,y,o,v,vb,vs,date,name");
                resolve(p);
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    NYUtil.rp = require('request-promise');
    return NYUtil;
}());
exports.NYUtil = NYUtil;
module.exports.NYUtil = NYUtil;
