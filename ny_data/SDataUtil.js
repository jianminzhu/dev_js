"use strict";
var DBThinkUtil_1 = require("./DBThinkUtil");
var CheerioUtil_1 = require("./CheerioUtil");
var moment = require("moment");
var SDataUtil = (function () {
    function SDataUtil(dbconfig) {
        this.dbconfig = dbconfig;
        this.dbThinkUtil = new DBThinkUtil_1.DBThinkUtil(dbconfig);
        this.cheerioUtil = new CheerioUtil_1.CheerioUtil();
    }
    SDataUtil.prototype.spider = function (jys, pz, startPage, endPage) {
        var v = this;
        var t = "ps_d_" + jys.toLowerCase() + "_" + pz.toLowerCase();
        var params = { t: t, start: "1988-08-04", end: moment().format('YYYY-MM-dd'), pz: pz, jys: jys };
        v.tableSql(t, v.dbconfig).then(function (res) {
            console.log("msg:", res.msg, "emsg:", res.emsg);
            var _a = v.pageToDb(params, startPage, endPage), succSavedPages = _a.succSavedPages, fkErrorPages = _a.fkErrorPages, intervalId = _a.intervalId;
            var id = setInterval(function () {
                console.log(succSavedPages.length, fkErrorPages.length, succSavedPages.length + fkErrorPages.length);
                if (succSavedPages.length + fkErrorPages.length == (endPage - startPage + 1)) {
                    clearInterval(intervalId);
                    clearInterval(id);
                    console.log("all page saved");
                }
            }, 3000);
        });
        return t;
    };
    ;
    SDataUtil.prototype.parseRows = function ($, params, body) {
        var pagePs = [];
        var rows = $('.historyList table tr');
        rows.each(function () {
            var curEle = $(this);
            var date = curEle.find('td').eq(0).text();
            var close = curEle.find('td').eq(1).text();
            var open = curEle.find('td').eq(2).text();
            var height = curEle.find('td').eq(3).text();
            var low = curEle.find('td').eq(4).text();
            var lowNum = Number(low);
            var vol = curEle.find('td').eq(5).text();
            var jys = params.jys, pz = params.pz;
            if (low != "" && !isNaN(lowNum)) {
                var row = {
                    dt: date,
                    o: open,
                    c: close,
                    h: height,
                    l: low,
                    v: vol,
                    no: jys + "_" + pz
                };
                pagePs.push(row);
            }
        });
        return pagePs;
    };
    SDataUtil.prototype.httpAndParse = function (params) {
        if (params === void 0) { params = { page: page, start: start, end: end, pz: pz, jys: jys }; }
        var v = this;
        var jys = params.jys, pz = params.pz, start = params.start, end = params.end, page = params.page;
        var url = this.getUrl(jys, pz, start, end, page);
        return v.cheerioUtil.parseUrl(url, params, this.parseRows);
    };
    SDataUtil.prototype.saveToPsd = function (dataRows, page, parseSuccPages, fkErrorPages, table) {
        dataRows.forEach(function (row) {
            row.page = page;
        });
        this.dbThinkUtil.toDb(table, dataRows).then(function (id) {
            parseSuccPages.push(page);
            console.log(page, " to db", id, dataRows.length);
        }).catch(function (e) {
            fkErrorPages.push(page);
            console.log("error:", dataRows.length, e);
        });
    };
    ;
    SDataUtil.prototype.pageToDb = function (params, startPage, endPage) {
        if (params === void 0) { params = { page: page, start: start, end: end, pz: pz, jys: jys, t: t }; }
        if (startPage === void 0) { startPage = 1; }
        if (endPage === void 0) { endPage = 1; }
        var succSavedPages = [];
        var fkErrorPages = [];
        var v = this;
        var page = params.page, start = params.start, end = params.end, pz = params.pz, jys = params.jys, t = params.t;
        console.log("pageToDb : startPage,endPage", startPage, endPage);
        for (var nowPage = startPage; nowPage <= endPage; nowPage++) {
            (function (nowPage) {
                params.page = nowPage;
                v.httpAndParse(params).then(function (data) {
                    if (data.length > 0) {
                        v.saveToPsd(data, nowPage, succSavedPages, fkErrorPages, t);
                    }
                });
            })(nowPage);
        }
        var intervalId = setInterval(function () {
            console.log("start found lostpage ...");
            var lostPage = succSavedPages.sort(function (a, b) {
                return a - b;
            });
            var lostPages = [];
            for (var i = startPage; i <= endPage; i++) {
                if (lostPage.indexOf(i) == -1) {
                    lostPages.push(i);
                }
            }
            console.log("found lostPages", lostPages);
            lostPages.forEach(function (page) {
                params.page = page;
                v.httpAndParse(params).then(function (data) {
                    v.saveToPsd(data, page, succSavedPages, fkErrorPages, t);
                });
            });
        }, 30000);
        return { succSavedPages: succSavedPages, fkErrorPages: fkErrorPages, intervalId: intervalId };
    };
    ;
    SDataUtil.prototype.getUrl = function (jys, pz, start, end, page) {
        if (page === void 0) { page = 1; }
        var breed = pz;
        return "http://vip.stock.finance.sina.com.cn/q/view/vFutures_History.php?page=" + page + "&breed=" + breed + "&start=" + start + "&end=" + end + "&jys=" + jys + "&pz=" + pz + "&hy=&type=global&name=";
    };
    SDataUtil.prototype.tableSql = function (t, dbconfig) {
        var tableSql = "CREATE TABLE " + t + "(\n              id INT(11) NOT NULL AUTO_INCREMENT,\n              c DECIMAL(10,3) DEFAULT NULL,\n              o DECIMAL(10,3) DEFAULT NULL,\n              h DECIMAL(10,3) DEFAULT NULL,\n              l DECIMAL(10,3) DEFAULT NULL,\n              v INT(11) DEFAULT NULL,\n              dt DATE DEFAULT NULL,\n              no VARCHAR(8) DEFAULT NULL,\n              page INT(11) DEFAULT NULL,\n              jys VARCHAR(16) DEFAULT NULL,\n              PRIMARY KEY (id),\n              UNIQUE KEY " + t + "_no_dt (no,dt)\n            ) ENGINE=INNODB  DEFAULT CHARSET=utf8";
        var mysql = require('mysql');
        var connection = mysql.createConnection(dbconfig);
        return new Promise(function (resolve, reject) {
            connection.connect(function (err) {
                var isSucc = true;
                var emsg = "";
                var msg = "";
                if (err) {
                    isSucc = false;
                    emsg = ("链接失败");
                    resolve({ isOk: isSucc, msg: msg, emsg: emsg });
                }
                else {
                    connection.query(tableSql, function (err, result) {
                        if (err) {
                            isSucc = false;
                            emsg += err;
                        }
                        else {
                            msg = "\u521B\u5EFA\u8868" + t + "\u6210\u529F";
                        }
                        resolve({ isOk: isSucc, msg: msg, emsg: emsg });
                    });
                }
            });
        });
    };
    return SDataUtil;
}());
exports.SDataUtil = SDataUtil;
module.exports.SDataUtil = SDataUtil;
