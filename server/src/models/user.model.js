// Módulo de definición del objeto
// User a través de Sequelize.
// Tiene interacción directa con la Base de Datos

const { Sequelize, DataTypes } = require('sequelize');
const connection = require('./../database');
const bcrypt = require('bcrypt');

// Objeto User encargado de manipular
// la información en la tabla Users

const User = connection.define("Users", {
  id: {
    field: 'id',
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  email: {
    type: Sequelize.STRING,
    field: 'email',
    allowNull: false,
    unique: true 
  },
  password: {
    field: 'password',
    type: Sequelize.STRING,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    field: 'name',
    allowNull: true
  },
  phone: {
    type: DataTypes.STRING,
    field: 'phone',
    allowNull: true
  }
},
{
  timestamps: false,
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(10); 
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  },
  // Usar 'instanceMethods' ya no es válido en las versiones más recientes de Sequelize
  // No lo usen, por favor.
});

// Método para comparar contraseñas en el modelo User
User.prototype.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};



/*const User = connection.define("Users", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true
  }
},{
    timestamps: false
  },
  {
    hooks:{
      beforeCreate: async function (user){
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  },
  {
    instanceMethods: {
      comparePassword: async function(password){
        return await bcrypt.compare(password, this.password);
      }
    }
  }
);*/

// Proceso de encriptación y compración de
// las contraseñas del usuario.
/*

User.addHook('beforeCreate', async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
});

User.prototype.validPassword = async (password) => {
  return await bcrypt.compare(password, this.password);
};

*/

module.exports = User;
