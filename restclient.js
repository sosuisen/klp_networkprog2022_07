const http = require('http');

const hostname = 'localhost';
const port = 8080;
const apiEndPoint = '/api/';

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
        hostname,
        port,
        path: apiEndPoint + resource,
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

