export class DBUtil {
    Sequelize = require('sequelize');
    sequelize
    db
    P
    /* node_modules\mysql\lib\Connection.js
     this.config.insecureAuth=true;*/
    constructor(db) {
        this.db = db
        this.sequelize = new this.Sequelize(db.dbname, db.dbuser, db.dbpwd, db.opt);
        this.P = this.sequelize.define('p', {
            p: this.Sequelize.STRING,
            v: this.Sequelize.INTEGER,
            dt: this.Sequelize.DATE,
            no: this.Sequelize.INTEGER
        });
    }

    initTables() {
        return this.sequelize.sync()
    }

    add(p) {
        var v = this;
        return new Promise(function (res, rej) {
            v.sequelize.sync().then(function () {
                return v.P.create({
                    p: p.p,
                    v: p.v,
                    dt: new Date(p.date + " " + p.time),
                    no: 1
                });
            }).then(function (item) {
                res(item.dataValues)
            }).catch(function (err) {
                rej(err)
            });
        })
    }

    count(p) {
        var v = this;
        return v.P.count({where: {v: p.v, dt: {$gt: new Date(p.date)}}},{logging:false})
    }
}
module.exports.DBUtil = DBUtil;



