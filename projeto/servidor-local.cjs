const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { execFile } = require('node:child_process');
const root = fs.existsSync(path.join(__dirname,'dist/client/index.html')) ? path.join(__dirname,'dist/client') : __dirname;
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.webp':'image/webp','.avif':'image/avif','.woff2':'font/woff2','.json':'application/json'};
const server = http.createServer((req,res)=>{
 if (!['GET','HEAD'].includes(req.method)) { res.writeHead(405);return res.end(); }
 let name;
 try { name=decodeURIComponent(new URL(req.url,'http://localhost:8000').pathname); } catch {res.writeHead(400);return res.end();}
 let file=path.resolve(root,'.'+name);
 if(file!==root && !file.startsWith(root+path.sep)){res.writeHead(403);return res.end();}
 try {
  if(fs.statSync(file).isDirectory()) file=path.join(file,'index.html');
  const body=fs.readFileSync(file);
  res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Content-Length':body.length});
  res.end(req.method==='HEAD'?undefined:body);
 } catch {res.writeHead(404);res.end('Arquivo nao encontrado');}
});
server.on('error',err=>{console.error('Nao foi possivel iniciar: '+err.message);process.exitCode=1;});
server.listen(8000,'127.0.0.1',()=>{
 console.log('Site aberto em http://localhost:8000');
 console.log('Mantenha esta janela aberta. Para parar: Ctrl+C.');
 if(process.platform==='win32') execFile('cmd.exe',['/c','start','','http://localhost:8000']);
});
