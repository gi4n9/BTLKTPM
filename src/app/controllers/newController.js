class NewsController {

    //[GET] /home
    index(req,res ){
        res.render('home')
    }

}

module.exports = new NewsController;