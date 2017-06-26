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


 // �û���֤
client.auth('administrator@yliyun.com', 'yliyun@123').then(function() {
    console.log('success');
}).catch(function(err) {
    console.error(err);    
});

// ��������
client.searchOU('cn=Users,dc=yliyun,dc=com').then(function(ous) {
    console.log(ous);
}).catch(function(err) {
    console.error(err);    
});

// ����Ⱥ��
client.searchGroup('cn=Users,dc=yliyun,dc=com').then(function(groups) {
    console.log(groups);
}).catch(function(err) {
    console.error(err);    
});

// �����û�
client.searchUser('cn=Users,dc=yliyun,dc=com').then(function(users) {
    console.log(users);
}).catch(function(err) {
    console.error(err);    
});

// ����
client.search({
    base: 'dc=yliyun,dc=com',
    scope: 'sub', // Ĭ��Ϊ'one'
    paged: 'true', // Ĭ��Ϊtrue
    filter: '(objectclass=organizationalUnit)'
}).then(function(rows) {
    console.log(rows);
}).catch(function(err) {
    console.error(err);    
});

// �Ͽ�����
client.disconnect();