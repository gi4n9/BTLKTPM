import newRouter from "./news.js";
import newTheater from "./theater.js"
import newVoucher from "./voucher.js"
import newSale from './sale.js'
import filmsRouter from './films.js'
import meRouter from './me.js'

// routes/index.js
export default function route(app) {
    // Define your routes here
    app.get('/sale', newSale);
    app.use('/me', meRouter);
    app.use('/films', filmsRouter);
    app.get('/voucher', newVoucher);
    app.get('/theater', newTheater);
    app.get('/news', newRouter);
    app.get('/home', (req, res) => {
      const user = req.session.user; // Lấy thông tin từ session
      res.render('home', { user: user });
    });
  }
  