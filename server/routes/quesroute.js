import express from 'express';
import { getQuestion, addQuestion, addAnswer, deleteQuestion, deleteAnswer, upvoteQuestion, downvoteQuestion, upvoteAnswer, downvoteAnswer } from '../controllers/ques-controller.js';

const route = express.Router();

route.get('/', getQuestion);
route.post('/addQues', addQuestion);
route.put('/upvoteQuestion', upvoteQuestion);
route.put('/downvoteQuestion', downvoteQuestion);
route.put('/addAnswer', addAnswer);
route.put('/upvoteAnswer', upvoteAnswer);
route.put('/downvoteAnswer', downvoteAnswer);
route.delete('/deleteQuestion/:id', deleteQuestion);
route.put('/deleteAnswer', deleteAnswer);

export default route;