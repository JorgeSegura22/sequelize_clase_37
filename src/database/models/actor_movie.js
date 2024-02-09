module.exports = (sequelize, DataTypes) => {
    const alias = "Actor_movies"; 
    const cols = { 
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            unsigned: true 
        },
       actor_id: {
        type: DataTypes.INTEGER,
        unsigned: true,
            allowNull: false,
        },
        movie_id: {
            type: DataTypes.INTEGER,
            unsigned: true,
                allowNull: false,
            },
    };

    const config = {
        tableName: 'Actor_movies', 
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    };

    const ActorMovie = sequelize.define(alias, cols, config); 

    return ActorMovie; 
};