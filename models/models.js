const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Filme = sequelize.define('Filme', {
    codigo: {
        type: DataTypes.BIGINT,
        primaryKey: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ano: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    diretor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    genero: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipoMidia: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'filmes',
    timestamps: false
});

module.exports = Filme;
