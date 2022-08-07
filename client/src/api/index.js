import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8000' })

export const getQuestions= () => API.get('/ques');

export const addQuestion = (question) =>API.post(`/ques/addQues`,question);

export const addAnswer = (answer) =>API.put(`/ques/addAnswer`,answer);

export const deleteQuestion = (id) =>API.delete(`/ques/deleteQuestion/${id}`);

export const deleteAnswer = (answer) =>API.put(`/ques/deleteAnswer`,answer);

export const upvoteQuestion = (questionId, EmailId) =>API.put(`/ques/upvoteQuestion/`,{questionId, EmailId});

export const downvoteQuestion = (questionId, EmailId) =>API.put(`/ques/downvoteQuestion/`,{questionId,EmailId});

export const upvoteAnswer = (answer, EmailId) =>API.put(`/ques/upvoteAnswer/`,{answer, EmailId});

export const downvoteAnswer = (answer, EmailId) =>API.put(`/ques/downvoteAnswer/`,{answer,EmailId});



export const signin = (formData) => API.post('/users/signin', formData);

export const signup = (formData) => API.post('/users/signup', formData);
