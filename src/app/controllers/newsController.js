import Film from '../models/Film.js'

class NewsController {
    // Định nghĩa hàm index
    async index(req, res, next) {
        Film.find({})
            .then(films => res.json(films))
            .catch(next)
    }
}

export default new NewsController();
