const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true
    },
    artist: {
        type: String, 
        required: true
    },
    coverArt: {
        type: String,
        required: false, 
        default: 'https://via.placeholder.com/150?text=No+Cover+Art' 
    }
},
    {timestamps: true}
);

const Track = mongoose.model('Track', trackSchema);

module.exports = Track;