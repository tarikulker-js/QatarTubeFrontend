import React, { useState } from 'react';
import { API_URL } from '../../config.json';
import M from 'materialize-css';
import Select from 'react-select';
import axios from 'axios';

import '../../App.css';

function NewVideo() {
    var [videoTitle, setVideoTitle] = useState("");
    var [videoDesc, setVideoDesc] = useState("");

    var [videoPublic, setVideoPublic] = useState("public");

    const publicOptions = [
        { value: "public", label: 'Herkese açık. ' },
        { value: "private", label: 'Sadece ben ve seçtiğim kişiler.' },
        { value: "hidden", label: 'Sadece ben.' },
    ];

    var createVideo = () => {
        alert("clicked");
        console.log({videoTitle, videoDesc, videoPublic});

        const video = {
            title: videoTitle,
            desc: videoDesc,
            videoPublic
        }            
            
        axios.post(`${API_URL}/create-video`, video, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
        .then((res) => {
            console.log(res.data);
            console.log(res.data.fined);

            M.toast({html: res.data.message, classes: "green"})

            setTimeout(function(){
                window.location="/" + res.data.video
            }, 4000)
        })
    }
    
    return (
        <center>
            <div className="CreateVideo">
                <div className="card">
                    <div className="input-field card-item">
                        <br />
                            <h4 className="title">QatarTube'a video yükleyin.</h4>
                        <br /><br/>

                        Video Başlığı
                        <input
                            type="text"
                            placeholder="Başlık"
                            value={videoTitle}
                            onChange={(e) => setVideoTitle(e.target.value)}
                        />

                        Video Açıklaması:
                        <input
                            type="text"
                            placeholder="Açıklama"
                            value={videoDesc}
                            onChange={(e) => setVideoDesc(e.target.value)}

                        />

                        Video Gizliliği:
                        <Select
                            options={publicOptions}
                            onChange={(value) => setVideoPublic(value.value)}
                        />
                        
                        <br /><br />

                        <input type="button" className="btn cyan" value="Video'yu yükleyin" onClick={createVideo}  />

                    </div>
                </div>
            </div>
        </center>

    )

}


export default NewVideo

