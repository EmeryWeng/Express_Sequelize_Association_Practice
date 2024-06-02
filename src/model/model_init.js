import { Employee } from './Employee.js';
import { Department } from './Department.js';
import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import { dirname } from "path";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../../dev.env') });

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false
});

const checkConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

const models = [Employee, Department];

const init = async () => {
    await checkConnection();
    initModels();
    initAssociations();
    await sequelize.sync({ alter: true });
    console.log('All models were synchronized successfully.');
}

const initModels = () => {
    for (const model of models) {
        model.initialize(sequelize)
    }
}

const initAssociations = async () => {
    for (const model of models) {
        if (model.associate) {
            model.associate();
        }
    }
}

export { init };