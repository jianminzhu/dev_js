var ldap =  require("ldapjs");

    //	  'host'=>'ldap.sogou-inc.com',
    //      'port'=>389,
    //      'base_dn'=>'ou=Sogou,dc=sogou-inc,dc=com',
    //      'uid'=>'mailNickname',
    //      'bind_dn'=>'cacti@sogou-inc.com',
    //      'password'=>'sogouorz',
//����LDAP client���ѷ�����url����
var client = ldap.createClient({
  url: 'ldap://ldap.sogou-inc.com:389'
});

//����LDAP��ѯѡ��
//filter�����þ����൱��SQL������
var opts = {
  filter: '(uid=kxh)', //��ѯ����������������uid=kxh���û��ڵ�
  scope: 'sub',        //��ѯ��Χ
  timeLimit: 500       //��ѯ��ʱ
};

//��client��LDAP Server
//��һ�����������û��������ǴӸ��ڵ㵽�û��ڵ��ȫ·��
//�ڶ����������û�����
client.bind('uid=mailNickname,ou=Sogou,dc=sogou-inc,dc=com', 'sogouorz', function (err, res1) {

    //��ʼ��ѯ
    //��һ����������ѯ����·���������ڲ�ѯ�û����Ľ������·���½��У����·�����ɸ��ڿ�ʼ
    //�ڶ�����������ѯѡ��
    client.search('DC=tiger,DC=com', opts, function (err, res2) {

        //��ѯ����¼���Ӧ
        res2.on('searchEntry', function (entry) {
            
            //��ȡ��ѯ�Ķ���
            var user = entry.object;
            var userText = JSON.stringify(user,null,2);
            console.log(userText);
            
        });
        
        res2.on('searchReference', function(referral) {
            console.log('referral: ' + referral.uris.join());
        });  
        
    });
    
});