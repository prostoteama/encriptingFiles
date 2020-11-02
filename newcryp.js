const fs = require("fs");

function scaner(y) {
  let newdir = [];
  newdir.push(y);
  function newpath(y) {
    let y1 = fs.readdirSync(y);
    for (let x of y1) {
      let stat = fs.statSync(y + x);
      if (!stat.isFile()) {
        let path = y + x + "/";
        newdir.push(path);
        newpath(path);
      }
    }
  }
  newpath(y);
  return newdir
}

module.exports = scaner