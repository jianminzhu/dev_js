var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('test.db');
 
db.serialize(function() {
  db.run("CREATE TABLE p (p integer,vol integer,dt integer,no integer)");
  db.run("CREATE VIEW view_p  AS select  *,datetime(dt/1000, 'unixepoch', 'localtime') as time from p ");
 
  var stmt = db.prepare("INSERT INTO p(p,vol,dt) VALUES (?,?,?)");
  stmt.run(49.82,3331,new Date().getTime()); 
  stmt.finalize();
 
  db.each("SELECT *  FROM view_p", function(err, row) {
      console.log(row.p + ": " + row.time);
  });
});
 
db.close();