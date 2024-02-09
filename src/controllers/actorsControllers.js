const db=require("../database/models")

const actorsController={
 list:(req,res)=>{
    db.Actor.findAll()
    .then((actors)=>{
        return res.render("actorsList",{actors:actors})
    })
 },

 detail:(req,res)=>{
    db.Actor.findByPk(req.params.id)
    .then((actor)=>{
        return res.render("actorsDetail",{actor:actor})
    })
 }

}

module.exports= actorsController