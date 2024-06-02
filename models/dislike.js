const { DataTypes } = require('sequelize');
const sequelize = require('./database')

// Define the model for the ti1_like table
const Dislikes = sequelize.define('dislikes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    utilizador: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    tarefaId: {
        type: DataTypes.STRING(5),
        allowNull: false
    }
},
    {
        timestamps: false // Disable timestamps
    }
);

// Synchronize the model with the database (create the table if it doesn't exist)
Dislikes.sync();


// Export the model for use in other parts of your application
module.exports = Dislikes;