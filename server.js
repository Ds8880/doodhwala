const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 8000;

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const dbConnection = require('./config/connection');
const routes = require('./routes/route');
const milkRoutes = require('./routes/milkRoute');

dbConnection();

app.use('/customers', routes);
app.use('/milk', milkRoutes);

app.listen(port, () => {
    console.log(`Server is running on  http://localhost:${port}`);
});