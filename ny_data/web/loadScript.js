function loadScript(sUrl, fCallback, charset) {
    if (charset === void 0) { charset = "utf-8"; }
    var _script = document.createElement('script');
    _script.setAttribute('charset', charset);
    _script.setAttribute('type', 'text/javascript');
    _script.setAttribute('src', sUrl);
    document.head.appendChild(_script);
    if (/msie/.test(window.navigator.userAgent.toLowerCase())) {
        _script.onreadystatechange = function () {
            if (this.readyState == 'loaded' || this.readyState == 'complete') {
                _script.parentNode.removeChild(_script);
                if (fCallback)
                    fCallback();
            }
        };
    }
    else if (/gecko/.test(window.navigator.userAgent.toLowerCase()) ||
        /opera/.test(window.navigator.userAgent.toLowerCase())) {
        _script.onload = function () {
            _script.parentNode.removeChild(_script);
            if (fCallback)
                fCallback();
        };
    }
    else {
        _script.parentNode.removeChild(_script);
        if (fCallback)
            fCallback();
    }
}
var SinaWbUtil = (function () {
    function SinaWbUtil() {
        var v = this;
        v.onlySearch();
        setInterval(function () {
            v.time();
        }, 1000);
    }
    SinaWbUtil.prototype.time = function () {
        var date = new Date();
        $("[node-type=feed_list_item_date]").each(function () {
            var jit = $(this);
            var jp = jit.parent();
            var jnowTime = jp.find(".__nowtime");
            if (jnowTime.size() == 0) {
                var jdiv = $("<span/>").addClass("__nowtime");
                jp.append(jdiv);
            }
            jnowTime.html(jit.attr("title") + "<br>" + new Date());
        });
    };
    SinaWbUtil.prototype.onlySearch = function () {
        var jc = $("#pl_weibo_direct");
        if ($("#pl_weibo_direct_only").size() == 0) {
            var jmsg = jc.find(".search_feed>div:eq(2)").attr("id", "pl_weibo_direct_only");
            $("body").html("").append(jmsg);
            $("div.feed_action").remove();
        }
    };
    return SinaWbUtil;
}());
loadScript('http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js', function () {
    new SinaWbUtil();
});
