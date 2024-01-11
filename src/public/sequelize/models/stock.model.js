module.exports = (sequelize, DataTypes) => {
    const Stock = sequelize.define('stock', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING,
            primaryKey: false
        },
        category: {
            allowNull: false,
            type: DataTypes.STRING
        },
        quantity: {
            allowNull: false,
            type: DataTypes.INTEGER
        }
    });

    return Stock;
}
