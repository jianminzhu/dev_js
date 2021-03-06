var ldap =  require("ldapjs");

    //	  'host'=>'ldap.sogou-inc.com',
    //      'port'=>389,
    //      'base_dn'=>'ou=Sogou,dc=sogou-inc,dc=com',
    //      'uid'=>'mailNickname',
    //      'bind_dn'=>'cacti@sogou-inc.com',
    //      'password'=>'sogouorz',
//创建LDAP client，把服务器url传入
var client = ldap.createClient({
  url: 'ldap://ldap.sogou-inc.com:389'
});

//创建LDAP查询选项
//filter的作用就是相当于SQL的条件
var opts = {
  filter: '(uid=kxh)', //查询条件过滤器，查找uid=kxh的用户节点
  scope: 'sub',        //查询范围
  timeLimit: 500       //查询超时
};

//将client绑定LDAP Server
//第一个参数：是用户，必须是从根节点到用户节点的全路径
//第二个参数：用户密码
client.bind('uid=mailNickname,ou=Sogou,dc=sogou-inc,dc=com', 'sogouorz', function (err, res1) {

    //开始查询
    //第一个参数：查询基础路径，代表在查询用户信心将在这个路径下进行，这个路径是由根节开始
    //第二个参数：查询选项
    client.search('DC=tiger,DC=com', opts, function (err, res2) {

        //查询结果事件响应
        res2.on('searchEntry', function (entry) {
            
            //获取查询的对象
            var user = entry.object;
            var userText = JSON.stringify(user,null,2);
            console.log(userText);
            
        });
        
        res2.on('searchReference', function(referral) {
            console.log('referral: ' + referral.uris.join());
        });  
        
    });
    
});