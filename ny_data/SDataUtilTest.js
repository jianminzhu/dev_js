"use strict";
var SDataUtil_1 = require("./SDataUtil");
var dbconfig = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    database: "test2",
    password: 'mysql57'
};
var sDataUtil = new SDataUtil_1.SDataUtil(dbconfig);
var startPage = 1;
var endPage = 184;
// var jys = "IPE", pz = "OIL"
var jys = "NYME", pz = "CL";
var t = "ps_d_" + jys.toLowerCase() + "_" + pz.toLowerCase();
sDataUtil.spider(jys, pz, startPage, endPage);
