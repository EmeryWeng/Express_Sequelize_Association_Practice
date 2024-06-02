import express from 'express';
import dotenv from 'dotenv';
import { init } from './model/model_init.js';

const app = express();
dotenv.config({ path: './dev.env' });


const setup = async () => {
    await init();
}

setup();

app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`));