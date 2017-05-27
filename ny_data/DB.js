"use strict";
var DBUtil = (function () {
    /* node_modules\mysql\lib\Connection.js
     this.config.insecureAuth=true;*/
    function DBUtil(db) {
        this.Sequelize = require('sequelize');
        this.db = db;
        this.sequelize = new this.Sequelize(db.dbname, db.dbuser, db.dbpwd, db.opt);
        this.P = this.sequelize.define('p', {
            p: this.Sequelize.STRING,
            v: this.Sequelize.INTEGER,
            dt: this.Sequelize.DATE,
            no: this.Sequelize.INTEGER
        });
    }
    DBUtil.prototype.initTables = function () {
        return this.sequelize.sync();
    };
    DBUtil.prototype.add = function (p) {
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
                res(item.dataValues);
            }).catch(function (err) {
                rej(err);
            });
        });
    };
    DBUtil.prototype.count = function (p) {
        var v = this;
        return v.P.count({ where: { v: p.v, dt: { $gt: new Date(p.date) } } });
    };
    return DBUtil;
}());
exports.DBUtil = DBUtil;
module.exports.DBUtil = DBUtil;
