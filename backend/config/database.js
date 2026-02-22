const isDocker = process.env.DB_HOST === 'host.docker.internal';

let query;
let sql;

if (!isDocker) {
    // Local Windows
    sql = require('msnodesqlv8');
    const connectionString = `Driver={ODBC Driver 17 for SQL Server};Server=${process.env.DB_HOST}\\${process.env.DB_INSTANCE};Database=${process.env.DB_NAME};Trusted_Connection=yes;`;

    query = (sqlQuery, params = []) => {
        return new Promise((resolve, reject) => {
            sql.query(connectionString, sqlQuery, params, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    };

    module.exports = { query, connectionString, sql };
} else {
    // Docker/Linux
    sql = require('mssql');
    const config = {
        server: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        options: {
            encrypt: false,
            trustServerCertificate: true
        }
    };

    const poolPromise = sql.connect(config);

    query = async (sqlQuery, params = []) => {
        try {
            const pool = await poolPromise;
            const request = pool.request();

            // Translate '?' to named parameters for Tedious compatibility
            let paramIndex = 1;
            const normalizedQuery = sqlQuery.replace(/\?/g, () => `@p${paramIndex++}`);

            params.forEach((val, index) => {
                request.input(`p${index + 1}`, val);
            });

            const result = await request.query(normalizedQuery);
            return result.recordset;
        } catch (err) {
            console.error('SQL query error', err);
            throw err;
        }
    };

    module.exports = { query, sql };
}