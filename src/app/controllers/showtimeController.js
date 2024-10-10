import Film from '../models/Film.js';
import Theater from '../models/Theater.js';
import { multipleMongooseToObject } from '../../util/mongoose.js';

class showtimeController {
    async index(req, res, next) {
        try {
            // Truy vấn cả hai collection Theater và Film
            const [theaters, films] = await Promise.all([
                Theater.find({}),
                Film.find({}).populate('theaterID') // Populate để lấy thông tin của Theater
            ]);

            // Map dữ liệu films vào theaters tương ứng
            const theatersWithShowtime = multipleMongooseToObject(theaters).map(theater => {
                const theaterFilms = films.filter(film => {
                    // Kiểm tra nếu theaterID tồn tại và so sánh với _id của theater
                    return film.theaterID && String(film.theaterID._id) === String(theater._id);
                });

                return {
                    ...theater,
                    films: multipleMongooseToObject(theaterFilms)
                };
            });

            // Render ra view showtime với dữ liệu đã gắn kết giữa theaters và films
            res.render('showtime', {
                theaters: theatersWithShowtime
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new showtimeController();
