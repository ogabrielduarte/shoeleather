const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/connection');


// FILME
const Filme = sequelize.define('Filme', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
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


// CLIENTE
const Cliente = sequelize.define('Cliente', {
    carteirinha: {
        type: DataTypes.STRING(5),
        primaryKey: true,
        unique: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'clientes',
    timestamps: false,
    hooks: {
        beforeCreate: (cliente) => {
            if (!cliente.carteirinha) {
                cliente.carteirinha = gerarCarteirinha();
            }
        }
    }
});


function gerarCarteirinha() {
    return String(Math.floor(Math.random() * 100000)).padStart(5, '0');
}


// LOCAÇÃO
const Locacao = sequelize.define('Locacao', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    dataLocacao: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW
    },
    dataDevolucaoPrevista: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    dataDevolucaoReal: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('ATIVA', 'DEVOLVIDA', 'ATRASADA'),
        defaultValue: 'ATIVA'
    }
}, {
    tableName: 'locacoes',
    timestamps: false,
    hooks: {
        beforeCreate: (locacao) => {
            const data = new Date();
            data.setDate(data.getDate() + 7);
