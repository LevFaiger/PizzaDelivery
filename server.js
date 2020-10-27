const express = require('express');
const dotenv = require('dotenv');
const orders = require('./routes/orders');
const auth = require('./routes/auth');
const menu = require('./routes/menu');
const users = require('./routes/user');
const cookieParser = require('cookie-parser')

const errorHandler = require('./middleware/error');


dotenv.config({path:'./config/config.env'});
const app = express();
app.use(express.json());
app.use(cookieParser())
app.use('/api/v1/orders',orders);
app.use('/api/v1/auth', auth);
app.use('/api/v1/menu', menu);
app.use('/api/v1/users', users);

app.use(errorHandler);

const PORT = process.env.PORT || 6000;
app.listen(PORT,console.log(`Running at port: ${process.env.PORT} env: ${process.env.NODE_ENV}` ));
