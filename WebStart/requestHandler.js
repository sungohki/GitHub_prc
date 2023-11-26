const fs = require('fs'); // import file sink module : 만들어둔 html을 import 가능하게 하는 모듈
const main_view = fs.readFile('./main.html', 'utf-8');
const mariadb = require('./database/connect/mariadb');

function main(response) {
  console.log('main');

  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(main_view);
  response.end();
}

let handle = {};
// key:value쌍으로 이루어진 Dictionary 자료구조
handle['/'] = main;

exports.handle = handle;
// handle 딕셔너리 자료구조 export
