import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getQuestions } from "../../actions/questions";
import Question from "../Question/Question";

import Navbar from "../Navbar/Navbar";


import "./styles.css";

const Home = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questions);


  useEffect(() => {
    dispatch(getQuestions());
  },[dispatch]);

  return (
    <>
      <Navbar />
      <div id="Home" className="Home">
          {user && (<Link
            to={{ pathname: "/addEditQuestion", state: { title: 'Ask Question', purpose: 'Question',},}} >
              <div className="home-header">
              <div className="Username">
                <div className="avatar">
                  <h1>{user.result.UserName.charAt(0)}</h1>
                </div>
                <div className="UserText">
                  <h3  className="usertext-home">{user.result.UserName}</h3>
                </div>
              </div>
              <h3>What is your Question?</h3>
              </div>
          </Link>)}
        <div className="Home-container">
          {questions.map((question) => (
            <div key={question._id}>
              <Question question={question} />{" "}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
