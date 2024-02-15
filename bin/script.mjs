import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { EOL } from 'os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fileContent = fs.readFileSync(path.join(__dirname, 'unit'), 'utf-8');
const parsedContent = fileContent.split(EOL);
fs.writeFileSync(
  path.join(__dirname, 'unit.json'),
  JSON.stringify(parsedContent, null, 2),
);
