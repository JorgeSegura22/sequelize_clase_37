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
        createdAt: 'created_at', // descubri que Sequelize espera un formato determinado para el nombre de estas coliumnas. Si el nombre de las columnas es distinto al que espera Sequelize tira error al poner true en timestamps, por eso se le tiene que decir a Sequelize como estan escritas en la tabla.
        updatedAt: 'updated_at'
    };

    const ActorMovie = sequelize.define(alias, cols, config); 

    return ActorMovie; 
};