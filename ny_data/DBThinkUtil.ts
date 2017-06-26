var Mysql = require('node-mysql-promise');
export class DBThinkUtil {
    private _mysql

    /**
     *
     * @param config   示例{  host, user ,  port , database , password  }
     */
    constructor(config) {
        this._mysql = Mysql.createConnection(config);
    }

    toDb(table, data) {
        if (data instanceof Array) {
            return this._mysql.table(table).addAll(data)
        } else {
            return this._mysql.table(table).add(data)
        }
    }

    m(table) {
        return this._mysql.table(table);
    }

    mysql() {
        return this._mysql;
    }

}
module.exports.DBThinkUtil = DBThinkUtil;





