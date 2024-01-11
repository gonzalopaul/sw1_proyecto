module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        username: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true,
            //username debe contener al menos 3 caracteres alfanuméricos o guiones bajos.
            validate: {
                is: /^\w{3,}$/
            }
        },
        password:{
            allowNull: false,
            type: DataTypes.STRING,
            unique: false
        },
        rol: {
            allowNull: false,
            type: DataTypes.ENUM('admin', 'user', 'vipuser', 'supplier'),
            defaultValue: 'user'
        }
    });

    return User;
}