export class CheerioUtil {
    http
    cheerio

    constructor() {
        this.http = require('http');
        this.cheerio = require('cheerio');
    }

    parseUrl(url, params = {}, coverF) {
        var v = this
        return new Promise(function (resolve, reject) {
            v.http.get(url, function (res) {
                var body = '';
                //�����ܵ����ݵ�ʱ��http��ִ�з�Χ����ġ�����ÿ����Χ�������һ��chunk��
                res.on('data', function (chunk) {
                    //buffer��һ��node�����������Ϣ�ĸ�ʽ��������ᡣ
                    res.setEncoding('utf8'); //����buffer�ַ���
                    body += chunk; //ƴ��buffer
                });
                //������http���������ʱ��
                res.on('end', function () {
                    //�ɹ���״̬ʹ��resolve�ص�������
                    resolve(coverF(v.cheerio.load(body), params, body));
                });
                //��ִ��http����ʧ�ܵ�ʱ�򣬷��ش�����Ϣ
                res.on('error', function (e) {
                    reject(e.message);
                });
            });
        });
    }
}

module.exports.CheerioUtil = CheerioUtil;