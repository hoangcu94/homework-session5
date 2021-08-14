const express = require('express');
const Joi = require('joi');
const mangaModel = require('../model/manga.model');
const mangaRouter = express.Router();
const MangaModel = require('../model/manga.model');

mangaRouter.get('/', (req,res) =>{
    res.send("Thanh cong")
});

mangaRouter.post('/', (req,res) => {
    const {error} = validateManga(req.body);
    if (error) return res.status(400).send(error.detail[0].message);
    var manga = new MangaModel();
    manga.name = req.body.name;
    manga.author = req.body.author;
    manga.year = req.body.year;
    manga.rate = req.body.rate;

    manga.save((err, manga) => {
        if(err) {
            res.send("khong the them manga")
        } else {
            console.log("Da them manga thanh cong");
            res.send(manga);
        }
    });

});

function validateManga(manga) {
    const schema = Joi.object({
        name: Joi.string().min(1).required(),
        author: Joi.string().required(),
        year: Joi.number().min(0).required(),
        rate: Joi.number().min(0).max(5).required()
    });
    return schema.validate(manga);
};

mangaRouter.put('/:id', (req,res) => {
    mangaModel.findOneAndUpdate({
        _id: req.params.id
    },
    {$set:
        {
             name: req.body.name,
            author:req.body.author,
            year: req.body.year,
            rate: req.body.rate
        }
    }, {upsert: true},
    (err, manga) => {
        if (err) {
            res.send("xay ra loi update")
        } 
        res.send(manga);
    })
});

mangaRouter.delete('/:id', (req,res) => {
    mangaModel.findByIdAndRemove({
        _id: req.params.id
    }, (err) => {
        if (err) {
            res.send("khong tim thay manga")
        } else {
            res.send("xoa thanh cong")
        }
    })
})

module.exports = mangaRouter;