
// const fs = require('fs');
// const path = require('path');

// const IGNORED_DIRS = ['node_modules', '.git', 'dist', 'build'];

// function printFolderStructure(dirPath, prefix = '') {
//   const entries = fs.readdirSync(dirPath, { withFileTypes: true });

//   const folders = entries.filter(entry => entry.isDirectory() && !IGNORED_DIRS.includes(entry.name));
//   const files = entries.filter(entry => entry.isFile());

//   for (const folder of folders) {
//     console.log(`${prefix}📁 ${folder.name}`);
//     printFolderStructure(path.join(dirPath, folder.name), prefix + '  ');
//   }

//   // Uncomment this section if you want to show files too
//   // for (const file of files) {
//   //   console.log(`${prefix}📄 ${file.name}`);
//   // }
// }

// const basePath = '.'; // current directory
// printFolderStructure(basePath);


const fs = require('fs');
const path = require('path');

const ROOT_DIR = '.'; // or your root folder
const IGNORED_DIRS = ['node_modules', '.git']; // customize if needed

let output = '';

function printFolderStructure(dirPath, prefix = '') {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  const folders = entries.filter(
    (entry) => entry.isDirectory() && !IGNORED_DIRS.includes(entry.name)
  );

  for (const folder of folders) {
    output += `${prefix}- ${folder.name}\n`;
    printFolderStructure(path.join(dirPath, folder.name), prefix + '  ');
  }
}

printFolderStructure(ROOT_DIR);

// Write the collected output to file
fs.writeFileSync('structure.txt', output);

console.log('Folder structure saved to structure.txt');
