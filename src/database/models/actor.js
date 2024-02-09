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

    
    return Actor; 
};
