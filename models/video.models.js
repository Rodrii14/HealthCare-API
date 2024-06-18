const mongoose = require('mongoose');
const schema = mongoose.Schema;

//creating video schema
const videoSchema = new schema({
    videoBanner: {
        type: String,
        required: true,
        trim: true
    },
    channelName: {
        type: String,
        required: true,
        trim: true
    },
    channelPhoto: {
        type: String,
        required: true,
        trim: true
    },
    videoName: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    link: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: Number,
        required: true,
        trim: true
    }
},{ timestamps: true });

module.exports = mongoose.model('video', videoSchema);