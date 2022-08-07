import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import { useDispatch } from "react-redux";
import { addAnswer } from "../../actions/questions";

import { v4 as uuidv4 } from 'uuid';

const AddEditAnswer = () => {
  const [data, setData] = useState({ _id:"", id:"", UserName: "", to:"", Answer: "" });
  const dispatch = useDispatch();
  const Location = useLocation();
  const title = Location.state?.title;
  const purpose = Location.state?.purpose;
  const questionId = Location.state?.questionId;

  // const question = useSelector(state => state.questions.find((q) => q._id===questionId))

  const user = JSON.parse(localStorage.getItem('profile'));

  const handleAddQuestion = (e) => {
    e.preventDefault();
    data.id=uuidv4();
    data._id=questionId;
    data.UserName = user.result.UserName;
    dispatch(addAnswer(data));
    window.location = `/`;
  };

  return (
    <div id="AddEdit" className="AddEdit">
      <h2>{title}</h2>
      <form className="addEdit-form">
        <div className="formItem">
          <label htmlFor="textbox">{purpose}</label>
          <textarea
            name={purpose}
            id=""
            cols="30"
            rows="10"
            value={data.Answer}
            onChange={(e) => setData({ ...data, Answer: e.target.value })}
            autoFocus
          />
        </div>
        {/* <Link to={{pathname:`/question/${questionId}`, state: { ques:question}}}><input type='submit' className="submit-btn" onClick={handleAddQuestion}/></Link> */}
        <input type='submit' className="submit-btn" onClick={handleAddQuestion}/>
      </form>
    </div>
  );
};

export default AddEditAnswer;
