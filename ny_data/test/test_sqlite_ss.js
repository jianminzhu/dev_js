var Sequelize = require('sequelize');
var sequelize = new Sequelize('database', 'username', 'password', {
    dialect: 'sqlite',
    pool: {  max: 5, min: 0, idle: 10000 },
    storage: 'test.db'
});

var P = sequelize.define('p', {
    p: Sequelize.STRING,
    v: Sequelize.INTEGER,
    dt: Sequelize.DATE,
    no: Sequelize.INTEGER
});

function add(p) {
    sequelize.sync().then(function () {
        return P.create({
            p: p.p,
            v: p.v,
            dt: new Date(p.date + " " + p.time),
            no: 1
        });
    }).then(function (jane) {
        console.log(jane.get({
            plain: true
        }));
    });

}
