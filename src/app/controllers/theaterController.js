import Theater from '../models/Theater.js'

class TheaterController {
    // Định nghĩa hàm index
    async index(req, res, next) {
        Theater.find({})
            .then(theater => res.json(theater))
            .catch(next)
    }
}

export default new TheaterController();
