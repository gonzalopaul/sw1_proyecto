const {Sequelize} = require('sequelize');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const logger = require('../logger');
const UserModel = require('./models/user.model');
const OrderModel = require('./models/order.model');
const StockModel = require('./models/stock.model');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'sequelize/db.sqlite',
});

//const modelDefiners = [
//  require('./models/user.model'),
//  require('./models/order.model'),
//  require('./models/stock.model')
  // El resto de modelos
//];

//for (const modelDefiner of modelDefiners){
//  modelDefiner(sequelize);
//}

const User = UserModel(sequelize, Sequelize.DataTypes);
const Order = OrderModel(sequelize, Sequelize.DataTypes);
const Stock = StockModel(sequelize, Sequelize.DataTypes);

// Definir las relaciones
User.hasMany(Order, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Order.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Order.belongsTo(Stock, { foreignKey: 'product_id', onDelete: 'CASCADE' });
Stock.hasMany(Order, { foreignKey: 'product_id', onDelete: 'CASCADE' });



// Sincroniza la base de datos
sequelize.sync({ force: false }).then(async () => {
    console.log('Base de datos sincronizada');
  
  }).catch(err => {
    console.error('Error al sincronizar la base de datos:', err);
  });
  
module.exports = { sequelize, User, Order, Stock };
