var OSS = require('ali-oss').Wrapper;

var client = new OSS({
  region: 'oss-cn-beijing',
  accessKeyId: 'LTAIHr6lOZZoQQ7d',
  accessKeySecret: 'XEkvKq2OvNjn9XlPs8Lp307wTDQ6eg',
  bucket: 'qmjr'
});
// 上传一个文件，成功后下载这个文件
client.put('index.html', 'index.html').then(function (val) {
  console.log(val.res);
  return client.get('object');
}).then(function (val) {
  console.log(val.res);
  console.log(val.content.toString());
});