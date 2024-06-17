// module.exports = {
//     multipleStatements  : true,
//     host                : 'localhost',
//     user                : 'root',
//     password            : '',
//     database            : 'discussion_forum_app'
// };

const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'educalab.id',
    user: 'PzTPP938n9uzPOMX',
    password: 'IAnYYVPf5SOMoA2k',
    database: 'iEXPXrjIq5fpYiUI',
    port: 3307,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool.promise();
