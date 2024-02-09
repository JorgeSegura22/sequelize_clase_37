const db=require("../database/models")



const moviesController={
list:(req,res)=>{
db.Movie.findAll(
    {
        include:[{association:"generos"}]
    }
)
.then((movies)=>{
    return res.render("moviesList",{movies:movies})
})
},
new:(req,res)=>{
    db.Movie.findAll({
       order:
       [['title','ASC']]
       
    })
    .then((movies)=>{
        return res.render("moviesList",{movies:movies})
    })
    },


detail:(req,res)=>{
    db.Movie.findByPk(req.params.id)
    .then((movie)=>{
        return res.render("moviesDetail",{movie:movie})
    })
    
},
recomended:(req,res)=>{
    db.Movie.findAll({
        offset:16,
        order:[['release_date','ASC']],
        
    
    })

        .then((movies)=>{
            return res.render("recommendedMovies",{movies:movies})
        })

}
}

module.exports= moviesController;