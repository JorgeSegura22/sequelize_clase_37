const db = require("../database/models")



const moviesController = {
    list: (req, res) => {
        db.Movie.findAll(
            {
                include: [{ association: "generos" },{association:"actors"}]
            }
        )
            .then((movies) => {
                console.log("contenido de movies" + movies)
                return res.render("moviesList", { movies: movies})
            })
    },
    new: (req, res) => {
        db.Movie.findAll({
            order:
                [['title', 'ASC']]

        })
            .then((movies) => {
                
                return res.render("moviesList", { movies: movies })
            })
    },


    detail: (req, res) => {
        db.Movie.findByPk(req.params.id)
            .then((movie) => {
                return res.render("moviesDetail", { movie: movie })
            })

    },
    recomended: (req, res) => {
        db.Movie.findAll({
            offset: 16,
            order: [['release_date', 'ASC']],


        })

            .then((movies) => {
                return res.render("recommendedMovies", { movies: movies })
            })

    },

    add: (req, res) => {
        res.render("moviesCreate", { title: "movieCreate" })
    },
    create: (req, res) => {
        const { title, awards, rating, length, release_date, genero } = req.body;


        db.Genre.findOne({ where: { name: genero } })
            .then(genre => {

                if (!genre) {
                    return res.status(404).send('El género especificado no fue encontrado.');
                }

                const genreId = genre.id;


                const awardsInt = parseInt(awards);
                const ratingDecimal = parseFloat(rating).toFixed(1);
                const lengthInt = parseInt(length);
                const releaseDate = new Date(release_date);


                return db.Movie.create({
                    title: title,
                    awards: awardsInt,
                    rating: ratingDecimal,
                    length: lengthInt,
                    release_date: releaseDate,
                    genre_id: genreId
                });
            })
            .then(() => {

                res.redirect('/movies');
            })
            .catch(error => {

                console.error(error);
                res.status(500).send('Hubo un error al cargar la película. Por favor, inténtalo de nuevo más tarde.');
            });
    },
    edit: (req, res) => {
        const movieId = req.params.id;
        db.Movie.findByPk(movieId)
            .then(movie => {
                if (!movie) {
                    return res.status(404).send('La película especificada no fue encontrada.');
                }
                db.Genre.findAll()
                    .then(genres => {
                        res.render('moviesEdit', { movie: movie, genres: genres, title:"movies edit"});
                    })
                    .catch(error => {
                        console.error(error);
                        res.status(500).send('Hubo un error al cargar la página de edición de la película.');
                    });
            })
            .catch(error => {
                console.error(error);
                res.status(500).send('Hubo un error al cargar la página de edición de la película.');
            });
},
update: (req, res) => {
    const { title, release_date, length, awards, rating, genero } = req.body;

    
    db.Genre.findOne({
        where: { name: genero }
    })
    .then(genre => {
        if (!genre) {
            return Promise.reject('Género no encontrado');
        } else {
          
            return db.Movie.update({
                title: title,
                release_date: new Date(release_date),
                length: parseInt(length),
                awards: parseInt(awards),
                rating: parseFloat(rating).toFixed(1),
                genre_id: genre.id
            }, {
                where: { id: req.params.id }
            });
        }
    })
    .then(() => {
        res.redirect('/movies/detail/' + req.params.id); 
    })
    .catch(error => {
        console.error(error);
        res.status(500).send('Hubo un error al guardar la película');
    });
},
delete:(req,res)=>{
    const movieId = req.params.id;
console.log("llegue a delete")
db.Movie.destroy({
    where: {id:movieId}
})
res.redirect('/movies')
}

}

module.exports = moviesController;