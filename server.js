//require http for send page home
const http = require('http');
//require path
const path = require('path');
const server = http.createServer((require, result)=>{
    //require url 
    if(require.url === '/' || require.url === '/home'){
        const filePath = path.join(__dirname, 'index.html');
        if(app.readFile(filePath, 'utf-8',(error, result)=>{
            if(error){
                res.writeHead(500);
                res.end('Error');
                console.log(`Error in reading file ${error}`);
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(result);
        }));
    }else{
        res.writeHead(404);
        res.end('No find page');
}
    server.listen(PORT, () => {
    console.log(`Error in http://localhost:${PORT}`)});
});