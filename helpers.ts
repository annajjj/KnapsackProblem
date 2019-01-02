const fs = require('fs');

export function readFromFile(path: string){
  return fs.readFileSync(path, 'utf8');
}

