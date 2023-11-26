const mariadb = require('mysql');
// mariadb 패키지 불러오기

const conn = mariadb.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'Tennis',
}); // mariadb 연결

module.exports = conn; // 불러온 데이터베이스를 송출
