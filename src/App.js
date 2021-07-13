import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import M from 'materialize-css';

import {API_URL} from './config.json';

//pages import
import Home from './components/App/Home';
import NewVideo from './components/App/NewVideo';
import VideoPage from './components/App/Video';

import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

//Navbar
import Navbar from './components/Menu/Navbar';

function App() {

  useEffect(() => {

    fetch(`${API_URL}/protected`, {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    }).then((res) => res.json())
    .then((data) => {
      console.log("JWT Verify", data);

      if(data.error === null && data.auth === true){
        localStorage.setItem("logined", true);
      }else if(data.error !== null && data.auth !== true){
        localStorage.setItem("logined", false);
      }
    })
    
  }, [])

  return (
    <div className="App">

      <Switch>
        <Route path="/watch/:videoId">
          <VideoPage />
        </Route>
        <Route path="/new/video">
          <NewVideo />
        </Route>
        <Route path="/logout">
          <Logout />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

function Logout(){
  return(
    <div>
      <h4>Çıkış yapılıyor... Lütfen bekleyiniz...</h4>

      {

        localStorage.setItem("jwt", null),
        localStorage.setItem("id", null),
        localStorage.setItem("name", null),
        localStorage.setItem("username", null),
        localStorage.setItem("email", null),

        localStorage.setItem("logined", false),

        setTimeout(function(){
          M.toast({html: "Çıkış yapılıyor, lütfen bekleyiniz...", classes: "red darken-3"})
        }, 5000)
      }

    </div>
  )
}