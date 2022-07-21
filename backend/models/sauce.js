const mongoose = require("mongoose");

const sauceSchema = mongoose.Schema({
    name: {type: string, required: true},
    manufacturer: {type: string, required: true},
    description: {type: string, required: true},
    heat: {type: number, required: true},
    likes: {type: number, required: true},
    dislikes: {type: number, required: true},
    imageUrl: {type: string, required: true},
    mainPepper: {type: string, required: true},
    usersLiked: {type: null, required: true},
    usersDisliked: {type: null, required: true},
});

module.exports = mongoose.model('sauce', sauceSchema);