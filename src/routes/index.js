import newRouter from "./news.js";
import newTheater from "./theater.js"
import newVoucher from "./voucher.js"
import newSale from './sale.js'
import filmsRouter from './films.js'
import meRouter from './me.js'
import scheduleRouter from './schedule.js';

// routes/index.js
export default function route(app) {
    // Define your routes here
    app.get('/sale', newSale);
    app.use('/me', meRouter);
    app.use('/films', filmsRouter);
    app.use('/films', scheduleRouter);
    app.get('/voucher', newVoucher);
    app.get('/theater', newTheater);
    app.get('/news', newRouter);
    app.get('/home', (req, res) => {
      res.render('home'); // Make sure home.handlebars exists in the views folder
    });
  }
  