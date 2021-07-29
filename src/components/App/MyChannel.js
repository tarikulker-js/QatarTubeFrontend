import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'antd';
import { QuntuContent } from '../../lib/quntu-ui-v1/quntu-ui-v1';
import randomColor from "randomcolor";
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai'; //unlike \ undislike
import { AiFillLike, AiFillDislike } from 'react-icons/ai'; //liked | undisliked
import { FcLike, FcDislike } from 'react-icons/fc'; //add fav / takeout fav
import { MdRemoveCircle } from 'react-icons/md';

import { API_URL } from '../../config.json';

function MyChannel() {
    var [myChannel, setMyChannel] = useState(null);
    var [bgColor, setBgColor] = useState("");

    function updateChannelInfos() {
        axios.post(`${API_URL}/mychannel`, {}, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then((myChannelReq) => {
                setMyChannel(myChannelReq.data.channel)
            })
    }

    useEffect(() => {
        updateChannelInfos();

        var color = randomColor();
        setBgColor(color);

    }, [])

    function likeVideo(videoId) {
        //alert("clicked. ");

        axios.put(`${API_URL}/like`, { videoId: videoId, userId: localStorage.getItem("id") }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then((res) => {
            updateChannelInfos();

            //alert("liked.");

            if (!res.data.message) {

            } else {
                //alert("Video zaten beğenildi. ");
            }

        })
    }

    function unlikeVideo(videoId) {
        //alert("unlike ");

        axios.put(`${API_URL}/unlike`, { videoId: videoId, userId: localStorage.getItem("id") }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then((res) => {
            updateChannelInfos();

            if (!res.data.message) {

            } else {
                //alert("Video zaten beğenildi. ");
            }
        })
    }

    function dislikeVideo(videoId) {
        //alert("dislike");

        axios.put(`${API_URL}/dislike`, { videoId: videoId, userId: localStorage.getItem("id") }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then((res) => {
            updateChannelInfos();

            //alert("disliked.")

            if (!res.data.message) {

            } else {
                //alert("Video zaten beğenildi. ");
            }
        })
    }

    function undislikeVideo(videoId) {

        axios.put(`${API_URL}/undislike`, { videoId: videoId, userId: localStorage.getItem("id") }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then((res) => {
            updateChannelInfos();

            //alert("undisliked. ");

            if (!res.data.message) {

            } else {
                //alert("Video zaten beğenildi. ");

            }
        })

    }

    return (
        <QuntuContent>
            <center>

                {
                    myChannel == null
                        ?
                        <img src="https://res.cloudinary.com/qatar-tube/image/upload/v1625742894/samples/loading_utigzr.gif" />
                        :
                        <div className="channelInfos" style={{
                            width: "100%",
                        }}>
                            <div style={{
                                backgroundColor: bgColor,
                                width: "100%",
                                height: "250px"
                            }}>

                            </div>

                            <h4 style={{ float: "left", marginLeft: "15px" }}>{myChannel.name}</h4>

                            <div className="subscribe" style={{ backgroundColor: "#181a1b" }}>
                                {myChannel.subscribes.includes(localStorage.getItem("id")) === true ?
                                    <Button type="primary" danger style={{ marginTop: "25px", float: "right", backgroundColor: "red", color: "white", width: "15%", height: "80%", alignItems: "center" }} onClick={() => {
                                        
                                    }} > Kendine Abone Olamazsın! </Button>
                                    :
                                    <Button type="primary" danger style={{ marginTop: "25px", float: "right", backgroundColor: "red", color: "white", width: "15%", height: "80%", alignItems: "center" }} onClick={() => {
                                        
                                    }} > Kendine Abone Olamazsın! </Button>
                                }
                            </div>
                            
                                <br /><br /><br /><br />
                            
                            <div className="videos">
                                <h5 style={{ marginLeft: "45px", float: "left", color: "white" }}>Videolarım: </h5>

                                    <br /><br />
                                {
                                    myChannel.myVideos.map((video) => {
                                        return (
                                            <div style={{ display: "", width: "100%", height: "125px", minHeight: "100px", maxHeight: "150px", backgroundColor: "#8a8a8a", cursor: "default", marginTop: "15px" }}>
                                                <div className="playlist-video" style={{ display: "flex", float: "left", height: "125px", minHeight: "100px", maxHeight: "150px", cursor: "pointer" }} onClick={() => window.location = "/watch/" + video._id}>
                                                    <img src={video.videoImageURL} style={{ height: "100%", float: "left" }} />
                                                    <h4 style={{ height: "45%", marginLeft: "15px", float: "left" }}>{video.title}</h4>
                                                </div>

                                                {video.likes.includes(localStorage.getItem("id")) === true
                                                    ? <div className="videoEvents">
                                                        <div className="like">
                                                            <AiFillLike
                                                                onClick={() => unlikeVideo(video._id)}
                                                                className="eventVideoOnPlaylist"
                                                                style={{
                                                                    float: "right",
                                                                    width: "35px",
                                                                    height: "35px",
                                                                    marginLeft: "15px",
                                                                    cursor: "pointer"
                                                                }} />
                                                        </div>

                                                        {
                                                            video.dislikes.includes(localStorage.getItem("id")) === false ?
                                                                <AiOutlineDislike
                                                                    onClick={() => { dislikeVideo(video._id) }}
                                                                    className="eventVideoOnPlaylist"
                                                                    style={{
                                                                        float: "right",
                                                                        width: "35px",
                                                                        height: "35px",
                                                                        marginLeft: "30px",
                                                                        cursor: "pointer"
                                                                    }} />

                                                                :

                                                                <AiFillDislike
                                                                    className="eventVideoOnPlaylist"
                                                                    style={{
                                                                        float: "right",
                                                                        width: "35px",
                                                                        height: "35px",
                                                                        marginLeft: "30px",
                                                                        cursor: "pointer"
                                                                    }} />
                                                        }
                                                    </div>
                                                    :
                                                    <div className="videoEvents">
                                                        <AiOutlineLike
                                                            onClick={() => likeVideo(video._id)}
                                                            className="eventVideoOnPlaylist"
                                                            style={{
                                                                float: "right",
                                                                width: "35px",
                                                                height: "35px",
                                                                marginLeft: "15px",
                                                                cursor: "pointer"
                                                            }} />

                                                        {

                                                            video.dislikes.includes(localStorage.getItem("id")) === false ?

                                                                <AiOutlineDislike
                                                                    onClick={dislikeVideo}
                                                                    className="eventVideoOnPlaylist"
                                                                    style={{
                                                                        float: "right",
                                                                        width: "35px",
                                                                        height: "35px",
                                                                        marginLeft: "30px",
                                                                        cursor: "pointer"
                                                                    }} onmouseover="cursor: wait;" />
                                                                :

                                                                <AiFillDislike
                                                                    onClick={() => undislikeVideo(video._id)}
                                                                    className="eventVideoOnPlaylist"
                                                                    style={{
                                                                        float: "right",
                                                                        width: "35px",
                                                                        height: "35px",
                                                                        marginLeft: "30px",
                                                                        cursor: "pointer"
                                                                    }} />
                                                        }
                                                    </div>
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>

                        </div>
                }
            </center>
        </QuntuContent>
    )
}

export default MyChannel;