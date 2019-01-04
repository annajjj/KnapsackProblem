const fs = require('fs');

export function readFromFile(path: string){
  return fs.readFileSync(path, 'utf8');
}


export function saveToFile(data, path) {
  fs.writeFile(path, data, function(err) {
      if (err) {
          return console.error(err);
      }
  });
}

