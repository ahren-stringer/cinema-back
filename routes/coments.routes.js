const express = require('express');
const {Router} = express;
const router=Router()
const jwt  = require('jsonwebtoken');
const User = require('../models/User.js');
const Coment = require("../models/Coment.js");

router.post('/coment', async (req, res) => {

    try {
        const { coment, size, place, token } = req.body
        if (!token) return res.status(400).json({ message: 'Вы не авторизованны' })
       const decoded = jwt.verify(token, 'TopSecret')
        //req.user=decoded
        const user = await User.findById(decoded.userId)
        const newComent = new Coment({ coment, size, place, name: user.name, email: user.email, owner: decoded.userId })
        await newComent.save()
        res.status(201).json({ newComent })
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так' })
        console.log(e)
        //send(e)
        //status(500).json({ message: 'Что-то пошло не так' })
    }
})

router.get('/cinema/coments/:place', async (req, res) => {
    try {
        const coments = await Coment.find({place: req.params.place})
        res.json([coments[coments.length-1]])
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так' })
    }
})

router.get('/cinema/coments/some/:place/:limit/:skip', async (req, res) => {
    try {
        const coments = await Coment.find({place: req.params.place}).limit(+req.params.limit).skip(+req.params.skip)
        res.json(coments)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так' })
    }
})

router.get('/cinema/coments_count/:place', async (req, res) => {
    try {
        const coments = await Coment.find({place: req.params.place})
        res.json(coments.length)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так' })
    }
})

module.exports = router