import { ADD_ANSWER, ADD_QUESTION, DELETE_ANSWER, DELETE_QUESTION, EDIT_ANSWER, EDIT_QUESTION, FETCH_ALL,UPVOTE,DOWNVOTE } from "../constants/actionTypes";

const quesReducer = (questions=[], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case ADD_QUESTION:
            return [...questions,action.payload];
        case EDIT_QUESTION:
        case ADD_ANSWER:
        case EDIT_ANSWER:
        case DELETE_ANSWER:
        case UPVOTE:
        case DOWNVOTE:
            return questions.map(question => question._id === action.payload._id ? action.payload : question);
        case DELETE_QUESTION:
            return questions.filter(question => question._id !== action.payload._id);
        default:
            return questions;
    }
}

export default quesReducer;