import express from 'express';
import { create } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import route from './routes/index.js';
import {connect} from './config/db/index.js';

connect();
// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Create an instance of handlebars with `create()`
const hbs = create({
  extname: '.handlebars', // Optional: Specify the extension for your templates
});

// Set up handlebars as the template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname) + '\\resources\\views');
console.log('Path:', path.join(__dirname) + '\\resources\\views')

// route init
route(app);


// Start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
