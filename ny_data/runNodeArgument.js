"use strict";
var n = require("./NyInstance");

var program = require('commander');
program
    .version('0.0.1')
    .usage('[options] <file ...>')
    .option('-d, --dbprofile <n>', 'An db profile')
    .parse(process.argv);
new n.NyInstance().run(program.dbprofile);
