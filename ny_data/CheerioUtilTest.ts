
import {CheerioUtil} from "./CheerioUtil";
let url = "http://vip.stock.finance.sina.com.cn/q/view/vFutures_History.php?page=1&breed=XPT&start=1988-08-04&end=2017-06-Su&jys=LIFFE&pz=XPT&hy=&type=global&name=";
new CheerioUtil().parseUrl(url, {}, function ($, params, body) {
    var pagePs = []
    var rows = $('.historyList table tr');
    rows.each(function () {
        var curEle = $(this);
        var date = curEle.find('td').eq(0).text();
        var close = curEle.find('td').eq(1).text();
        var open = curEle.find('td').eq(2).text();
        var height = curEle.find('td').eq(3).text();
        var low = curEle.find('td').eq(4).text();
        var lowNum = Number(low);
        var vol = curEle.find('td').eq(5).text();
        var {jys, pz}=params
        if (low != "" && !isNaN(lowNum)) {
            let row = {
                dt: date,
                o: open,
                c: close,
                h: height,
                l: low,
                v: vol,
                no: jys + "_" + pz
            };
            pagePs.push(row);
        }

    });
    return pagePs;
}).then(function (data) {
    console.log("data:::::", data)
})

