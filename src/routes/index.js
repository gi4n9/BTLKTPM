import newRouter from "./news.js";
import newTheater from "./theater.js"
import newVoucher from "./voucher.js"
import newSale from './sale.js'
import filmsRouter from './films.js'
import meRouter from './me.js'

// routes/index.js
export default function route(app) {
    // Define your routes here
    // Middleware để truyền thông tin user vào tất cả các template
    app.use((req, res, next) => {
      res.locals.user = req.session.user || null; // Gán thông tin người dùng vào res.locals.user
      next();
    });
    app.get('/sale', newSale);
    app.use('/me', meRouter);
    app.use('/films', filmsRouter);
    app.get('/voucher', newVoucher);
    app.get('/theater', newTheater);
    app.get('/news', newRouter);
    app.get('/home', (req, res) => {
      res.render('home'); 
    });
  }
  