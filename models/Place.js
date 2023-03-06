const mongoose = require('mongoose');

const placeSchema=mongoose.Schema({
    name: String,
    address:String,
    district: String,
    phones:Array,
    email:String,
    workHours: Object,
    numberOfHalls: Number,
    coordinates:Array,
    webSite: String,
    photos: Object,
    placeCategory: String,
    categoryUrl: String,
    popular:{type:Number, default: 0},
    owner: [{type: mongoose.Types.ObjectId, ref: 'placeCategory'}]
});

module.exports = mongoose.model('place',placeSchema)