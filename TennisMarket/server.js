let http = require('http');
let url = require('url');

function start(route, handle) {
  function onRequest(request, response) {
    if (!request.url.includes('favicon.ico')) {
      const pathname = url.parse(request.url).pathname;
      // const pathname = new URL(request.url);
      // 요청을 보낸 클라이언트의 url 경로를 담은 변수
      route(pathname, handle, response);
    }
  }

  http.createServer(onRequest).listen(8888);
  // localhost:8888
}

exports.start = start;
