import Film from '../models/Film.js';
import { multipleMongooseToObject, mongooseToObject } from '../../util/mongoose.js';

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
  async store(req, res, next) {
    try {
      const formData = req.body;
      const film = new Film(formData);
      await film.save();  // Sử dụng await để lưu dữ liệu
      res.redirect('/films');
    } catch (error) {
      console.error('Lỗi khi lưu phim:', error);
      res.status(500).send('Có lỗi xảy ra trong quá trình lưu phim.');
    }
  }
    

    // [GET] /films/:id/edit
  async edit(req, res, next) {
    try {
      const film = await Film.findById(req.params.id);  // Sử dụng await
      res.render('films/edit', { film: mongooseToObject(film) });
    } catch (error) {
      next(error);
    }
  }
    

    // [PUT] /films/:id
  async update(req, res, next) {
    try {
      await Film.updateOne({ _id: req.params.id }, req.body);  
      res.redirect('/films');
    } catch (error) {
      next(error);  
    }
  }
    
    // [DELETE] /films/:id
  async destroy(req, res, next) {
    Film.deleteOne({ _id: req.params.id })
      .then(() => res.redirect('/films'))
      .catch(next);
  }
}
export default new ReadController();
