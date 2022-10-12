const http = require('http');
const fs = require('fs');

const hostname = 'localhost';
const port = 8080;
const documentRoot = './static';
const apiEndPoint = '/api/';

const todos = [
  { id: 1, title: 'ネーム', completed: false },
  { id: 2, title: '下書き', completed: true },
];

const restAPI = (req, res) => {
  const contentType = 'application/json; charset=utf-8';
  if (req.method === 'GET') {
    res.statusCode = 200;
    res.setHeader('Content-Type', contentType);    
    res.end(JSON.stringify(todos));
  }
  else if (req.method === 'POST') {
    
  }
  else if (req.method === 'PUT') {
    
  }
  else if (req.method === 'DELETE') {
    
  }
  return;
};

const staticFile = (req, res) => {
  let url = req.url;
  if (url === '/') url = '/index.html';

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
    res.statusCode = 200;
    res.setHeader('Content-Type', contentType);
    if (err) res.end(notFound);
    else res.end(data);
  });
};

const server = http.createServer((req, res) => {
  console.log(req.method);
  console.log(req.url);

  let html = '';

  if (req.url.startsWith(apiEndPoint)) 
  {
      restAPI(req, res);
  }
  else if (req.method === 'GET') {
    staticFile(req, res);
  }
  else {
    // https://developer.mozilla.org/ja/docs/Web/HTTP/Status/405
    res.statusCode = 405;
    res.setHeader('Allow', 'GET');
    res.end();
  }
});

server.listen(port, hostname, () => {
  console.log(`Starting HTTP server at http://${hostname}:${port}/`)
});
