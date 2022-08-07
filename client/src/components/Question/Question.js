import React,{ useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteQuestion, getQuestions, upvoteQuestion, downvoteQuestion } from "../../actions/questions";

import { useDispatch } from "react-redux";

import "./styles.css";

const Question = ({ question }) => {

  const user = JSON.parse(localStorage.getItem('profile'));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQuestions());
  },[dispatch]);
  // console.log(question);

  const handleDeleteQuestion = () => {
    dispatch(deleteQuestion(question._id));
    window.location = '/'
  }

  const handleUpvote = () => {
      dispatch(upvoteQuestion(question._id,user?.result.EmailId));
  }
  const handleDownvote = () => {
    dispatch(downvoteQuestion(question._id,user?.result.EmailId));
  }

  return (
    <>
      <div id="Question" className="Question">
        <div className="Question-header">
          <div className="Username">
            <div className="avatar">
              <h1>{question.UserName.charAt(0)}</h1>
            </div>
            <div className="UserText">
              <h3>{question.UserName}</h3>
              <h5>Posted on : {question.createdAt.substr(0,10)} at {question.createdAt.substr(11,9)}</h5>
            </div>
          </div>
          <h3>{question.Question}</h3>
        </div>
        <div className="actions">
          { user?.result.UserName===question.UserName && <button className="btn-secondary"  onClick={handleDeleteQuestion}><i className="fas fa-trash"></i> Delete</button>}
          { user && (<><Link
            to={{ pathname: "/addEditAnswer", state: { title: 'Add Answer', purpose: 'Answer', questionId:`${question._id}`}}} className='btn-secondary'>
            <i className="fas fa-pen"></i> Answer
          </Link>
          <button className="btn-secondary" onClick={handleUpvote}><i className="fas fa-thumbs-up"></i> {question.upvotes.length}</button>
          <button className="btn-secondary" onClick={handleDownvote}><i className="fas fa-thumbs-down"></i> {question.downvotes.length}</button></>)}
        </div>
      </div>
      <div className="ViewAnswer">
        <Link to={{ pathname: `/question/${question._id}`, state: { ques:question}}}>
            View Answers &rarr;
        </Link>
      </div>
    </>
  );
};

export default Question;
