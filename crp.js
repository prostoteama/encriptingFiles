const crypto = require("crypto");
const scaner = require("./newcryp");
const fs = require("fs");
const path = require("path");

const Algorithm = "aes-256-ecb";
const KEY = Buffer.from("362F53EBAF1BFE5FA985F13FFD26EC0C", "utf8");

function encryptFile(key, inputFile) {
  const inputData = fs.readFileSync(inputFile);
  const cipher = crypto.createCipheriv(Algorithm, key, Buffer.alloc(0));
  const output = Buffer.concat([cipher.update(inputData), cipher.final()]);
  fs.writeFileSync(inputFile, output);
}

function decryptFile(key, inputFile) {
  const inputData = fs.readFileSync(inputFile);
  const cipher = crypto.createDecipheriv(Algorithm, key, Buffer.alloc(0));
  const output = Buffer.concat([cipher.update(inputData), cipher.final()]);
  fs.writeFileSync(inputFile, output);
}

async function readFiles(dirname, onFileContent, onError) {
  const dirs = await scaner(dirname);
  for (let direct of dirs) {
    fs.readdir(direct, function (err, filenames) {
      if (err) {
        onError(err);
      }
      filenames.forEach((filename) => {
        if (path.extname(direct + filename)) {
          fs.readFile(path.normalize(direct + filename), {}, function (err) {
            if (err) {
              onError(err);
            }
            onFileContent(filename, direct);
          });
        }
      });
    });
  }
}

// readFiles(
//   "../../newdecr/",
//   async function (filename, dirname) {
//     await encryptFile(KEY, dirname + filename);
//     console.log(filename + " ** encoded");
//   },
//   function (err) {
//     throw err;
//   }
// );

// readFiles(
//   "../../newdecr/",
//   async function (filename, dirname) {
//     await decryptFile(KEY, path.normalize(dirname + filename));
//     console.log(filename + " ** decoded");
//   },
//   function (err) {
//     throw err;
//   }
// );
