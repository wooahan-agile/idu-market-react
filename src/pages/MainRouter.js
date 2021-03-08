import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Header, Footer
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

//auth
import HomePage from "./HomePage/HomePage";
import LoginPage from "./authPages/LoginPage";
import RegisterPage from "./authPages/RegisterPage";
import FindIdPage from "./authPages/FindIdPage";
import FindPasswordPage from "./authPages/FindPasswordPage";

//marketBoards
import BookListPage from "./Boards/Book/BookListPage";
import WritePage from "./Boards/WritePage";
import BoardPage from "./Boards/BoardPage";

import Auth from "../hoc/auth";

import { useDispatch } from "react-redux";
import { LOADING_REQUEST } from "../redux/types";

const MainRouter = () => {
  const dispatch = useDispatch();
  try {
    dispatch({
      type: LOADING_REQUEST,
    });
  } catch (e) {
    console.log(e);
  }

  return (
    <>
      <Router>
        <Header></Header>
        <Switch>
          <Route component={Auth(HomePage, null)} path="/" exact />
          <Route component={Auth(LoginPage, false)} path="/login" exact />
          <Route component={Auth(RegisterPage, false)} path="/register" exact />
          <Route component={Auth(FindIdPage, false)} path="/findId" exact />
          <Route
            component={Auth(FindPasswordPage, false)}
            path="/findPwd"
            exact
          />

          {/* boards list */}
          <Route
            component={Auth(BookListPage, null)}
            path="/boards/book"
            exact
          />
          <Route component={WritePage} path="/boards/book/write" exact />
          <Route component={BoardPage} path="/board" exact />
        </Switch>
        <Footer></Footer>
      </Router>
    </>
  );
};

export default MainRouter;
