"use strict";
var DBThinkUtil = (function () {
    /**
     *
     * @param config   示例{  host, user ,  port , database , password  }
     */
    function DBThinkUtil(config) {
        this.Mysql = require('node-mysql-promise');
        this._mysql = this.Mysql.createConnection(config);
    }
    DBThinkUtil.prototype.toDb = function (table, data) {
        if (data instanceof Array) {
            return this._mysql.table(table).addAll(data);
        }
        else {
            return this._mysql.table(table).add(data);
        }
    };
    DBThinkUtil.prototype.m = function (table) {
        return this._mysql.table(table);
    };
    DBThinkUtil.prototype.mysql = function () {
        return this._mysql;
    };
    return DBThinkUtil;
}());
exports.DBThinkUtil = DBThinkUtil;
module.exports.DBThinkUtil = DBThinkUtil;
