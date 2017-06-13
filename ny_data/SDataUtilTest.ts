import {SDataUtil} from "./SDataUtil";
let dbconfig = {
    host: 'localhost',
    user: 'root',
    port: 3307,
    database: "test2",
    password: 'mysql57'
};

let sDataUtil = new SDataUtil(dbconfig);
var startPage = 1
var endPage = 183
var jys = "NYME", pz = "CL";
var t = `ps_d_${jys.toLowerCase()}_${pz.toLowerCase()}`;
sDataUtil.spider(jys, pz, startPage, endPage)