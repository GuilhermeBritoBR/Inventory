//require modules js [name is App for better look]
const { error } = require('console');
const fs = require('fs');
//require http for send page home
const http = require('http');
//require path
const path = require('path');
//require css

const server = http.createServer((req, res) => {
    //require adress to archive
    const archiveAdress = './source/database/base.json';
    //require url 
    if (req.url === '/' || req.url === '/home') {
        const filePath = path.join(__dirname, 'index.html');
        const cssPath = path.join('./source/styles', 'styles.css');
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error');
                console.log(`Error in reading file ${err}`);
                return;
            }else{
            res.writeHead(200, { 'Content-Type': 'text/html', });
            res.write( `
    <style>
    html{
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        
    }
    input, select{
        height: 36px;
        width: 160px;
        font-size: 18px;
        margin: 3px;
        display: block;
        border-radius: 5px;
    }
    button{
        height: 36px;
        width: 160px;
        font-size: 18px;
        margin: 3px;
        display: block;
        border-radius: 5px;
    }
    form{
        text-align: center;
        padding: 30px;
        background-color: #000000; 
        border-radius: 15px;
    }
    form h2{
        color: #ffffff;
    }
    
    </style> 
    `)
            res.end(data);
        }
        });} 
        
        else if (req.method === 'POST' && req.url === '/submit') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const formData = new URLSearchParams(body);
            const nome = formData.get('nome');
            const value = formData.get('value');
            const type = formData.get('type');
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
                    contentJson.itens.name = nome;
                    contentJson.itens.value = value;
                    contentJson.itens.type = type;
                    const matrix = {
                        nome: nome,
                        value: value,
                        type: type,
                    }
                    //update new data for json archive
                    const newContentJson = JSON.stringify(matrix, null, 3);
                    //write archive, if error send error else send result
                    fs.writeFile(archiveAdress, newContentJson, 'utf-8', (err) => {
                        if (err) {
                            console.log(`Error in writing ${err}`);
                        }
                        console.log('Update successful in writing');
                        res.writeHead(200, { 'Content-Type': 'text/html'});
                        res.end(`
                        <style>
                        form{
                            text-align: center;
                            padding: 30px;
                            background-color: #000000; 
                            border-radius: 15px;
                        }
                        form h2{
                            color: #ffffff;
                        }
                        
                        </style> 

                        <form>
                        <div style="text-align: center">
                        <h1>Enviado com sucesso!</h1>
                        <h2> ${nome} </h2>
                        <h2>${value }</h2>
                        <h2>${type}</h2>
                        </div>
                        </form>
                        `);
                        
                    });
                }
            });
        });
        
    }else {
        res.writeHead(404);
        res.end('No find page');
    }
});
const PORT = '3000';
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
