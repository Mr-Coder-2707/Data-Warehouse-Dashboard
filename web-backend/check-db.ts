import path from 'path';
import * as fs from 'fs';

const possiblePaths = [
  '../backend/gold.db',
  './backend/gold.db',
  '../gold.db',
  './gold.db',
  path.join(__dirname, '../backend/gold.db'),
  path.join(__dirname, '../../backend/gold.db'),
  path.join(__dirname, '../../../backend/gold.db'),
  path.join(process.cwd(), 'backend/gold.db'),
  path.join(process.cwd(), '../backend/gold.db'),
];

console.log('Current working directory:', process.cwd());
console.log('__dirname:', __dirname);
console.log('\nSearching for gold.db:\n');

possiblePaths.forEach((p) => {
  const absolutePath = path.resolve(process.cwd(), p);
  const exists = fs.existsSync(absolutePath);
  console.log(`${exists ? '✅' : '❌'} ${absolutePath}`);
});
