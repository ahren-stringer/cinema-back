const express = require('express');
//const { __dirname } = require('../app.js');
const {Router} = express;
const router=Router()
const PlaceCategory = require('../models/PlaceCategory.js');
const path = require('path');

router.post(
    '/place_category',
    async (req, res) => {
        try {
            const { category, categoryUrl } = req.body
            const condidate = await PlaceCategory.findOne({ category })
            if (condidate) {
                return res.status(400).json({ message: 'Такая категория уже есть' })
            }
            const newCategory = new PlaceCategory({ category, categoryUrl });

            await newCategory.save()

            res.status(201).json({ message: 'Категория зарегистрирована' })
        } catch (e) {
            res.status(500).json({ message: 'Ошибка записи' })
        }
    })

    router.get(
    '/place_category',
    async (req, res) => {
        try {
            const category = await PlaceCategory.find()
            console.log(path.normalize(__dirname+'/'+'index.html'))
            res.json(category)
        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так' })
        }
    })
    // router.get(
    //     '/category/:type',
    //     async (req, res) => {
    //         try {
    //             console.log(path.normalize(__dirname+'/'+'index.html'))
    //             res.sendFile(path.normalize(__dirname+'/'+'index.html'))
    //         } catch (e) {
    //             console.log(e)
    //             res.status(500).json({ message: 'Что-то пошло не так' })
    //         }
    //     })

    module.exports = router