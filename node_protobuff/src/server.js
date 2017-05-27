var bodyProto = require('../server/utils/proto-helper').bodyProto;  
var defineProto = require('../server/utils/proto-helper').defineProto;



var responseByUrl = function (resp, url) {
    var lastIndex = url.lastIndexOf('.');
    if(lastIndex > -1) {
        var suffix = url.substr(lastIndex + 1);
        if (suffix == 'pb') {
            return resp.serializeBinary();
        } else {
            return resp.toObject();
        }
    } else {
        return resp.toObject();
    }
};

router.post('/matchStock.*', function (req, res, next) {  
    var formMatchStr = req.body.matchStr;  
    var formMatchCount = req.body.matchCount;  
  
    var matchStockResp = new bodyProto.MatchStockResp();  
    var matchStockList = stockUtils.matchStock(formMatchStr, formMatchCount);  
    for (var i in matchStockList) {  
        var matchStock = new bodyProto.MatchStock();  
        matchStock.setStocklabel(matchStockList[i].label);  
        matchStock.setStockname(matchStockList[i].name);  
        matchStockResp.addStock(matchStock)  
    }  
    matchStockResp.setErrorcode(defineProto.ErrorCode.SUCCESS);  
  
    res.send(responseByUrl(matchStockResp, req.url));
});  