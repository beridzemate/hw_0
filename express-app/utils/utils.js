
const fs = require('fs').promises;


async function readFromFile(filePath) {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        throw new Error('Failed to read file.');
    }
}

async function writeToFile(filePath, data) {
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (err) {
        throw new Error('Failed to write file.');
    }
}

module.exports = { readFromFile, writeToFile };
