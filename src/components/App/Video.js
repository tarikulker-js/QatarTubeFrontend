import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL } from '../../config.json';
import M from 'materialize-css';
import Select from 'react-select';
import axios from 'axios';
import { Layout, Form, Input, Slider, Row, Col, Image, Typography, Radio, Divider, Button } from 'antd';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai'; //unlike \ undislike
import { AiFillLike, AiFillDislike } from 'react-icons/ai'; //liked | undisliked
import Popup from 'reactjs-popup'; 
import 'reactjs-popup/dist/index.css';

import VideoPlayer from '../VideoPlayer';

import '../../App.css';

const { Content } = Layout;
const { Title, Text } = Typography;


function VideoPage() {
    var { videoId } = useParams();
    var [videoInfos, setVideoInfos] = useState(null);
    var [commentsInfos, setCommentsInfos] = useState(null);
    var [replyCommentsInfos, setReplyCommentsIfos] = useState(null);

    var [currentTime, setCurrentTime] = useState();
    var [playbackSpeed, setPlaybackSpeed] = useState();

    const playbackSpeedOptions = [
        { value: Number(-0.25), label: '0.25' },
        { value: Number(-0.50), label: '0.50' },
        { value: Number(-0.75), label: '0.75' },
        { value: Number(0), label: '1.0' },
        { value: Number(0.25), label: '1.25' },
        { value: Number(0.50), label: '1.50' },
        { value: Number(0.75), label: '1.75' },
        { value: Number(1), label: '2' },

    ];

    function updateVideoInfos() {
        axios.post(`${API_URL}/video/${videoId}`, { video: videoId }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then((res) => {
                setVideoInfos(res.data.video);
            })

        axios.post(`${API_URL}/getcomments/${videoId}`, {}, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then((comments) => {
            console.log(comments.data);
            setCommentsInfos(comments.data);

        })
            .catch((err) => alert(err))

        axios.post(`${API_URL}/getreplycomments/${videoId}`, {}, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then((replyComments) => {
            console.log(replyComments.data);
            setReplyCommentsIfos(replyComments.data);

        })
            .catch((err) => alert(err))

        //getreplycomments
    }

    useEffect(() => {
        updateVideoInfos();

    }, [])

    function likeVideo() {
        //alert("clicked. ");

        axios.put(`${API_URL}/like`, { videoId: videoId, userId: localStorage.getItem("id") }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then((res) => {
            updateVideoInfos();

            console.log(res);
            //alert("liked.");

            if (!res.data.message) {

            } else {
                //alert("Video zaten beğenildi. ");
            }

        })
    }

    function unlikeVideo() {
        //alert("unlike ");

        axios.put(`${API_URL}/unlike`, { videoId: videoId, userId: localStorage.getItem("id") }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then((res) => {
            updateVideoInfos();

            console.log(res);

            if (!res.data.message) {

            } else {
                //alert("Video zaten beğenildi. ");
            }
        })
    }

    function dislikeVideo() {
        //alert("dislike");

        axios.put(`${API_URL}/dislike`, { videoId: videoId, userId: localStorage.getItem("id") }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then((res) => {
            updateVideoInfos();

            console.log(res);
            //alert("disliked.")

            if (!res.data.message) {

            } else {
                //alert("Video zaten beğenildi. ");
            }
        })
    }

    function undislikeVideo() {

        axios.put(`${API_URL}/undislike`, { videoId: videoId, userId: localStorage.getItem("id") }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then((res) => {
            updateVideoInfos();

            //alert("undisliked. ");

            console.log(res);

            if (!res.data.message) {

            } else {
                alert("Video zaten beğenildi. ");

            }
        })

    }

    function likeComment(commentId) {
        axios.put(`${API_URL}/likecomment`, { commentId: commentId, userId: localStorage.getItem("id") }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then((res) => {
                updateVideoInfos();

            }).catch((err) => alert(err))
    }

    function unlikeComment(commentId) {
        axios.put(`${API_URL}/unlikecomment`, { commentId: commentId, userId: localStorage.getItem("id") }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then((res) => {
                updateVideoInfos();

            }).catch((err) => alert(err))
    }

    function dislikeComment(commentId) {
        axios.put(`${API_URL}/dislikecomment`, { commentId: commentId, userId: localStorage.getItem("id") }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then((res) => {
                updateVideoInfos();

            }).catch((err) => alert(err))
    }

    function undislikeComment(commentId) {
        axios.put(`${API_URL}/undislikecomment`, { commentId: commentId, userId: localStorage.getItem("id") }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then((res) => {
                updateVideoInfos();

            }).catch((err) => alert(err))
    }



    return (

        <center>
            <div className="VideoPage">

                {videoInfos == null || videoInfos == undefined || videoInfos == {}
                    ?
                    <img src="https://res.cloudinary.com/qatar-tube/image/upload/v1625742894/samples/loading_utigzr.gif" />
                    :
                    <div className="video">
                        <VideoPlayer videoURL={videoInfos.URL} />

                        <div className="videoInfos">
                            <h4 className="videoTitle" style={{
                                float: "left"
                            }}>{videoInfos.title}</h4>

                            <br /><br /><br /><br />

                            <h5 className="videoDesc" style={{
                                float: "left"
                            }}>{videoInfos.desc}</h5>

                            <br /><br /><br /><br />


                            {console.log("likes includes", videoInfos.likes.includes(localStorage.getItem("id")))}

                            {videoInfos.likes.includes(localStorage.getItem("id")) === true
                                ? <div className="videoEvents">
                                    <div className="like">
                                        <AiFillLike onClick={unlikeVideo} style={{
                                            float: "left",
                                            width: "50px",
                                            height: "50px",
                                            marginLeft: "50px",
                                            cursor: "pointer"
                                        }} />
                                    </div>

                                    {
                                        videoInfos.dislikes.includes(localStorage.getItem("id")) === false ?
                                            <AiOutlineDislike onClick={dislikeVideo} style={{
                                                float: "left",
                                                width: "50px",
                                                height: "50px",
                                                marginLeft: "75px",
                                                cursor: "pointer"
                                            }} />

                                            :

                                            <AiFillDislike onClick={() => { alert("ayn kardeşim aras kargo aç kapıyı amq") }} style={{
                                                float: "left",
                                                width: "50px",
                                                height: "50px",
                                                marginLeft: "75px",
                                                cursor: "pointer"
                                            }} />
                                    }
                                </div>
                                :
                                <div className="videoEvents">
                                    <AiOutlineLike onClick={likeVideo} style={{
                                        float: "left",
                                        width: "50px",
                                        height: "50px",
                                        marginLeft: "50px",
                                        cursor: "pointer"
                                    }} />

                                    {

                                        videoInfos.dislikes.includes(localStorage.getItem("id")) === false ?

                                            <AiOutlineDislike onClick={dislikeVideo} style={{
                                                float: "left",
                                                width: "50px",
                                                height: "50px",
                                                marginLeft: "75px",
                                                cursor: "pointer"
                                            }} onmouseover="cursor: wait;" />
                                            :

                                            <AiFillDislike onClick={undislikeVideo} style={{
                                                float: "left",
                                                width: "50px",
                                                height: "50px",
                                                marginLeft: "75px",
                                                cursor: "pointer"
                                            }} />
                                    }
                                </div>
                            }

                            <br /><br /><br />

                            <div className="videoEventInfos" style={{ display: "flex", float: "left" }}>
                                <h4 style={{ float: "left", marginLeft: "50px", fontSize: "20px", cursor: "grab" }}>{videoInfos.likes.length} Like</h4>
                                <h4 style={{ float: "left", marginLeft: "75px", fontSize: "20px", cursor: "grab" }}>{videoInfos.dislikes.length} Dislike</h4>
                            </div>
                        </div>

                        <div className="videoComments">
                            <Content className="videoCommentLayout" >
                                <Row gutter={[16, 16]} >
                                    <Col flex="5 1 400px" >
                                        <Form layout={"vertical"} style={{ backgroundColor: 'white', height: 700, overflowY: 'scroll', padding: 50, textAlign: 'center' }} name="basic" initialValues={{ remember: true, }} className="videoCommentLayout" >
                                            {console.log("commentInfos: "), console.log(commentsInfos)}

                                            {
                                                commentsInfos ?
                                                    commentsInfos.map((comment) => {
                                                        console.log("maped comment")
                                                        console.log(comment);

                                                        return (
                                                            <Form.Item style={{ backgroundColor: "blue" }}>
                                                                <div style={{ display: "" }}>
                                                                    <div className="videoCommentUserInfos" style={{ display: "flex" }}>
                                                                        <img src={comment.postedBy.pic} style={{ width: "50px", height: "50px" }} />
                                                                        <span style={{ marginLeft: "5px" }}><h5>{comment.postedBy.name}</h5></span>
                                                                    </div>
                                                                    <span><p>{comment.text}</p></span>
                                                                    <div className="videoCommentEvents" style={{ display: "flex" }}>
                                                                        {comment.likes.includes(localStorage.getItem("id")) === true ? <div><AiFillLike style={{}} onClick={() => unlikeComment(comment._id)} /> {comment.likes.length} Like</div> : <div> <AiOutlineLike style={{}} onClick={() => likeComment(comment._id)} /> {comment.likes.length} Like </div>}

                                                                        {comment.dislikes.includes(localStorage.getItem("id")) === true ? <div><AiFillDislike style={{}} onClick={() => undislikeComment(comment._id)} /> {comment.dislikes.length} Dislike</div> : <div> <AiOutlineDislike style={{}} onClick={() => dislikeComment(comment._id)} /> {comment.dislikes.length} Dislike </div>}

                                                                        <h6 style={{ marginLeft: "30px", fontSize: "15px", display: "flex", marginTop: "0%" }}>{comment.replys.length} Cevap</h6>

                                                                        <Popup trigger={<button> Trigger</button>} position="bottom center"> 
                                                                            <div>
                                                                                Popup content here !!
                                                                            </div> 
                                                                        </Popup>
                                                                    </div>
                                                                </div>
                                                            </Form.Item>

                                                        )
                                                    })
                                                    :
                                                    <h4>Yorumlar yükleniyor... </h4>

                                            }

                                        </Form>
                                    </Col>
                                </Row>
                            </Content>
                        </div>
                    </div>
                }


            </div>
        </center>
    )
}

export default VideoPage;

//ENOSPC: System limit for number of file watchers reached,
