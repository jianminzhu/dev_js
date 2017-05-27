$(function () {
    ss_run_jpbase = 338.85;
    toP = 49.7;
    cacheP = 0;
    function changeCss(pripce) {
        if (pripce > toP) {
            $("#b_stop").css("color", "green");
            setTimeout(function () {
                $("#b_stop").css("color", "#FFF");
            }, 500);
        }
    }
    function numberfix(num, length, join) {
        if (length === void 0) { length = 5; }
        if (join === void 0) { join = ' '; }
        var noPointNum = num * 100;
        var item = new Array(length - ("" + noPointNum).length + 1).join(join) + num;
        return item;
    }
    function ss_toMap(arr, keysWithSplit) {
        var keyArr = keysWithSplit.split(",");
        var obj = {};
        keyArr.forEach(function (it, index) {
            try {
                obj[it.trim()] = arr[index] || "";
            }
            catch (e) {
                console.log("error");
            }
        });
        return obj;
    }
    ;
    function getReal(cp) {
        return parseFloat(ss_run_jpbase + (cp - ss_run_nybase) * 7).toFixed(2);
    }
    function parseP(str, ss_run_jpbase, toP) {
        var arr = str.split(",");
        var p = ss_toMap(arr, "p,change,b,s,h,l,time,yc,o,v,vb,vs,date,name");
        var nowP = Number(p.p);
        ss_run_nybase = Math.floor((Number(p.o) - 0.11) * 100) / 100;
        var jpReal = getReal(nowP);
        var jpTo = getReal(toP);
        var show = ss_run_jpbase + "_" + jpReal + "__t:" + jpTo + "\n" + numberfix(ss_run_nybase) + "_" + numberfix(p.p) + "__t:" + numberfix(toP) + " " + p.time.substr(2, 6) + " " + p.v + "\n";
        console.log(show);
        return { p: p, jp: { _toP: toP, _jpTo: jpTo, jpReal: jpReal } };
    }
    function ss_run() {
        var url = 'http://hq.sinajs.cn/etag.php?_=' + new Date().getTime() + '&list=hf_CL';
        $.ajax({
            url: url,
            dataType: "script"
        }).then(function (body) {
            var _a = parseP(hq_str_hf_CL, ss_run_jpbase, toP), p = _a.p, jp = _a.jp;
            changeCss(p.p);
        });
    }
    ss_run_interval_id = false;
    function start() {
        var time = Number($("#time").val()) * 1000;
        stop();
        ss_run_interval_id = setInterval(ss_run, time);
    }
    function stop() {
        if (ss_run_interval_id) {
            clearInterval(ss_run_interval_id);
        }
    }
    $("#b_start").click(function () {
        start();
    }).trigger("click");
    $("#b_stop").click(function () {
        stop();
    });
});
