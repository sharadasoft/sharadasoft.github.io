/**
 * db_params = {
 *      name: "my_db_name",
 *      version: "my_db_version",
 *      sub_name: "my_db_sub_name",
 *      size: "my_db_size"
 * }
 *
 * tables_sql = {
 *
 *      "table1"    :   [
 *          "id INTEGER PRIMARY KEY AUTOINCREMENT NULL",
 *          "category_id INTEGER NULL"
 *      ],
 *      "table2"    :   [
 *          "id INTEGER PRIMARY KEY AUTOINCREMENT NULL",
 *          "category_id INTEGER NULL"
 *      ],
 *
 * }
 */
//angular.module('wSQL.db.config', [])
app.constant("W_SQL_CONFIG", {
    PARAMS: {
        name: "playStation",
        version: "1.0",
        sub_name: "playStation",
        size: "10MB"
    },
    TABLES_SQL: {
        "systems"    :   [
            "id INTEGER PRIMARY KEY AUTOINCREMENT",
            "system_id INTEGER"
        ],
        "customers"    :   [
            "id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL",
            "name VARCHAR(255) NOT NULL",
            "members INTEGER NOT NULL",
            "duration INTEGER NOT NULL",
            "startTime VARCHAR(255) NULL",
            "endTime VARCHAR(255) NULL",
            "timeDetails VARCHAR(255) NULL",
            "amount INTEGER NOT NULL",
            "systemNumber INTEGER NOT NULL"
        ]
    },
    /**
     * DEBUG_LEVELs
     *    0 - nothing
     *    1 - console.error
     *    2 - console.warn &
     *    3 - console.info &
     *    4 - console.log, debug
     */
    DEBUG_LEVEL: 0,
    CLEAR: true
});

