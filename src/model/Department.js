import { DataTypes, Model } from "sequelize";
import { Employee } from "./Employee.js";

class Department extends Model { }

Department.initialize = (sequelize) => {
    Department.init(
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
            tableName: 'department',
            timestamps: false
        }
    )
}

Department.associate = () => {
    Department.hasMany(Employee, { foreignKey: 'department_id' });
}

export { Department };