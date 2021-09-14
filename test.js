const fs = require('fs');

const files = fs.readdirSync('D:\\source\\GitHub\\Kapoo\\_posts\\projects').filter(e => e.search(/.md$/) > -1);

console.dir(files);