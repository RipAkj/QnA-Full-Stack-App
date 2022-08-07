import React, { useState } from "react";
import { useLocation } from "react-router";

import { useDispatch } from "react-redux";
import { addQuestion } from "../../actions/questions";

import "./styles.css";

const AddEditQuestion = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  const [data, setData] = useState({ UserName: user.result.UserName, Question: "", Answers:[]});
  const dispatch = useDispatch();
  const location = useLocation();
  const title = location.state?.title;
  const purpose = location.state?.purpose;

  const handleAddQuestion = (e) => {
    e.preventDefault();

    dispatch(addQuestion(data));

    window.location = "/";
  };

  return (
    <div id="AddEdit" className="AddEdit">
      <h2>{title}</h2>
      <form className="addEdit-form">
        <div className="formItem">
          <label htmlFor="textbox">{purpose}</label>
          <textarea name={purpose} id="" cols="30" rows="10" value={data.Question} onChange={(e) => setData({ ...data, Question: e.target.value })} autoFocus />
          <input type='submit' className="submit-btn" onClick={handleAddQuestion}/>
        </div>
      </form>
    </div>
  );
};

export default AddEditQuestion;
