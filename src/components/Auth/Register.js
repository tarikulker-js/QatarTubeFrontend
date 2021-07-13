import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';
import { API_URL, UPLOAD_IMG_URL } from '../../config';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import '../../App.css';

export default function SignIn() {
    const history = useHistory()
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPasword] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState("");
    const [url, setUrl] = useState(undefined);

    useEffect(() => {
        if (url) {
            uploadFields()
        }

    }, [url])

    const uploadPic = () => {
        console.log("uploadPic");

        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "qatar_tube")
        data.append("cloud_name", "qatartube")

        axios.post(`${UPLOAD_IMG_URL}`, data)
            .then(data => {
                console.log("uploadImage", data.data.url);

                setUrl(data.data.url);
            })
            .catch(err => {
                M.toast({ html: err, classes: "red darken-3" })
            })
    }

    const uploadFields = () => {
        alert("clicked");


        alert("signup beforeing", url);

        const user = {
            name,
            username,
            password,
            email,
            pic: url
        }

        console.log("before axios");

        console.log("after axios, before fetch")

        fetch(`${API_URL}/register`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                username,
                password,
                email,
                pic: url
            })
        }).then(res => res.json())
            .then(data => {
                console.log("fetch ", data)
                if (data.error) {
                    M.toast({ html: data.error, classes: "#c62828 red darken-3" })
                }
                else {
                    M.toast({ html: data.message, classes: "#43a047 green darken-1" })

                    history.push('/signin')
                }
            }).catch(err => {
                console.log(err)
            })

        console.log("after fetch and axios;")
    }

    const PostData = () => {
        if (image) {
            uploadPic()
            console.log("image is true, uploadPic is starting...")
        } else {
            uploadFields()
            console.log("image is false, uploadFields is starting...")

        }
    }

    return (
        <center>
            <div className="Register">
                {
                    localStorage.getItem("logined") == "false" ?     
                        <div className="card auth-card input-field" >
                            <h2 style={{ fontSize: '30px' }}>Qatar Tube</h2>

                            <input
                                type="text"
                                placeholder="Adınız"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                            <input
                                type="text"
                                placeholder="Kullanıcı Adınız"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />

                            <input
                                type="text"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <input
                                type="password"
                                placeholder="Şifreniz"
                                value={password}
                                onChange={(e) => setPasword(e.target.value)}
                            />

                            <div className="file-field input-field">
                                <div className="btn waves-effect waves-dark cyan">
                                    Profil Resminiz:

                                    <input
                                        type="file"
                                        onChange={(e) => setImage(e.target.files[0])}
                                        placeholder="Profil Resmi"
                                    />
                                </div>
                                <div className="file-path-wrapper">
                                    <input className="file-path validate" type="text" />
                                </div>
                            </div>

                            <button className="btn waves-effect waves-dark cyan"
                                onClick={() => PostData()}
                            >

                                Kayıt Ol

                            </button>

                            <h5>Zaten bir hesabınız var mı? <Link to='/login'>Giriş Yapın!</Link></h5>
                            <br /><br/>
                        </div>
                    :
                        <center>
                            <div>
                                <h5>Zaten kaydoldunuz ve giriş yaptınız. </h5>
                                {window.location="/"}
                            </div>
                        </center>    
                }
            </div>
        </center>

    )

}
