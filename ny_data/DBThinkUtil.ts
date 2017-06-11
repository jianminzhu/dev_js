export class DBThinkUtil {
    Mysql = require('node-mysql-promise');
    private _mysql
    /**
     *
     * @param config   ʾ��{  host, user ,  port , database , password  }
     */
    constructor(config) {
        this._mysql = this.Mysql.createConnection(config);
    }

    toDb  (table, data) {
        if (  data  instanceof Array ) {
            return this._mysql.table(table).addAll(data)
        } else {
            return this._mysql.table(table).add(data)
        }
    }
    m(table){
        return this._mysql.table(table);
    }
    mysql(){
        return this._mysql;
    }

}
module.exports.DBThinkUtil = DBThinkUtil;



