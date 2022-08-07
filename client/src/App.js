import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import AddEditQuestion from './components/AddEdit/AddEditQuestion';
import AddEditAnswer from "./components/AddEdit/AddEditAnswer";
import Auth from './components/SignIn-Up/SignIn-Up';
import QuesAns from './components/QuesAns/Ques&Ans';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/addEditQuestion" exact component={AddEditQuestion} />
          <Route path="/addEditAnswer" exact component={AddEditAnswer} />
          <Route path="/auth" exact component={Auth} />
          <Route path="/question/:id" exact component={QuesAns} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
