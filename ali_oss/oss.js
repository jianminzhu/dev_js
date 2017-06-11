var OSS = require('ali-oss').Wrapper;

var client = new OSS({
  region: 'oss-cn-beijing',
  accessKeyId: 'LTAIHr6lOZZoQQ7d',
  accessKeySecret: 'XEkvKq2OvNjn9XlPs8Lp307wTDQ6eg',
  bucket: 'qmjr'
});

client.list().then(function (result) {
  console.log(result.objects);
}).catch(function (err) {
  console.error(err);
});

/*** 
FTP登录主机地址： bxu2442430025.my3w.com   f
数据库:       bdm272724254.my3w.com  d 
*/