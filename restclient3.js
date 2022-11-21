const http = require('http');

const host = 'localhost';
const port = 8080;
const rootEndPoint = '/api';

let method = 'GET';
let resource = '';

const defaultPostData = JSON.stringify({
    'title': 'ペン入れ',
});
const defaultPutData = JSON.stringify({
    completed: true,
});
let userData = '';

// 実行例）
// node restclient3.js POST todos
// node restclient3.js POST todos {\"title\":\"仕上げ\"}
// node restclient3.js PUT todos/2 {\"completed\":true}
// node restclient3.js DELETE todos/2
// プログラムの都合上、対象リソースの先頭の / は省略してください。
// 例） /todos は todos と書く
if (process.argv.length >= 3) {
    method = process.argv[2];
}
if (process.argv.length >= 4) {
    resource = process.argv[3];
}
if (process.argv.length >= 5) {
    userData = process.argv[4];
}

const req = http.request(
    {
        host,
        port,
        path: rootEndPoint + '/' + resource,
        method,
    },
    res => {
        let responseData = '';
        console.log(`statusCode: ${res.statusCode}`);
        if (/20\d/.test(res.statusCode)) {
            res.on('data', chunk => responseData += chunk);
            res.on('end', () => {
                const obj = JSON.parse(responseData)
                console.log(obj);
            });
        }
    });

if (method === 'POST') req.write(userData === '' ? defaultPostData : userData);
if (method === 'PUT') req.write(userData === '' ? defaultPutData : userData);

req.end();
