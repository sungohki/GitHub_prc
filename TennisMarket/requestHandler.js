const fs = require('fs'); // import file sink module : 만들어둔 html을 import 가능하게 하는 모듈
const main_view = fs.readFileSync('./main.html');
const orderlist_view = fs.readFileSync('./orderlist.html');
const mariadb = require('./database/connect/mariadb');

function main(response) {
  console.log('main');

  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(main_view);
  response.end();
}

function order(response, productId) {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  mariadb.query(
    `INSERT INTO orderlist VALUES ("${productId}", '${new Date().toLocaleDateString()}');`,
    function (err, rows) {
      console.log(rows);
    }
  );
  response.write('order page');
  response.end();
}

function orderlist(response) {
  console.log('orderlist');

  response.writeHead(200, { 'Content-Type': 'text/html' });

  mariadb.query('SELECT * FROM orderlist', function (err, rows) {
    response.write(orderlist_view);

    rows.forEach((element) => {
      response.write(`
          <tr>
            <td>${element.product_id}</td>
            <td>${element.order_date}</td>
          </tr>
      `);
    });
    response.write('</table>');
    response.end();
  });
}
/* img function */
function redRacket(response) {
  fs.readFile('./img/redRacket.png', function (err, data) {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(data);
    response.end();
  });
}
function blueRacket(response) {
  fs.readFile('./img/blueRacket.png', function (err, data) {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(data);
    response.end();
  });
}
function orangeRacket(response) {
  fs.readFile('./img/orangeRacket.png', function (err, data) {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(data);
    response.end();
  });
}

let handle = {};
// key:value쌍으로 이루어진 Dictionary 자료구조

/* router directory */
handle['/'] = main;
handle['/order'] = order;
handle['/orderlist'] = orderlist;

/* img directory */
handle['/img/redRacket.png'] = redRacket;
handle['/img/blueRacket.png'] = blueRacket;
handle['/img/orangeRacket.png'] = orangeRacket;

exports.handle = handle;
// handle 딕셔너리 자료구조 export
