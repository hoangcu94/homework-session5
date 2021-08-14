const express = require('express');
const app = express();
const mongoose = require('mongoose');
const mangaRouter = require('./router/mangaRouter');
const authorRouter = require('./router/authorRouter');

// Connect mongodb
const db = 'mongodb://localhost/manga';
const port = 4000;

mongoose.connect(db);

// middleware

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/manga', mangaRouter);
app.use('/author', authorRouter);



app.listen(port, ()=> {
    console.log('app listening on port:', port);
});