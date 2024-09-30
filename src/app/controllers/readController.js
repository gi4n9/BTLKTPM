import Film from '../models/Film.js';
import { multipleMongooseToObject } from '../../util/mongoose.js';

class ReadController {
  index(req, res, next) {
    Film.find({})
      .then(films => {
        res.render('films', { 
            films: multipleMongooseToObject(films) 
        });        
      })
      .catch(next);
  }
  
  // [GET] /films/create
  create(req, res, next) {
      res.render('films/create'); 
  }
// [POST] /films/store
store(req, res, next) {
    const formData = req.body; 
    const film = new Film(formData);
    film.save()
        .then(() => res.redirect('/films'))
        .catch(error => {
            console.error('Lỗi khi lưu phim:', error);
            res.status(500).send('Có lỗi xảy ra trong quá trình lưu phim.');
        });
}

}

export default new ReadController();
