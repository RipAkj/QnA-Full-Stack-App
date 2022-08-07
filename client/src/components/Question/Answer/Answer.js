import React from "react";
import { useDispatch } from "react-redux";

import { deleteAnswer, upvoteAnswer, downvoteAnswer } from '../../../actions/questions';

const Answer = ({ answer }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  console.log(answer);

  const dispatch = useDispatch();

  const handleDeleteAnswer = () => {
    dispatch(deleteAnswer(answer));
  }
  const handleAnswerUpvote = () => {
    dispatch(upvoteAnswer(answer,user?.result.EmailId));
  }
  const handleAnswerDownvote = () => {
    dispatch(downvoteAnswer(answer,user?.result.EmailId));
  }

  return (
    <div className='answerContainer'>
      <div id="Answer" className="Question-header">
        <div className="Username">
          <div className="avatar">
            <h1>{answer.UserName.charAt(0)}</h1>
          </div>
          <div className="UserText">
            <h3>{answer.UserName}</h3>
            <h5>Posted on : {answer.createdAt.substr(0,10)} at {answer.createdAt.substr(11,9)}</h5>
          </div>
        </div>
        <h3>{answer.Answer}</h3>
      </div>
      <div className="actions">
      { user?.result.UserName===answer.UserName && (<button className="btn-secondary"  onClick={handleDeleteAnswer}><i className="fas fa-trash"></i> Delete</button>) }
      { user && (<>
                <button className="btn-secondary" onClick={handleAnswerUpvote}><i className="fas fa-thumbs-up"></i> {answer.upvotes.length}</button>
                <button className="btn-secondary" onClick={handleAnswerDownvote}><i className="fas fa-thumbs-down"></i> {answer.downvotes.length}</button>
                </>)}
      </div>
    </div>
  );
};

export default Answer;
