
var ldap = require("ldapjs");

//����LDAP client���ѷ�����url����
var client = ldap.createClient({
 url: 'ldap://10.203.24.216:389'
});

//����LDAP��ѯѡ��
//filter�����þ����൱��SQL������
var opts = {
 filter: '(uid=kxh)', //��ѯ����������������uid=kxh���û��ڵ�
 scope: 'sub',    //��ѯ��Χ
 timeLimit: 500    //��ѯ��ʱ
};

//��client��LDAP Server
//��һ�����������û��������ǴӸ��ڵ㵽�û��ڵ��ȫ·��
//�ڶ����������û�����
client.bind('uid=supbind,cn=users,dc=tiger,dc=com', '123456', function (err, res1) {

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
    
    //��ѯ�����¼�
    res2.on('error', function(err) {
      console.error('error: ' + err.message);
      //unbind����������Ҫ��
      client.unbind();
    });
    
    //��ѯ����
    res2.on('end', function(result) {
      console.log('search status: ' + result.status);
      //unbind����������Ҫ��
      client.unbind();
    });    
    
  });
  
});