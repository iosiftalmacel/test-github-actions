const fs = require("fs");
const path = require("path");

function getAllFilesOfType(directory, type) {
  const filesOfType = [];
  const files = fs.readdirSync(directory);
  for (var i = 0; i < files.length; i++) {
    const file = path.join(directory, files[i]);
    const stat = fs.lstatSync(file);

    if (stat.isDirectory()) filesOfType.push(...getAllFilesOfType(file, type));
    else if (file.includes(type)) filesOfType.push(file);
  }
  return filesOfType;
}

const rootDirectory = path.join(__dirname, "../../../");
const jsonFiles = getAllFilesOfType(rootDirectory, ".test.json");

const mergedJson = [];
jsonFiles.forEach((file) => {
  console.info(file);
  const json = JSON.parse(fs.readFileSync(file));
  if (Array.isArray(json)) mergedJson.push(...json);
  else mergedJson.push(json);
});

console.info(process.env);
console.info(mergedJson);
