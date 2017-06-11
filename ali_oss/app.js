var later = require('later');


var sched = later.parse.recur().every(1).second(),
t = later.setInterval(function(i) {
        test(i);
    }, sched);
    
    
    setTimeout(function(){
    t.clear();
   console.log("Clear");
    },6500)

function test(val) { 
   console.log(new Date());
   console.log(val);
}