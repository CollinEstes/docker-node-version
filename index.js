const path = require('path')
  , updateCompose = require(path.join(__dirname, 'src/updateComposeFile.js'))

  ;

function processError (err) {
  console.error('An error occured in node-docker-version');
  console.error(err);
  process.exit(1);
}

function processCompletion () {
  console.log('docker-compose.yml updated with version');
  process.exit(0);
}


// get version from package.json
try {
  const manifest = require(path.join(process.env.PWD, 'package.json'))
    , version = manifest.version
    ;

  if (!version) {
    processError('Could not find version in package.json');
  } else {
    // update compose file and dockerfile
      updateCompose(process.env.PWD, version)
      .then(processCompletion)
      .catch(processError)
    ;
  }

}
catch (err) {
  processError('Could not locate package.json in directory');
}


