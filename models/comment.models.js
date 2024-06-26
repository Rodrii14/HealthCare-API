const mongoose = require('mongoose');
const schema = mongoose.Schema;

const commentSchema = new schema({
    user: {
        type: schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true
    },
    responses: {
        type: [{
            user: {
                type: schema.Types.ObjectId,
                ref: "user",
                required: true
            },
            userName: {
                type: String,
                required: true
            },
            content: {
                type: String,
                required: true,
            },
            date: {
                type: String,
                required: true
            }
        }
        ],
        required: true,
        default: []
    }
}, { timestamps: true });

module.exports = mongoose.model('comment', commentSchema);