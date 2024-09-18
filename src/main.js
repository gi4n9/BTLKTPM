import express from 'express';
import path from 'path';
import cors from "cors";

import { create } from 'express-handlebars';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Create an instance of handlebars with `create()`
const hbs = create({
  extname: '.handlebars', // Optional: Specify the extension for your templates
});

app.use(cors({
  origin: "*"
}));

app.use(express.static(path.join('src')));

// Set up handlebars as the template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname) + '\\resources\\views');
console.log('Path:', path.join(__dirname) + '\\resources\\views')

// Define a route
app.get('/home', (req, res) => {
  // logic lay data tu db len => data
  res.render('home', /*data_film*/); // Ensure 'home.handlebars' exists in your views folder
});

app.get('/theater', (req, res) => {
  // logic lay data tu db len => data
  res.render('theater', /*data_film*/); // Ensure 'home.handlebars' exists in your views folder
});

app.get("/api-test", (req, res) => {
  res.json({
    mess: "slkghslkdghksfdgsljkghsdflglk",
  })
})

// Start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
