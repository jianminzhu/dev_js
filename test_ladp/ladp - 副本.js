var LdapClient = RedisClient('node-ldap');

var client = new LdapClient({
    ldapUrl: 'ldap://ldap.sogou-inc.com:389',
    userDn: 'cacti@sogou-inc.com',
    password: 'sogouorz'
    	
    	
    /	  'host'=>'ldap.sogou-inc.com',
    /      'port'=>389,
    /      'base_dn'=>'ou=Sogou,dc=sogou-inc,dc=com',
    /      'uid'=>'mailNickname',
    /      'bind_dn'=>'cacti@sogou-inc.com',
    /      'password'=>'sogouorz',
});


 // 用户认证
client.auth('administrator@yliyun.com', 'yliyun@123').then(function() {
    console.log('success');
}).catch(function(err) {
    console.error(err);    
});

// 搜索部门
client.searchOU('cn=Users,dc=yliyun,dc=com').then(function(ous) {
    console.log(ous);
}).catch(function(err) {
    console.error(err);    
});

// 搜索群组
client.searchGroup('cn=Users,dc=yliyun,dc=com').then(function(groups) {
    console.log(groups);
}).catch(function(err) {
    console.error(err);    
});

// 搜索用户
client.searchUser('cn=Users,dc=yliyun,dc=com').then(function(users) {
    console.log(users);
}).catch(function(err) {
    console.error(err);    
});

// 搜索
client.search({
    base: 'dc=yliyun,dc=com',
    scope: 'sub', // 默认为'one'
    paged: 'true', // 默认为true
    filter: '(objectclass=organizationalUnit)'
}).then(function(rows) {
    console.log(rows);
}).catch(function(err) {
    console.error(err);    
});

// 断开连接
client.disconnect();