var mysql = require('mysql')

var sqlConfig = {
    host: 'localhost',
    port: 3306,
    user: 'root', //보통 root유저를 사용하나, 다를경우 변경
    password: 'tlqkftprtm', //USER_PASSWORD부분은 본인의 mysql비밀번호 입력
    database: '2018MobileContent' //DataBase 이름 입력
}

var sql = mysql.createConnection(sqlConfig);

var db = sql.connect((err)=>{
    if (err) {
        console.error('mysql connection error');
        throw err;
    }
    else {
        console.log('DB Connect Success!');
    }
});

function handleDisconnect(client) {

    client.on('error', (error)=>{

        if (!error.fatal) return;

        if (error.code !== 'PROTOCOL_CONNECTION_LOST') throw err;

        console.error('> Re-connecting lost MySQL connection');

        setTimeout(()=>{
            sql.destroy()
            sql = mysql.createConnection(sqlConfig)
            handleDisconnect(sql)
            db = sql.connect()
            exports.db = db
            exports.sql = sql
        }, 1000)

    });

};

handleDisconnect(sql)

exports.db = db
exports.sql = sql