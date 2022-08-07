import mongoose from 'mongoose';
import Question from '../model/question.js';

export const getQuestion = async (req, res) => {
    try {
        const questions = await Question.find();
        res.status(200).json(questions);
    } catch (error) {
        res.status(404).json({message : error.message});
    }
}

export const addQuestion = async (req, res) => {
    const question = req.body;
    const newQuestion =  new Question(question);

    try {
        await newQuestion.save();
        res.status(201).json(newQuestion);
    } catch (error) {
        res.status(409).json({message : error});
    }
}

export const deleteQuestion = async (req,res) => {
    const { id } = req.params;
  
    // if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No question with that id');
  
    await Question.findByIdAndRemove(id);
  
    res.json({ message: 'Question deleted Successfully' });
}

export const addAnswer = async (req, res) => {
    const answer = req.body;
    const question = await Question.findById(answer._id);
    question.Answers.push(answer);

    try {
        const updatedQuestion = await Question.findByIdAndUpdate(answer._id, question, { new: true });
        res.status(201).json(updatedQuestion);
    } catch (error) {
        res.status(409).json({message : error.message});
    }
}

export const deleteAnswer = async (req, res) => {
    const answer = req.body;
    const question = await Question.findById(answer._id);
    
    question.Answers = question.Answers.filter(item => item.id != answer.id);

    try {
        const updatedQuestion = await Question.findByIdAndUpdate(answer._id, question, { new: true });
        res.status(201).json(updatedQuestion);
    } catch (error) {
        res.status(409).json({message : error.message});
    }
}

export const upvoteQuestion = async (req, res) => {
    const { questionId,EmailId } = req.body;

    if(!mongoose.Types.ObjectId.isValid(questionId)) return res.status(404).send(`No post with id: ${questionId}`);

    const question = await Question.findById(questionId);

    const index = question.upvotes.findIndex((e) => e === String(EmailId));
    // console.log(index);
    if(index === -1)
    {
        question.upvotes.push(EmailId);
        question.downvotes = question.downvotes.filter((e) => e !== String(EmailId));
    }
    else
    {
        question.upvotes = question.upvotes.filter((e) => e !== String(EmailId));
    }
    try {
        const updatedQuestion = await Question.findByIdAndUpdate(questionId, question, { new: true });
        res.status(201).json(updatedQuestion);
    } catch (error) {
        res.status(409).json({message : error.message});
    }
}
export const downvoteQuestion = async (req, res) => {
    const { questionId,EmailId } = req.body;

    if(!mongoose.Types.ObjectId.isValid(questionId)) return res.status(404).send(`No post with id: ${questionId}`);

    const question = await Question.findById(questionId);

    const index = question.downvotes.findIndex((e) => e === String(EmailId));
    // console.log(index);
    if(index === -1)
    {
        question.downvotes.push(EmailId);
        question.upvotes = question.upvotes.filter((e) => e !== String(EmailId));
    }
    else
    {
        question.downvotes = question.downvotes.filter((e) => e !== String(EmailId));
    }
    try {
        const updatedQuestion = await Question.findByIdAndUpdate(questionId, question, { new: true });
        res.status(201).json(updatedQuestion);
    } catch (error) {
        res.status(409).json({message : error.message});
    }
}

export const upvoteAnswer = async (req, res) => {
    const { answer,EmailId } = req.body;
    // console.log(answer, EmailId);
    if(!mongoose.Types.ObjectId.isValid(answer._id)) return res.status(404).send(`No post with id: ${answer._id}`);

    const question = await Question.findById(answer._id);

    const Answer = question.Answers.find((e) => e.id===answer.id);

    const index = Answer.upvotes.findIndex((e) => e === String(EmailId));
    // console.log(index);
    if(index === -1)
    {
        Answer.upvotes.push(EmailId);
        Answer.downvotes = Answer.downvotes.filter((e) => e !== String(EmailId));
    }
    else
    {
        Answer.upvotes = Answer.upvotes.filter((e) => e !== String(EmailId));
    }
    try {
        question.Answers.map((e) => (e.id===Answer.id ? Answer : e));
        const updatedQuestion = await Question.findByIdAndUpdate(answer._id, question, { new: true });
        // console.log(Answer,question);
        res.status(201).json(updatedQuestion);
    } catch (error) {
        console.log(error);
        res.status(409).json({message : error.message});
    }
}
export const downvoteAnswer = async (req, res) => {
    const { answer,EmailId } = req.body;

    if(!mongoose.Types.ObjectId.isValid(answer._id)) return res.status(404).send(`No post with id: ${answer._id}`);

    const question = await Question.findById(answer._id);

    const Answer = question.Answers.find((e) => e.id==answer.id);

    const index = Answer.downvotes.findIndex((e) => e === String(EmailId));
    // console.log(index);
    if(index === -1)
    {
        Answer.downvotes.push(EmailId);
        Answer.upvotes = Answer.upvotes.filter((e) => e !== String(EmailId));
    }
    else
    {
        Answer.downvotes = Answer.downvotes.filter((e) => e !== String(EmailId));
    }
    try {
        question.Answers.map((e) => (e.id==Answer.id ? Answer : e));
        const updatedQuestion = await Question.findByIdAndUpdate(answer._id, question, { new: true });
        // console.log(Answer,updatedQuestion)
        res.status(201).json(updatedQuestion);
    } catch (error) {
        res.status(409).json({message : error.message});
    }
}

