module.exports = (sequelize, DataTypes) => {
    const alias = "Movie"; 
    const cols = { 
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            unsigned: true 
        },
        title: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        awards: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unsigned: true, 
        },
        rating: {
            type: DataTypes.DECIMAL(3, 1),
            allowNull: false,
            unsigned: true 
        },
        length: {
            type: DataTypes.INTEGER
        },
        release_date: { 
            type: DataTypes.DATE,
            allowNull: false, 
        },
        genre_id: {
            type: DataTypes.INTEGER,
            unsigned: true 
        }
    };

    const config = {
        tableName: 'Movies', 
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    };

    const Movie = sequelize.define(alias, cols, config); 
    Movie.associate= function(models){
        Movie.belongsTo(models.Genre,{
            as:"generos",

            foreignKey:"genre_id"

        })

        Movie.belongsToMany(models.Actor,{
            as:"actors",
            through:"actor_movie",
            foreignKey:"movie_id",
            otherKey:"actor_id",
            timestamps:false
        })
    }

    return Movie; 
};
