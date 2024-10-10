import newRouter from "./news.js";
import newTheater from "./theater.js"
import newVoucher from "./voucher.js"
import newSale from './sale.js'
import filmsRouter from './films.js'
import meRouter from './me.js'
import newShowtimes from './showtimes.js'
import homeRouter from './home.js';

export default function route(app) {
    // Middleware để truyền thông tin user vào tất cả các template
    app.use((req, res, next) => {
      res.locals.user = req.session.user || null; // Gán thông tin người dùng vào res.locals.user
      next();
    });

    // Middleware kiểm tra vai trò admin
    const isAdmin = (req, res, next) => {
      if (req.session.user.role === 'admin') {
        return next(); // Cho phép truy cập nếu là admin
      }
      return res.status(403).send('Truy cập bị từ chối (Admins only).');
    };
    
    app.get('/sale', newSale);
    app.use('/me', meRouter);
    app.use('/films', filmsRouter);
    app.use('/films', scheduleRouter);
    app.get('/voucher', newVoucher);
    app.get('/theater', newTheater);
    app.get('/news', newRouter);
    app.get('/showtimes', newShowtimes);
    app.get('/home', (req, res) => {
      res.render('home'); 
    });
    app.get('/admin', isAdmin, (req, res) => {
      res.render('admin/dashboard', { layout: false });
    });

    app.get('/logout', (req, res) => {
      req.session.destroy((err) => {
          if (err) {
              return res.redirect('/home');
          }
          res.clearCookie('connect.sid');
          res.redirect('/');
      });
  });
  
  }
  