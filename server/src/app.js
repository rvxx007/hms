import express, { urlencoded } from 'express';
import cors from 'cors';
import config from './configs/config.js';
import mdb from './configs/mdb.js';
import authRouter from './routes/authRouter.js';
import adminRouter from './routes/adminRouter.js';
import doctorRouter from './routes/doctorRouter.js';

const app = express();
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cors());


const apiV1Prefix = '/api/v1';
const authApiPrefix = `${apiV1Prefix}/auth`;
const adminApiPrefix = `${apiV1Prefix}/admin`;
const doctorApiPrefix = `${apiV1Prefix}/doctor`;

app.get('/', (req, res)=>{
    res.send('Welcome to HMS Server');
});
app.use(authApiPrefix,authRouter);
app.use(adminApiPrefix,adminRouter);
app.use(doctorApiPrefix,doctorRouter);


app.listen(config.port, ()=>{
    console.log(`Server is running on port ${config.port}`);
})