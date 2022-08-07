import React,{ useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";
import Answer from "../Question/Answer/Answer";
import { deleteQuestion, downvoteQuestion, upvoteQuestion } from "../../actions/questions";

import { useParams } from "react-router-dom";

import './styles.css';

const QuesAns = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  const dispatch = useDispatch();
  const Location = useLocation();

  const { id } = useParams();
  const Ques = Location.state?.ques;

  const [question, setquestion] = useState(Ques);

  const ques = useSelector(state => state.questions.find((q) => q._id === id));

  useEffect(() => {
    if(ques!==undefined)
    setquestion(ques);
  },[ques])

  // console.log(ques,question,id);

  const handleDeleteQuestion = () => {
    dispatch(deleteQuestion(question._id));
    window.location='/';
  }

  const handleUpvote = () => {
      dispatch(upvoteQuestion(question._id,user?.result.EmailId));
  }
  const handleDownvote = () => {
    dispatch(downvoteQuestion(question._id,user?.result.EmailId));
  }

  return (
      <>
      <Navbar />
      <div className="QuesAns">
          <div className="Ques-container">
            <div className="Ques">
              <div className="Ques-header">
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
            <div className="Answers">
              <div className="ans-heading">Answers</div>
              <div className="Question-container">
                {question.Answers.map((answer) => (
                  <div key={answer.id}>
                    <Answer answer={answer} />
                  </div>
                ))}
              </div>
            </div>
          </div>
      </div>
    </>
  );
};

export default QuesAns;
