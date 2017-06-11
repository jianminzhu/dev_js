import {DBThinkUtil} from "./DBThinkUtil"
import {CheerioUtil} from "./CheerioUtil";
var moment = require("moment")
export class SDataUtil {
    dbThinkUtil
    cheerioUtil
    dbconfig

    constructor(dbconfig) {
        this.dbconfig = dbconfig
        this.dbThinkUtil = new DBThinkUtil(dbconfig)
        this.cheerioUtil = new CheerioUtil()
    }

    spider(jys, pz, startPage, endPage) {
        var v = this;
        var t = `ps_d_${jys.toLowerCase()}_${pz.toLowerCase()}`;
        var params = {t: t, start: "1988-08-04", end: moment().format('YYYY-MM-dd'), pz: pz, jys: jys}
        v.tableSql(t, v.dbconfig).then(function (res) {
            console.log("msg:", res.msg, "emsg:", res.emsg)
            var {succSavedPages, fkErrorPages, intervalId} = v.pageToDb(params, startPage, endPage);
            var id = setInterval(function () {
                console.log(succSavedPages.length, fkErrorPages.length, succSavedPages.length + fkErrorPages.length,)
                if (succSavedPages.length + fkErrorPages.length == (endPage - startPage + 1)) {
                    clearInterval(intervalId)
                    clearInterval(id)
                    console.log("all page saved")
                }
            }, 3000)
        })
        return t;
    };

    parseRows($, params, body) {
        var pagePs = []
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
            var {jys, pz}=params
            if (low != "" && !isNaN(lowNum)) {
                let row = {
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
    }

    httpAndParse(params = {page, start, end, pz, jys}) {
        var v = this
        var {jys, pz, start, end, page}=params
        var url = this.getUrl(jys, pz, start, end, page)
        return v.cheerioUtil.parseUrl(url, params, this.parseRows)
    }

    saveToPsd(dataRows, page, parseSuccPages, fkErrorPages, table) {
        dataRows.forEach(function (row) {
            row.page = page
        })
        this.dbThinkUtil.toDb(table, dataRows).then(function (id) {
            parseSuccPages.push(page)
            console.log(page, " to db", id, dataRows.length)
        }).catch(function (e) {
            fkErrorPages.push(page)
            console.log("error:", dataRows.length, e)
        });
    };

    pageToDb(params = {page, start, end, pz, jys, t}, startPage = 1, endPage = 1) {
        var succSavedPages = []
        var fkErrorPages = []
        var v = this
        var {page, start, end, pz, jys, t}=params
        console.log("pageToDb : startPage,endPage", startPage, endPage)
        for (var nowPage = startPage; nowPage <= endPage; nowPage++) {
            (function (nowPage) {
                params.page = nowPage
                v.httpAndParse(params).then(function (data) {
                    if (data.length > 0) {
                        v.saveToPsd(data, nowPage, succSavedPages, fkErrorPages, t)
                    }
                })
            })(nowPage)
        }
        var intervalId = setInterval(function () {
            console.log("start found lostpage ...")
            var lostPage = succSavedPages.sort(function (a, b) {
                return a - b
            })
            var lostPages = []
            for (var i = startPage; i <= endPage; i++) {
                if (lostPage.indexOf(i) == -1) {
                    lostPages.push(i)
                }
            }
            console.log("found lostPages", lostPages)
            lostPages.forEach(function (page) {
                params.page = page
                v.httpAndParse(params).then(function (data) {
                    v.saveToPsd(data, page, succSavedPages, fkErrorPages, t)
                })
            })
        }, 30000)
        return {succSavedPages, fkErrorPages, intervalId}
    };

    getUrl(jys, pz, start, end, page = 1) {
        var breed = pz;
        return `http://vip.stock.finance.sina.com.cn/q/view/vFutures_History.php?page=${page}&breed=${breed}&start=${start}&end=${end}&jys=${jys}&pz=${pz}&hy=&type=global&name=`;
    }

    tableSql(t, dbconfig) {
        let tableSql = `CREATE TABLE ${t}(
              id INT(11) NOT NULL AUTO_INCREMENT,
              c DECIMAL(10,3) DEFAULT NULL,
              o DECIMAL(10,3) DEFAULT NULL,
              h DECIMAL(10,3) DEFAULT NULL,
              l DECIMAL(10,3) DEFAULT NULL,
              v INT(11) DEFAULT NULL,
              dt DATE DEFAULT NULL,
              no VARCHAR(8) DEFAULT NULL,
              page INT(11) DEFAULT NULL,
              jys VARCHAR(16) DEFAULT NULL,
              PRIMARY KEY (id),
              UNIQUE KEY ${t}_no_dt (no,dt)
            ) ENGINE=INNODB  DEFAULT CHARSET=utf8`;
        var mysql = require('mysql');
        var connection = mysql.createConnection(dbconfig);
        return new Promise(function (resolve, reject) {
            connection.connect(function (err) {
                var isSucc = true;
                var emsg = ""
                var msg = ""
                if (err) {
                    isSucc = false;
                    emsg = ("链接失败");
                    resolve({isOk: isSucc, msg: msg, emsg: emsg})
                } else {
                    connection.query(tableSql, function (err, result) {
                        if (err) {
                            isSucc = false
                            emsg += err;
                        } else {
                            msg = `创建表${t}成功`
                        }
                        resolve({isOk: isSucc, msg: msg, emsg: emsg})
                    })
                }
            })
        });
    }
}
module.exports.SDataUtil = SDataUtil


