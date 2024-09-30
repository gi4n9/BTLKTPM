import Film from '../models/Film.js';
import { multipleMongooseToObject } from '../../util/mongoose.js';

class MeController {
  // [GET] /me/stored/films
  storedFilms(req, res, next) { 
    Film.find({})
      .then(films => res.render('me/stored-films', {
        films: multipleMongooseToObject(films)
      }))
      .catch(next);
  }
}

export default new MeController();
