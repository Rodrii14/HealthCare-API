const commentModel = require('../models/comment.models');
const userModel = require('../models/auth.models');

const commentController = {};

commentController.create = async(req, res, next) => {
    try {
        const { content, id } = req.body;
        const { user } = req;

        const _date = new Date();
        const date = _date.toLocaleDateString();

        const userInfo = await userModel.findById(user);

        const _comment = new commentModel({
            user: user,
            userName: userInfo.name,
            content: content,
            date: date
        });
        
        if(id){
            const commentToRespond = await commentModel.findById(id);
            commentToRespond.responses = [_comment, ...commentToRespond.responses];

            const savedComment = await commentToRespond.save();
            if(!savedComment){
                return res.status(409).json({ error: 'An error ocurred' })
            }
    
            return res.status(201).json({ message: 'comment posted' });

        }

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

commentController.getAll = async(req, res, next) => {
    try {
        
        const _comments = await commentModel.find();
        if(_comments.length ==  0){
            return res.status(200).json({ message: 'So quiet...' });
        }

        return res.status(200).json(_comments);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

commentController.delete = async(req, res, next) => {
    try {
        const { id } = req.params
        const _comment = await commentModel.findByIdAndDelete(id)
        
        if(!_comment){
            return res.status(404).json({ error: 'No coincidences' })
        }
        
        return res.status(200).json({ message: 'Post deleted' })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = commentController;