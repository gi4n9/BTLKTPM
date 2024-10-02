import Sale from '../models/Sale.js'

class SaleController {
    // Định nghĩa hàm index
    async index(req, res, next) {
        Sale.find({})
            .then(sale => res.json(sale))
            .catch(next)
    }
}

export default new SaleController();
