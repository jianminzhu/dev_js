import {NYUtil} from "./NyUtil";
import {DBUtil} from "./DB";
export class NyInstance {
    db_profile = {}
    constructor(dbprofile = './db_profile.json') {
        this.db_profile = require(dbprofile)
    }
    run(profile="local") {
        let dbConfig = this.db_profile[profile];
        var db = new DBUtil(dbConfig);
        // console.log("using db ", JSON.stringify(dbConfig))
        db.initTables().then(function () {
            setInterval(function () {
                NYUtil.p().then(function (p) {
                    db.count(p).then(function (i) {
                        var isNeedInsert = true;
                        if (i == 0) {
                            db.add(p).then(function (it) {
                                // console.log(it)
                            })
                        } else {
                            isNeedInsert = false;

                        }
                        // console.log(isNeedInsert, p.p, p.v, p.date + " " + p.time,dbConfig.dbname)
                    })
                })

            }, 1000)
        });
    }
}
module.exports.NyInstance = NyInstance;