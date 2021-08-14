const express = require('express');
const mangaModel = require('../model/manga.model');
const authorRouter = express.Router();

authorRouter.get('/', (req,res) => {
    mangaModel.find({
        author: req.query.author
    }).exec((err,mangas) => {
        if (err) {
            res.send("Khong the tim thay manga cua:",req.query.author)
        } else {
            res.json(mangas);
        }
    })
});

module.exports = authorRouter