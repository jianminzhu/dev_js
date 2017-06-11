"use strict";
var SDataUtil_1 = require("./SDataUtil");
var dbconfig = {
    host: 'localhost',
    user: 'root',
    port: 3307,
    database: "test2",
    password: 'mysql57'
};
var sDataUtil = new SDataUtil_1.SDataUtil(dbconfig);
var startPage = 1;
var endPage = 183;
var jys = "IPE", pz = "OIL";
var t = "ps_d_" + jys.toLowerCase() + "_" + pz.toLowerCase();
sDataUtil.spider(jys, pz, startPage, endPage);
