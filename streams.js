const { Transform, Writable } = require('stream');
const { createReadStream, appendFile, existsSync, unlinkSync } = require('fs');
const { argv: [,, ...arg] } = process;

let fileExistCheck = () => {
    return existsSync('./languages_caps');
};

const writeStream = Writable()
writeStream._write = (buffer, _, cb) => {
    console.log("exist?", fileExistCheck());
    if(fileExistCheck()) {
        unlinkSync('./languages_caps');
    };
    cb(null, appendFile(`./${arg}/languages_caps`, buffer, (err) => {
        if (err) throw err;
        console.log('append complete');
    }));
};

const addCaps = Transform();
addCaps._transform = (buffer, _, cb) => {
    cb(null, buffer.toString().toUpperCase());
};

createReadStream('./languages.json').pipe(addCaps).pipe(writeStream);
