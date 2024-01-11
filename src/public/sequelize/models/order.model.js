module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('order', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        user_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        product_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
            references: {
                model: 'stock',
                key: 'id'
            }
        },
        quantity: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        fecha: {
            allowNull: false,
            type: DataTypes.DATE
        }
    });
    return Order;
}
    