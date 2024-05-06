require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./users');

// aplicacion de express
const app = express()
const cors = require('cors')

//middleware
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});


//routes
app.use('/users', userRoutes);

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Server is running on port 3000.');
          });
    })
    .catch(err => {
        console.log(err);
    });