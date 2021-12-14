# node-find-files-sync
Recursively search files in multiple dirs filtered by RegExp, file mask or custom filter function

## Example use
const findFiles = require('node-find-files-sync')
let files
files = findFiles(process.argv.slice(3), '*.jpg')
files = findFiles(process.argv.slice(3), /\.jpg$/)
files = findFiles(process.argv.slice(3), (path)=>path.substr(-3)=='jpg')
files = findFiles('/tmp', '*.jpg')
files = findFiles(['/tmp','/var/tmp','/var/tmp/tes.jpg'], '*.jpg')
