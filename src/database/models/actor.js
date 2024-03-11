module.exports = (sequelize, DataTypes) => {
    const alias = "Actor"; 
    const cols = { 
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            unsigned: true 
        },
        first_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        
        last_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        rating: {
            type: DataTypes.DECIMAL(3,1), 
        },
        favorite_movie_id : {
            type: DataTypes.INTEGER,
            unique: true
        }
    };

    const config = {
        tableName: 'Actors', 
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    };

    const Actor = sequelize.define(alias, cols, config); 

    Actor.associate= function(models){
        Actor.belongsToMany(models.Movie,{
           
                as:"movies",
                through:"actor_movie",
                foreignKey:"actor_id",
                otherKey:"movie_id",
                timestamps:false
            
        }
            )
    }
    return Actor; 
};
