import express from 'express';
import { create } from 'express-handlebars';

const app = express();
const port = 3000;

// Create an instance of handlebars with `create()`
const hbs = create({
  extname: '.handlebars', // Optional: Specify the extension for your templates
});

// Set up handlebars as the template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './src/resource/views/main.js'); // Set the views directory

// Define a route
app.get('/', (req, res) => {
  res.render('home'); // Ensure 'home.handlebars' exists in your views folder
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
