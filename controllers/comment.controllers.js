const commentModel = require('../models/comment.models');

const commentController = {};

commentController.create = async() => {
    try {
        const { content } = req.body;
        const { user } = req;

        const _date = new Date();
        const date = _date.toLocaleDateString();

        const _comment = new commentModel({
            user: user,
            content: content,
            date: date
        });

        const savedComment = await _comment.save();
        if(!savedComment){
            return res.status(409).json({ error: 'An error ocurred' });
        }

        return res.status(201).json({ message: 'comment posted' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

commentController.getAll = async() => {
    try {
        
        const _comments = await commentModel.find();
        if(!_comments){
            return res.status(200).json({ message: 'So quiet...' });
        }

        return res.status(200).json(_comments);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = commentController;