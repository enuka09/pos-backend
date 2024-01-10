const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const bodyParser = require('body-parser');
const serverPort = process.env.SERVER_PORT || 3000;
const app = express();
app.use(cors())

const userRoute = require('./routes/UserRoute');
const customerRoute = require('./routes/CustomerRoute');
const productRoute = require('./routes/ProductRoute');
const orderRoute = require('./routes/OrderRoute');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

try {
    mongoose.connect('mongodb://127.0.0.1:27017/pos_api');
    app.listen(serverPort, () => {
        console.log(`Server started & running on port ${serverPort}`);
    })
} catch (e) {
    console.log(e);
}

app.get('/test-api', (req, resp) => {
    return resp.json({'message': 'Server Works!'})
})

app.use('/api/v1/users', userRoute);
app.use('/api/v1/customers', customerRoute);
app.use('/api/v1/products', productRoute);
app.use('/api/v1/orders', orderRoute);

