const sql = require('msnodesqlv8');

const connectionString = `Driver={ODBC Driver 17 for SQL Server};Server=${process.env.DB_HOST}\\${process.env.DB_INSTANCE};Database=${process.env.DB_NAME};Trusted_Connection=yes;`;

const query = (sqlQuery, params = []) => {
    return new Promise((resolve, reject) => {
        sql.query(connectionString, sqlQuery, params, (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
};

module.exports = {
    query,
    connectionString
};