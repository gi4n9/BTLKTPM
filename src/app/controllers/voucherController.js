import Sale from '../models/Sale.js';
import Voucher from '../models/Voucher.js'

class VoucherController {
    // Định nghĩa hàm index
    async index(req, res, next) {
        const voucher = await Voucher.find({});
        const sale = await Sale.find({});

        res.render('voucher', { 
            voucher,
            sale,
        });
    }
}

export default new VoucherController();
