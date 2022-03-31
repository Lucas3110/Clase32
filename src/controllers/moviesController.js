const db = require('../database/models');
const sequelize = db.sequelize;

const Movies = db.Movie;

const moviesController = {
    'list': (req, res) => {
        db.Movie.findAll()
            .then(movies => {
                res.render('moviesList.ejs', {movies})
            })
    },
    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id)
            .then(movie => {
                res.render('moviesDetail.ejs', {movie});
            });
    },
    'new': (req, res) => {
        db.Movie.findAll({
            order : [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(movies => {
                res.render('newestMovies', {movies});
            });
    },
    'recomended': (req, res) => {
        db.Movie.findAll({
            where: {
                rating: {[db.Sequelize.Op.gte] : 8}
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {
                res.render('recommendedMovies.ejs', {movies});
            });
    }, 
    add: function (req, res) {
        res.render('moviesAdd.ejs');
    },
    create: function (req, res) {
        db.Movie.create({
            title: req.body.title,
            rating: req.body.rating,
            awards: req.body.awards,
            release_date: req.body.release_date,
            length: req.body.length
        })
        .then(movie => {
            res.redirect('/movies');
         })
    },
    edit: function(req, res) {
        db.Movie.findByPk(req.params.id)
            .then(Movie => {
                res.render('moviesEdit.ejs', {Movie})
            })
    },
    update: function (req,res) {
        db.Movie.update({
            title: req.body.title,
            rating: req.body.rating,
            awards: req.body.awards,
            release_date: req.body.release_date,
            length: req.body.length
        },
        {
            where: {id: req.params.id}
        })
        .then(movie => {
            res.redirect('/movies');
         })
    },
    delete: function (req, res) {
        db.Movie.findByPk(req.params.id)
            .then(Movie => {
                res.render('moviesDelete.ejs', {Movie})
            })
    },
    destroy: function (req, res) {
        db.Movie.destroy({
            where: {
               id: req.params.id
            }
         })
         .then(() => {
               res.redirect('/movies');
            })
    }

}

module.exports = moviesController;