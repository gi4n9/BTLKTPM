import Theater from '../models/Theater.js'

class TheaterController {
    // Định nghĩa hàm index
    async index(req, res, next) {
        Theater.find({})
            .then(theater => {
                theater = theater.map(theater => theater.toObject())
                res.render('theater', { theater })
            })
            .catch(next)
    }
}

export default new TheaterController();
