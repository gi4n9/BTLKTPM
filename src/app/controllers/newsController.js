class NewsController {
    // Define the index function
    index(req, res) {
        res.render('news');
    }
}
export default new NewsController();
