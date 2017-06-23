"use strict";
var DBThinkUtil_1 = require("./DBThinkUtil");
var util = require("util");
var dbconfig = {
    host: 'localhost',
    user: 'root',
    port: 3307,
    database: "test2",
    password: 'mysql57'
};
var dbutil = new DBThinkUtil_1.DBThinkUtil(dbconfig);
var moment = require("moment");
var date = moment().format('YYYY-MM-DD');
dbutil.m("ps_d_nyme_cl").where({ dt: ["<=", date] }).order('dt DESC').limit(200).select().then(function (ddd) {
    var cItem = [];
    ddd.forEach(function (row) {
        delete row.jys;
        delete row.no;
        row.dt = moment(new Date(row.dt.getTime())).format('YYYY-MM-DD');
        console.log(row);
    });
});
