const videoModel = require('../models/video.models');

const videoControllers = {};

videoControllers.create = async(req, res, next) => {
    try {
        const { videoBanner, channelName, channelPhoto, 
        videoName, link, category } = req.body;

        const _video = new videoModel({
            videoBanner: videoBanner,
            channelName: channelName,
            channelPhoto: channelPhoto,
            videoName: videoName,
            link: link,
            category: category
        })

        const savedVideo = await _video.save();

        if(!savedVideo){
            return res.status(409).json({ error: "An error ocurred while creating video" });
        }else{
            return res.status(201).json({ message: "Video created" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

videoControllers.getAll = async(req, res, next) => {
    try {
        const _videos = await videoModel.find();

        return res.status(200).json(_videos);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

videoControllers.getAllByCategory = async(req, res, next) => {
    try {
        const { category } = req.params;

        const _videos = await videoModel.find({ category: category });

        return res.status(200).json(_videos);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

videoControllers.getById = async(req, res, next) => {
    try {
        const { id } = req.params;

        const _videos = await videoModel.findById(id);

        return res.status(200).json(_videos);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


module.exports = videoControllers;