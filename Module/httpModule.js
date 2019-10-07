const http = require('http');
/*
const server = http.createServer();

server.on('connection', (socket)=>{
    console.log('Conectado...');
});

server.listen(2014);
console.log('Escuchando');*/

/*const server = http.createServer((req,res)=>{
    if(req.url === '/')
    {
        res.write('hello world');
        res.write('Nodejs');
        res.end();

    }

    if(req.url == '/player')
    {
        res.write('hello world');
        res.write('Player');
        res.end();

    }
});
server.listen(8088);
console.log('Escuchando 8088');*/

const server = http.createServer((req,res)=>{
    
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<h1>Nodejs</h1>');
        res.end();

       
});
server.listen(5050);
console.log('Escuchando 5050');