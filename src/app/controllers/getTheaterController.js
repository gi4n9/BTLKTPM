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
            console.log(`Received Film ID: ${filmId}, Theater ID: ${theaterId}, Date: ${date}`);
      
            // Nếu idFilm là ObjectId, cần sử dụng mongoose.Types.ObjectId
            const film = await Film.findOne({ _id: filmId });
            console.log(film)
      
            if (!film) {
                console.log('Film not found');
                return res.status(404).json({ message: 'Film not found' });
            }
      
            // Tìm theater trong danh sách theaters của film
            const theater = film.theaters.find(t => t.theater_id === theaterId);
            if (!theater) {
                console.log('Theater not found');
                return res.status(404).json({ message: 'Theater not found' });
            }
      
            // Tìm showdate trong danh sách showdates của theater
            const showdate = theater.showdates.find(s => s.date === date);
            if (!showdate) {
                console.log('Showdate not found');
                return res.status(404).json({ message: 'Showdate not found' });
            }
      
            // Trả về showtimes
            const showtimes = showdate.showtimes;
      
            // Render view 'seats' và truyền vào showtimes
            res.render('seats', { 
                showtimes,
                filmId,
                theaterId,
                date,
                image : film.src_phim,
                film
              });
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
      }
      


      // [GET] /films/:filmId/theaters/:theaterId/dates/:date/showtimes/:time/seats
      async getSeats(req, res) {
        try {
            const { filmId, theaterId, date, time } = req.params;
            console.log(`Received Film ID: ${filmId}, Theater ID: ${theaterId}, Date: ${date}, Time: ${time}`);
    
            // Tìm phim theo _id
            const film = await Film.findOne({ _id: filmId });
    
            if (!film) {
                return res.status(404).json({ message: 'Film not found' });
            }
    
            // Tìm rạp chiếu (theater) trong phim
            const theater = film.theaters.find(t => t.theater_id === theaterId);
            if (!theater) {
                return res.status(404).json({ message: 'Theater not found' });
            }
    
            // Tìm ngày chiếu (showdate) trong rạp chiếu
            const showdate = theater.showdates.find(s => s.date === date);
            if (!showdate) {
                return res.status(404).json({ message: 'Showdate not found' });
            }
    
            // Tìm giờ chiếu (showtime) trong ngày chiếu
            const showtime = showdate.showtimes.find(st => st.time === time);
            if (!showtime) {
                return res.status(404).json({ message: 'Showtime not found' });
            }
    
            // Lấy phòng đầu tiên trong showtime.room
            const room = showtime.room[0];  // Chỉ lấy một phòng chiếu
            res.render('final', {
                filmId,
                theaterId,
                date,
                time,
                room,
                title: film.title // Truyền dữ liệu của phòng đầu tiên vào template
            });

        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    }
  }

  export default new getTheaterController();
