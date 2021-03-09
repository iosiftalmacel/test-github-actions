const fs = require('fs');
var path = require('path');
console.log(path);
console.log(__dirname);
console.log(path.join(__dirname, 'public/pages'));

fs.readdir("*", (err, files) => {
    if(!files)return;
    files.forEach(file => {
        console.log(file);
    });
});
fs.readdir("/", (err, files) => {
    if(!files)return;

    files.forEach(file => {
        console.log(file);
    });
});
