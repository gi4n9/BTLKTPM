import Film from '../models/film.js'

class NewsController {
    // Định nghĩa hàm index
    async index(req, res) {
        try {
            const films = await Film.find({});
            res.json(films);
        } catch (err) {
            res.status(400).json({ error: 'ERROR!!!' });
        }
    }
}

export default new NewsController();
