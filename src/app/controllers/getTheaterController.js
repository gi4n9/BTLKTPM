  import mongoose from 'mongoose'; 
  import Film from '../models/Film.js';
  import { multipleMongooseToObject, mongooseToObject } from '../../util/mongoose.js';

  class getTheaterController {
      index(req, res, next) {
          Film.find({})
              .then(films => {
                  res.render('films', { 
                      films: multipleMongooseToObject(films) 
                  });        
              })
              .catch(next);
      }
    
      // [GET] /films/:filmId/theaters
      async getTheaters(req, res) {
        try {
            const { filmId } = req.params;
            console.log(`Film ID in getTheaters: ${filmId}`); // Log giá trị filmId để kiểm tra
            const film = await Film.find({idFilm: filmId});
            console.log(film);
            if (!film) {
                return res.status(404).json({ message: 'Film not found' });
            }
            res.render('showtime', { theaters: film.theaters, films: film });
        } catch (error) {
            console.error(error); 
            res.status(500).send(error);
        }
      }


      // [GET] /films/:filmId/theaters/:theater_id/dates/:date/showtimes
      async getShowtimes(req, res) {
      try {
          const { filmId, theaterId, date } = req.params;
          console.log(`Film ID: ${filmId}, Theater ID: ${theaterId}, Date: ${date}`);

          // Tìm phim theo ID, sử dụng new mongoose.Types.ObjectId
          

          if (!film) {
              console.log('Film not found');
              return res.status(404).json({ message: 'Film not found' });
          }

          // Tìm theater
          const theater = film.theaters.find(t => t.theater_id === theaterId);
          if (!theater) {
              console.log('Theater not found');
              return res.status(404).json({ message: 'Theater not found' });
          }

          // Tìm showdate
          const showdate = theater.showdates.find(s => s.date === date);
          if (!showdate) {
              console.log('Showdate not found');
              return res.status(404).json({ message: 'Showdate not found' });
          }

          // Trả về showtimes
          res.json(showdate.showtimes);
      } catch (error) {
          console.error(error);
          res.status(500).send(error);
      }
  }


      // [GET] /films/:filmId/theaters/:theaterId/dates/:date/showtimes/:time/seats
      async getSeats(req, res) {
          try {
              const { filmId, theaterId, date, time } = req.params;
              const film = await Film.findOne({ film_id: filmId });
              const theater = film.theaters.find(t => t.theater_id === theaterId);
              const showdate = theater.showdates.find(s => s.date === date);
              const showtime = showdate.showtimes.find(st => st.time === time);
              if (!showtime) return res.status(404).json({ message: 'Showtime not found' });
              res.json(showtime.room.seats);
          } catch (error) {
              res.status(500).send(error);
          }
      }
  }

  export default new getTheaterController();
