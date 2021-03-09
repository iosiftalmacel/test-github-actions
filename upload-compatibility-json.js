const fs = require('fs');
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
