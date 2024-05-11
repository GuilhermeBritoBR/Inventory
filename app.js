//require modules js [name is App for better look]
const fs = require('fs');
//require http for send page home
const http = require('http');
//require path
const path = require('path');
//require adress to archive

const server = http.createServer((req, res) => {
    const archiveAdress = './source/database/base.json';
    //require url 
    if (req.url === '/' || req.url === '/home') {
        const filePath = path.join(__dirname, 'index.html');
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error');
                console.log(`Error in reading file ${err}`);
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else if (req.method === 'POST' && req.url === '/submit') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const formData = new URLSearchParams(body);
            const nome = formData.get('nome');
            const email = formData.get('email');
            const mensagem = formData.get('mensagem');
            //this is a function, where are reading archive 'json', here props are ADRESS, UTF 8, ERROR AND WRITE
            fs.readFile(archiveAdress, 'utf-8', (err, data) => {
                if (err) {
                    res.writeHead(500);
                    res.end('Error');
                    console.log(`Error in reading ${err}`);
                    return;
                } else {
                    //getting content to json archive 
                    const contentJson = JSON.parse(data);
                    //add data in json archive
                    contentJson.name = nome;
                    contentJson.value = email;
                    contentJson.type = mensagem;
                    //update new data for json archive
                    const newContentJson = JSON.stringify(contentJson, null, 3);
                    //write archive, if error send error else send result
                    fs.writeFile(archiveAdress, newContentJson, 'utf-8', (err) => {
                        if (err) {
                            console.log(`Error in writing ${err}`);
                        }
                        console.log('Update successful in writing');
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.end('<h1>Formulário enviado com sucesso!</h1>');
                        
                    });
                }
            });
        });
        
    }else if (req.url === '/submit') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Formulário enviado com sucesso!</h1>');}
    else {
        res.writeHead(404);
        res.end('No find page');
    }
});
const PORT = '3000';
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
