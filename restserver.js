const http = require('http');
const fs = require('fs');

const host = 'localhost';
const port = 8080;
const rootEndPoint = '/api';
const documentRoot = './static';

const todos = [
  { id: 1, title: 'ネーム', completed: true },
  { id: 2, title: '下書き', completed: false },
];

const restAPI = (req, res, resource) => {
  const contentType = 'application/json; charset=utf-8';

  if (req.method === 'GET') {
    if (resource === '/todos') {
      res.statusCode = 200;
      res.setHeader('Content-Type', contentType);
      res.end(JSON.stringify(todos));
      return;
    }
    else {
      const re = /^\/todos\/(.+)$/;
      const found = resource.match(re);
      console.log(found);
      if(found) {
        const id = parseInt(found[1]);
        const todo = todos.find(todo => todo.id === id);
        if (todo) {
          res.statusCode = 200;
          res.setHeader('Content-Type', contentType);
          res.end(JSON.stringify(todo));
          return;
        }
      }
    }
    res.statusCode = 404;
    res.end();
    return;
  }

  // https://developer.mozilla.org/ja/docs/Web/HTTP/Status/405
  res.statusCode = 405;
  res.setHeader('Allow', 'GET');
  res.end();
};

const staticFile = (req, res) => {
  let url = req.url;
  url = url.replace(/\/$/, '/index.html');

  const notFound = `<h1>404 Not Found</h1>${url}はありません。`;

  let contentType = 'text/html; charset=utf-8';
  let encoding = 'utf-8';

  if (url.endsWith('.css')) contentType = 'text/css; charset=utf-8';
  else if (url.endsWith('.jpg')) {
    // バイナリファイルの場合 null を設定
    // https://nodejs.org/api/fs.html#fsreadfilepath-options-callback
    encoding = null;
    contentType = 'image/jpeg';
  }

  fs.readFile(`${documentRoot}${url}`, encoding, (err, data) => {
    res.setHeader('Content-Type', contentType);
    if (err) {
      res.statusCode = 404;
      res.end(notFound);
    }
    else {
      res.statusCode = 200;
      res.end(data);
    }
  });
};

const server = http.createServer((req, res) => {
  console.log(req.method);
  console.log(req.url);

  if (req.url.startsWith(rootEndPoint)) {
    const resource = req.url.replace(rootEndPoint, '');
    restAPI(req, res, resource);
    return;
  }
  else if (req.method === 'GET') {
    staticFile(req, res);
    return;
  }

  // https://developer.mozilla.org/ja/docs/Web/HTTP/Status/405
  res.statusCode = 405;
  res.setHeader('Allow', 'GET');
  res.end();
});

server.listen({ host, port } , () => {
  console.log(`Starting HTTP server at http://${host}:${port}/`)
});
