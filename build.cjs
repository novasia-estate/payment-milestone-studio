const fs=require('node:fs'),crypto=require('node:crypto');
const script=(fs.readFileSync('engine.js','utf8')+'\n'+fs.readFileSync('app.js','utf8')).replace(/\r\n?/g,'\n');
if(/<\/script/i.test(script))throw Error('Unsafe script terminator');
const hash=crypto.createHash('sha256').update(script).digest('base64');
fs.writeFileSync('index.html',fs.readFileSync('template.html','utf8').replace(/\r\n?/g,'\n').replace('{{HASH}}',hash).replace('{{SCRIPT}}',()=>script));
