const express = require('express');
const {Router} = express;
const router=Router()
const PlaceCategory = require('../models/PlaceCategory.js');
const Place = require('../models/Place.js');

router.post('/place_category/places', async (req, res) => {

    try {
        const { 
            name,
            address,
            district,
            phones,
            email,
            workHours,
            numberOfHalls,
            coordinates,
            webSite,
            photos,
            placeCategory,
            categoryUrl } = req.body

        const category = await PlaceCategory.findOne({ categoryUrl })

        const newPlace = new Place({
            name,
            address,
            district,
            phones,
            email,
            workHours,
            numberOfHalls,
            coordinates,
            webSite,
            photos,
            placeCategory,
            categoryUrl,
            owner: category
        })

        await newPlace.save()
        //await category.places.push(newPlace)
        res.status(201).json({ newPlace })
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так' })
    }
})
// Поиск

router.get('/place_category/places/search/:search', async (req, res) => {
    try {
        const places = await Place.find()

        if (req.params.search==='') res.json([])
        
        res.json(places.filter(item=> item.name.toLowerCase().includes(req.params.search)).slice(0,8))
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так' })
    }
})

router.get('/place_category/places/search_all/:search', async (req, res) => {
    try {
        const places = await Place.find()
        res.json(places.filter(item=> item.name.toLowerCase().includes(req.params.search)))
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так' })
    }
})

// по категориям
router.get('/place_category/places/category/:placeCategory', async (req, res) => {
    try {
        const places = await Place.find({ categoryUrl: req.params.placeCategory }).exec()
        res.json(places)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так' })
    }
})
// определенное количество
router.get('/place_category/places/some/:placeCategory/:limit/:skip', async (req, res) => {
    try {
        const places = await Place.find({categoryUrl:req.params.placeCategory}).limit(+req.params.limit).skip(+req.params.skip)
        res.json(places)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так' })
    }
})
router.get('/place_category/places/category_count/:category', async (req, res) => {
    try {
        const place = await Place.find({categoryUrl: req.params.category})
        res.json(place.length)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так' })
    }
})
// по местам
router.get('/place_category/places/:name', async (req, res) => {
    try {
        const places = await Place.find({name:req.params.name})
        res.json(places)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так' })
    }
})

// Популярность
router.put('/place_category/places/:id', async (req, res) => {
    try {
        await Place.findByIdAndUpdate({_id:req.params.id},req.body)
        let place= await Place.findById(req.params.id)
        console.log(place)
        res.send('+1')
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так' })
    }
})
router.get('/popular', async (req, res) => {
    try {      
        let places= await Place.find().exec()
        let arr=[]
        for (let i=0;i<places.length;i++){
            if ('popular' in places[i] && places[i].popular){
                arr.push(places[i])
            }
        }
        arr.sort((a, b) => b.popular - a.popular)
        res.json(arr)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так' })
    }
})
router.get('/popular/some', async (req, res) => {
    try {
        let places= await Place.find().exec()
        let arr=[]
        for (let i=0;i<places.length;i++){
            if ('popular' in places[i] && places[i].popular){
                arr.push(places[i])
            }
        }
        arr.sort((a, b) => b.popular - a.popular)
        res.json(arr.slice(0,6))
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так' })
    }
})
router.delete('/places', async (req, res) => {
    try {
        await Place.deleteOne({name:'Киноклуб «Эльдар»'})
        console.log(req);
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так' })
        console.log(e);
    }
})
module.exports = router