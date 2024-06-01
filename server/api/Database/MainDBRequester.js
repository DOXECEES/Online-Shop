const mysql = require('mysql2');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '_12345MySql_',
    database: 'users',
});

mysqlConnection.connect((error) => {
    if (error) {
        console.error('Error connecting to MySQL:', error);
    } else {
        console.log('Connected to MySQL');
    }
});

module.exports = mysqlConnection;