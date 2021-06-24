const path = require('path');
const fs = require('fs');
const uuidv4 = require('uuid').v4;
const request = require('request');
const { createNestedDirectory } = require('../src/helpers');

function sleep(duration) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), duration);
  });
}

module.exports = {
  deleteDirectory: (subDir) => {
    const dirPath = path.join(__dirname, subDir);
    if (fs.existsSync(dirPath)) {
      fs.rmdirSync(dirPath, {
        recursive: true
      });
    }
  },
  downloadImage: async (collectionName, key) => {
    const dirPath = createNestedDirectory(['..', 'storage', collectionName, key]);
    const fileName = uuidv4() + '.jpg';
    const filePath = path.join(dirPath, fileName);
    const response = await request('https://thispersondoesnotexist.com/image');
    response.pipe(fs.createWriteStream(filePath));
    await sleep(1000); // hack: avoid downloading of same image at the differnet time
    return fileName;
  }
}