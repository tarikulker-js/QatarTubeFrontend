import React, { useState, useEffect } from 'react';
import { Content, RegisterPanel } from '../../lib/quntu-ui-v1/quntu-ui-v1';
import { API_URL, UPLOAD_IMG_URL, logo } from '../../config.json';
import M from 'materialize-css';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import '../../App.css';

function Home() {
    var history = useHistory()
    var [name, setName] = useState("");
    var [username, setUsername] = useState("");
    var [password, setPasword] = useState("");
    var [email, setEmail] = useState("");
    var [image, setImage] = useState("");
    var [url, setUrl] = useState(undefined);

    var [videos, setVideos] = useState(null);
    var [videosFined, setFined] = useState("false");

    useEffect(() => {
        if (url) {
            uploadFields()
        }

        axios.post(`${API_URL}/get-videos`, {}, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then((videos) => {
                console.log("videos", videos)
                setVideos(videos.data);
                setFined(videos.data.fined);

                //alert(videos.data.message);
                //alert(videos.data.fined)
            })

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
        //alert("clicked");


        //alert("signup beforeing", url);

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
        <div className="Home">
            { localStorage.getItem("logined") === "false"
                ?
                <center>
                    <Content verticalAlignContent>
                        <RegisterPanel
                            imageUrl="https://res.cloudinary.com/qatar-tube/image/upload/v1626609762/watching-qatar-tube.jpg"
                            imageHeaderText="Hemen Ücretsiz QatarTube'a Katıl!"
                            imageContentText="Hiç bir ücret ödemeden sen de bütün özelliklerden faydalan. Formu eksiksiz doldur ve tüm özelliklerden yararlan!"
                        >
                            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

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
                            <br /><br />

                        </RegisterPanel>
                    </Content>
                </center>
                :
                <div>

                </div>
            }

            { videosFined === "true"
                ?
                <Content>
                    <div className='gallery' style={{
                        display: "flex",
                        justifyContent: "space-around"
                    }}>

                        {videos.videos.map((video) => {
                            return (
                                <div className='card home-card' style={{ cursor: "pointer", height: "65%" }} onClick={() => window.location="/watch/" + video._id} >
                                    <img
                                        key="60eb"
                                        src={video.videoImageURL}
                                        alt="Video"
                                        style={{
                                            width: "100%"
                                        }}
                                    />
                                    <h4>{video.title}</h4>
                                    <h6>{video.views.length} İzlenme</h6>
                                    
                                    { console.log(video) }
                                    
                                </div>
                            )
                        })}

                    </div>
                </Content>
                :
                <div>
                    <h4>Yükleniyor...</h4>
                </div>
            }

        </div>
    )
}

export default Home;