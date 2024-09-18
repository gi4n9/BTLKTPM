import newRouter from "./news.js";

// routes/index.js
export default function route(app) {
    // Define your routes here
    app.use('/news', newRouter);
    app.get('/home', (req, res) => {
      res.render('home'); // Make sure home.handlebars exists in the views folder
    });
  }
  