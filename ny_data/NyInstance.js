"use strict";
var NyUtil_1 = require("./NyUtil");
var DB_1 = require("./DB");
var NyInstance = (function () {
    function NyInstance(dbprofile) {
        if (dbprofile === void 0) { dbprofile = './db_profile.json'; }
        this.db_profile = {};
        this.db_profile = require(dbprofile);
    }
    NyInstance.prototype.run = function (profile) {
        if (profile === void 0) { profile = "local"; }
        var dbConfig = this.db_profile[profile];
        var db = new DB_1.DBUtil(dbConfig);
        // console.log("using db ", JSON.stringify(dbConfig))
        db.initTables().then(function () {
            setInterval(function () {
                NyUtil_1.NYUtil.p().then(function (p) {
                    db.count(p).then(function (i) {
                        var isNeedInsert = true;
                        if (i == 0) {
                            db.add(p).then(function (it) {
                                // console.log(it)
                            });
                        }
                        else {
                            isNeedInsert = false;
                        }
                        // console.log(isNeedInsert, p.p, p.v, p.date + " " + p.time,dbConfig.dbname)
                    });
                });
            }, 1000);
        });
    };
    return NyInstance;
}());
exports.NyInstance = NyInstance;
module.exports.NyInstance = NyInstance;
