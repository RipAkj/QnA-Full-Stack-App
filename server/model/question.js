import mongoose from 'mongoose';

const quesSchema = mongoose.Schema({
    UserName : String,
    Question : String,
    Answers : [{
        _id:String,
        id:String,
        UserName : String,
        to: String,
        Answer : String,
        upvotes: {
            type: [String],
            default: [],
        },
        downvotes: {
            type: [String],
            default: [],
        },
        createdAt: {
            type:Date,
            default: new Date(),
        },
    }],
    upvotes: {
        type: [String],
        default: [],
    },
    downvotes: {
        type: [String],
        default: [],
    },
    createdAt: {
        type:Date,
        default: new Date(),
    },
})

const question = mongoose.model('question', quesSchema);

export default question;