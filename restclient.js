const http = require('http');

const host = 'localhost';
const port = 8080;
const rootEndPoint = '/api';

// 実行例）
// node restclient.js GET todos
// node restclient.js GET todos/1
// プログラムの都合上、対象リソースの先頭の / は省略してください。
// 例） /todos は todos と書く
let method = 'GET';
let resource = '';
if (process.argv.length >= 3) {
    method = process.argv[2];
}
if (process.argv.length >= 4) {
    resource = process.argv[3];
}

http.request(
    {
        host,
        port,
        path: rootEndPoint + '/' + resource,
        method,
    },
    res => {
        let responseData = '';
        console.log(`statusCode: ${res.statusCode}`);
        if (res.statusCode === 200) {
            res.on('data', chunk => responseData += chunk);
            res.on('end', () => {
                const obj = JSON.parse(responseData)
                console.log(obj);
            });
        }
    }).end();

