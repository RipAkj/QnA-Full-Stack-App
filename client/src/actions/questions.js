import * as api from '../api/index';
import { ADD_ANSWER, ADD_QUESTION, DELETE_ANSWER, DELETE_QUESTION, DOWNVOTE, FETCH_ALL, UPVOTE } from '../constants/actionTypes';

export const getQuestions = () => async (dispatch) => {
    try {
        const { data } = await api.getQuestions();


        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log('Error : ', error );
    }
}

export const addQuestion = (question) => async (dispatch) => {
    try {
        const { data } = await api.addQuestion(question);

        console.log(data);


        dispatch({ type: ADD_QUESTION, payload: data });
    } catch (error) {
        console.log('Error : ', error );
    }
}

export const upvoteQuestion = (questionId,EmailId) => async (dispatch) => {
    try {
        const { data } = await api.upvoteQuestion(questionId,EmailId);

        dispatch({ type: UPVOTE, payload: data });
    } catch (error) {
        console.log('Error : ', error );
    }
}
export const downvoteQuestion = (questionId,EmailId) => async (dispatch) => {
    try {
        const { data } = await api.downvoteQuestion(questionId,EmailId);

        dispatch({ type: DOWNVOTE, payload: data });
    } catch (error) {
        console.log('Error : ', error );
    }
}

export const upvoteAnswer = (answer,EmailId) => async (dispatch) => {
    try {
        const { data } = await api.upvoteAnswer(answer,EmailId);
        console.log(data);

        dispatch({ type: UPVOTE, payload: data });
    } catch (error) {
        console.log('Error : ', error );
    }
}
export const downvoteAnswer = (answer,EmailId) => async (dispatch) => {
    try {
        const { data } = await api.downvoteAnswer(answer,EmailId);

        dispatch({ type: DOWNVOTE, payload: data });
    } catch (error) {
        console.log('Error : ', error );
    }
}

export const deleteQuestion = (id) => async (dispatch) => {
    try {
        const { data } = await api.deleteQuestion(id);
        
        dispatch({ type: DELETE_QUESTION, payload: data });
    } catch (error) {
        console.log('Error : ', error );
    }
}

export const addAnswer = (answer) => async (dispatch) => {
    try {
        const { data } = await api.addAnswer(answer);
        
        dispatch({ type: ADD_ANSWER, payload: data });
    } catch (error) {
        console.log('Error : ', error );
    }
}

// export const editAnswer = (answer,id) => async (dispatch) => {
//     try {
//         const { data } = await api.editAnswer(answer,id);
        
//         dispatch({ type: EDIT_ANSWER, payload: data });
//     } catch (error) {
//         console.log('Error : ', error );
//     }
// }

export const deleteAnswer = (answer) => async (dispatch) => {
    try {
        const { data } = await api.deleteAnswer(answer);
        
        dispatch({ type: DELETE_ANSWER, payload: data });
    } catch (error) {
        console.log('Error : ', error );
    }
}