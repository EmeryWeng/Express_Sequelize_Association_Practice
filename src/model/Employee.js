import { DataTypes, Model } from 'sequelize';
import { Department } from './Department.js';

class Employee extends Model { }

Employee.initialize = (sequelize) => {
    Employee.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            sequelize,
            tableName: 'employee',
            timestamps: false
        }
    );
}

Employee.associate = () => {
    Employee.belongsTo(Department, { foreignKey: 'department_id' });
}

export { Employee };