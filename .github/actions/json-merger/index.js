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

const { GITHUB_WORKSPACE, JSON_PATH } = process.env;

const jsonFiles = getAllFilesOfType(GITHUB_WORKSPACE, ".test.json");
const mergedJson = jsonFiles.reduce((merged, file) => {
  const json = JSON.parse(fs.readFileSync(file));

  if (Array.isArray(json)) merged.push(...json);
  else merged.push(json);
  return merged;
}, []);

fs.writeFile(GITHUB_WORKSPACE + JSON_PATH, JSON.stringify(mergedJson));
