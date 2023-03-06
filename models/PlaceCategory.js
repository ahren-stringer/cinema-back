const mongoose = require('mongoose');

const PlaceCategorySchema=mongoose.Schema({
    categoryUrl: String,
    category: String,
    places: [{type: mongoose.Types.ObjectId, ref: 'place'}]
});

module.exports = mongoose.model('placeCategory',PlaceCategorySchema)