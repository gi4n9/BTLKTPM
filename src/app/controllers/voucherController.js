import Voucher from '../models/Voucher.js'

class VoucherController {
    // Định nghĩa hàm index
    async index(req, res, next) {
        Voucher.find({})
            .then(voucher => {
                voucher = voucher.map(voucher => voucher.toObject())
                res.render('voucher', { voucher })
            })
            .catch(next)
    }
}

export default new VoucherController();
