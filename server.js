let http = require('http')
let fs = require('fs')
let qs = require('qs')

let users = []

let server = http.createServer((req, res)=>{
    if (req.method === 'GET') {
        fs.readFile('./views/register.html', function (err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        });
    } else {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        })
        req.on('end', () => {
            const userInfo = qs.parse(data);
            users.push(userInfo)
            console.log(users)
            return res.end()
        })
        req.on('error', () => {
            console.log('error')
        })
    }
})
server.listen(8000, ()=>{
    console.log(`server is running...`)
})