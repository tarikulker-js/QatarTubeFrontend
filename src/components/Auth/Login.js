import React, { useState } from 'react';
import { API_URL } from '../../config.json';
import M from 'materialize-css';
import '../../App.css';
import axios from 'axios';

function Register() {
    var [email, setEmail] = useState("");
    var [password, setPassword] = useState("");;;
    
    const loginApi = () => {
        axios.post(`${API_URL}/login`, {email, password}, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then((data) => {
            console.log(data.data);

            alert(data.email);

            localStorage.setItem("jwt", data.data.token);
            localStorage.setItem("id", data.data.user);
            localStorage.setItem("name", data.data.name);
            localStorage.setItem("username", data.data.username);
            localStorage.setItem("email", data.data.email);
            
            if(data.data.error){
                M.toast({html: data.data.error, classes: "red"});

            }else if(!data.data.error){
                M.toast({html: "Giriş başarılı, yönlendiriliyorsunuz...", classes: "green"});

                setTimeout(function(){
                    window.location="/";
                }, 5000)
            }
        })
        .catch((err) => console.log("request error", err))
    }
    
    return (
        <center>
            <div className="Login">
               { localStorage.getItem("logined") == "false" ? 
                        <center>
                            <div className="card">
                                <div className="card-content">
                                    <div className="input-field col s6">
                                        <input id="email" type="text" className="validate" onChange={(value) => setEmail(value.target.value)} />
                                        <label for="email">E-Mail</label>
                                    </div>
                                    <div className="input-field col s6">
                                        <input id="password" type="password" className="validate" onChange={(value) => setPassword(value.target.value)} />
                                        <label for="password">Şifreniz</label>
                                    </div>

                                    <button className="btn cyan" onClick={loginApi}>Giriş Yap</button>
                            
                                </div>
                            </div>
                        </center>
                    :
                    <div>
                        <h5>Zaten giriş yaptınız. </h5>
                        {window.location="/"}
                    </div>    
                }
            </div>
        </center>
    )
}

export default Register