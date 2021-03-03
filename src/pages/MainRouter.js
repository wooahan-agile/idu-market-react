import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '../components/Header/Header';
import HomePage from './HomePage/HomePage';
import LoginPage from './authPages/LoginPage';
import RegisterPage from './authPages/RegisterPage';
import WritePage from './Boards/WritePage';
import BoardListPage from './Boards/BoardListPage';
import BoardPage from './Boards/BoardPage';

import Auth from '../hoc/auth';
  
import { useDispatch } from 'react-redux';
import { LOADING_REQUEST } from '../redux/types';

const MainRouter = () => {

    const dispatch = useDispatch();
    try{
        dispatch({
            type: LOADING_REQUEST,
        })
    } catch(e) {
        console.log(e);
    }

    return (
        <>  
            <Router>
              <Header></Header>
              <Switch>
                <Route component={Auth(HomePage, null)} path="/" exact />
                <Route component={Auth(LoginPage, false)} path="/login" exact/>
                <Route component={Auth(RegisterPage, false)} path="/register" exact/>
                <Route component={WritePage} path="/write" exact/>
                <Route component={BoardListPage} path="/boardlist" exact/>
                <Route component={BoardPage} path="/board" exact/>
              </Switch>
            </Router>
        </>
    );
};

export default MainRouter;