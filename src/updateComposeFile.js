var fs = require('fs')
  , path = require('path')
  ;


function processFile(data, version) {
  var lines = data.split(`\n`)
    , newLines = []
    ;

  for(let i = 0; i < lines.length; i++) {
    if (lines[i].includes('image')) {
      // append version to image name
      newLines.push(`${lines[i]}:${version}`);
    } else {
      newLines.push(lines[i]);
    }
  }

  return newLines.join(`\n`);
}

module.exports = function updateCompose (dirPath, version) {
  const FILE_PATH = path.join(dirPath, `docker-compose.yml`);


  return new Promise ((resolve, reject) => {
    fs.readFile(FILE_PATH, 'utf-8', function(err, data) {
      if (err) {
        return reject(err);
      }

      if (!version) {
        reject(new Error('Must supply a version to update docker-compose with version'));
      }

      let newContents = processFile(data.toString(), version);

      fs.writeFile(FILE_PATH, newContents, 'utf-8', function (err) {
        if (err) {
          return reject(err);
        }

        resolve();
      })
    });
  })
};