import React, { useState, useEffect } from 'react';
import { Content, RegisterPanel } from '../../lib/quntu-ui-v1/quntu-ui-v1';
import { API_URL, UPLOAD_IMG_URL, logo } from '../../config.json';
import M from 'materialize-css';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import '../../App.css';

function MyPlaylists() {
    var history = useHistory()

    var [playlists, setPlaylists] = useState(null);
    var [playlistsFined, setFined] = useState("false");

    useEffect(() => {
        axios.post(`${API_URL}/playlist/myplaylists`, {}, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then((playlists) => {
                console.log("playlists", playlists)
                setPlaylists(playlists.data.playlists);
                setFined(playlists.data.fined);
                
            })

    }, [])

    return (
        <center>
            {playlistsFined === true
                ?
                <Content>
                    {
                        playlists.length == 0
                            ?
                        <h1>Görüntüleyebildiğiniz Oynatma Listeniz Yok. </h1>
                            :
                        <div className='gallery' style={{
                            display: "flex",
                            justifyContent: "space-around"
                        }}>

                            {playlists.map((playlist) => {
                                return (
                                    <div className='card home-card' style={{ cursor: "pointer", height: "65%" }} onClick={() => window.location = "/playlist/view/" + playlist._id} >
                                        <h4 style={{ fontSize: "20px" }}>{playlist.name}</h4>
                                        <h6>{playlist.views.length} Görüntüleyici</h6>

                                        {console.log(playlist)}

                                    </div>
                                )
                            })}

                        </div>
                    }
                </Content>
                :
                <div>
                    <h4>Yükleniyor...</h4>
                </div>
            }



        </center>
    )
}

export default MyPlaylists;