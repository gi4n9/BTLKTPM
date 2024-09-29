import Voucher from '../models/Voucher.js'

class VoucherController {
    // Định nghĩa hàm index
    async index(req, res, next) {
        Voucher.find({})
            .then(voucher => res.json(voucher))
            .catch(next)
    }
}

export default new VoucherController();
