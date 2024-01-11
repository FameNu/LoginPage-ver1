const fs = require('fs');

const filePath = './data/data.json';

const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

console.log(data);

data.push({
    id: 10,
    name: 'Liz'
})
// data.pop();

// write file 
const dataToWrite = JSON.stringify(data, null, 2);

fs.writeFileSync(filePath, dataToWrite, 'utf8');