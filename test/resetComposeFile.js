var fs = require('fs')
  , path = require('path')
  ;


function processFile(data) {
  var lines = data.split(`\n`)
    , newLines = []
    ;

  for(let i = 0; i < lines.length; i++) {
    if (lines[i].includes('image') && lines[i].includes(':')) {
      // remove version
      newLines.push(`     image: ${lines[i].split('image:')[1].split(':')[0]}`);
    } else {
      newLines.push(lines[i]);
    }
  }

  return newLines.join(`\n`);
}

module.exports = function resetComposeFile (dirPath) {
  const FILE_PATH = path.join(dirPath, `docker-compose.yml`);


  return new Promise ((resolve, reject) => {
    fs.readFile(FILE_PATH, 'utf-8', function(err, data) {
      if (err) {
        return reject(err);
      }

      let newContents = processFile(data.toString());

      fs.writeFile(FILE_PATH, newContents, 'utf-8', function (err) {
        if (err) {
          return reject(err);
        }

        resolve();
      })
    });
  })
};