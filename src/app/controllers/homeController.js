import Sale from '../models/Sale.js';
import Voucher from '../models/Voucher.js'

class HomeController {
    // Định nghĩa hàm index
    async index(req, res, next) {
        const voucher = await Voucher.find({});
        const sale = await Sale.find({});

        res.render('home', { 
            voucher,
            sale,
        });
    }
}

export default new HomeController();
