import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import M from 'materialize-css';
import { QuntuTheme, Header, HeaderCenter, HeaderLeft, HeaderRight, Content, Footer, FooterBottom, FooterMiddle, FooterTop, GraphicCardItem, RegisterPanel } from './lib/quntu-ui-v1/quntu-ui-v1';

import { API_URL, logo } from './config.json';

//pages import
import Home from './components/App/Home';
import NewVideo from './components/App/NewVideo';
import VideoPage from './components/App/Video';
import SubscriberVideos from './components/App/subscriberVideos';

import CreatePlaylist from './components/App/CreatePlaylist';
import Playlist from './components/App/Playlist';

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

        if (data.error === null && data.auth === true) {
          localStorage.setItem("logined", true);
        } else if (data.error !== null && data.auth !== true) {
          localStorage.setItem("logined", false);
        }
      })

  }, [])

  return (
    <div className="App">
      <QuntuTheme mode="dark" color1="#70a2fb" color2="#cf46fe"></QuntuTheme>
      <Header>
        <HeaderLeft>
          <img src={logo} style={{ objectFit: 'contain', backgroundColor: "#8a8a8a" }} onClick={() => window.location="/"} />
        </HeaderLeft>
        <HeaderCenter>
          {
            localStorage.getItem("logined") === "true"
              ?

              <center>
                <button style={{ width: "100%" }}  onClick={() => window.location="/"}><a href="/">Ana Sayfa</a></button>
                <br />
                <button style={{ width: "100%" }}  onClick={() => window.location="/channel"}><a href="/">Kanalım</a></button>
                <br />
				<button style={{ width: "100%" }} onClick={() => window.location="/subscribervideos"}><a href="/subscribervideos">Abonelikler</a></button>
                <br />
				<button style={{ width: "100%" }} onClick={() => window.location="/playlist/create"}><a href="/playlist/create">Playlist Oluştur</a></button>
                <br />
                <button style={{ width: "100%" }}  onClick={() => window.location="/trends"}><a href="/">Trendler</a></button>
                <br />
                <button style={{ width: "100%" }}  onClick={() => window.location="/logout"}><a href="/">Çıkış Yap</a></button>

              </center>
              :
              <div>
                <button style={{ width: "100%" }} onClick={() => window.location="/login"}><a href="/login">Giriş Yap</a></button>
                <br />
                <button style={{ width: "100%" }} onClick={() => window.location="/register"}><a href="/register">Kayıt Ol</a></button>
                <br />

              </div>

          }
        </HeaderCenter>
        <HeaderRight>

        </HeaderRight>
      </Header>

      <Switch>
		<Route path="/playlist/view/:playlistId">
			<Playlist />
		</Route>
		<Route path="/playlist/create">
			<CreatePlaylist /> 
		</Route>
		<Route path="/subscribervideos">
		  <SubscriberVideos />
		</Route>
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

      <Footer>
        <FooterTop>
          <h5>Developed by Tarik Ulker. </h5>
        </FooterTop>
        <FooterMiddle><h5>Developed by Tarik Ulker. </h5></FooterMiddle>
        <FooterBottom></FooterBottom>
      </Footer>

    </div>
  );
}

export default App;

function Logout() {
  return (
    <div>
      <h4>Çıkış yapılıyor... Lütfen bekleyiniz...</h4>

      {

        localStorage.setItem("jwt", null),
        localStorage.setItem("id", null),
        localStorage.setItem("name", null),
        localStorage.setItem("username", null),
        localStorage.setItem("email", null),

        localStorage.setItem("logined", false),

        setTimeout(function () {
          M.toast({ html: "Çıkış yapılıyor, lütfen bekleyiniz...", classes: "red darken-3" })
        }, 5000)
      }

    </div>
  )
}