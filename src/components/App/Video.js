import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import M from 'materialize-css';
import Select from 'react-select';
import axios from 'axios';
import { Layout, Form, Input, Slider, Row, Col, Image, Typography, Radio, Divider, Button } from 'antd';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai'; //unlike \ undislike
import { AiFillLike, AiFillDislike } from 'react-icons/ai'; //liked | undisliked
import Popup from 'reactjs-popup'; 
import 'reactjs-popup/dist/index.css';

import VideoPlayer from '../VideoPlayer';
import { API_URL } from '../../config.json';

import '../../App.css';

const { Content } = Layout;
const { Title, Text } = Typography;

function VideoPage() {
    var { videoId } = useParams();
    var [videoInfos, setVideoInfos] = useState(null);
    var [commentsInfos, setCommentsInfos] = useState(null);
    var [replyCommentsInfos, setReplyCommentsInfos] = useState(null);
	
	var [commentText, setCommentText] = useState(null);
	var [replyCommentText, setReplyCommentText] = useState(null);
	
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
		M.toast({message: "VideoInfos Updating... "});
		alert("update");
		
        axios.post(`${API_URL}/video/${videoId}`, { video: videoId }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then((res) => {
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

        }).catch((err) => alert(err))

        axios.post(`${API_URL}/getreplycomments/${videoId}`, {}, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then((replyComments) => {
            console.log(replyComments.data);
            setReplyCommentsInfos(replyComments.data);

        }).catch((err) => alert(err))

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
	
	function addComment(){
		axios.post(`${API_URL}/addcomment`, { videoId: videoId, userId: localStorage.getItem("id"), text: commentText }, {
			headers: {
				"Authorization": "Bearer " + localStorage.getItem("jwt")
			}
		})
		.then((result) => {
			alert(result.data.message);
			
			updateVideoInfos();
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
	
	function likeReplyComment(replyCommentId) {
        axios.put(`${API_URL}/likereplycomment`, { replyCommentId: replyCommentId, userId: localStorage.getItem("id") }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then((res) => {
                updateVideoInfos();

            }).catch((err) => alert(err))
    }

    function unlikeReplyComment(replyCommentId) {
        axios.put(`${API_URL}/unlikereplycomment`, { replyCommentId: replyCommentId, userId: localStorage.getItem("id") }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then((res) => {
                updateVideoInfos();

            }).catch((err) => alert(err))
    }

    function dislikeReplyComment(replyCommentId) {
        axios.put(`${API_URL}/dislikereplycomment`, { replyCommentId: replyCommentId, userId: localStorage.getItem("id") }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then((res) => {
                updateVideoInfos();

            }).catch((err) => alert(err))
    }

    function undislikeReplyComment(replyCommentId) {
        axios.put(`${API_URL}/undislikereplycomment`, { replyCommentId: replyCommentId, userId: localStorage.getItem("id") }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then((res) => {
                updateVideoInfos();

            }).catch((err) => alert(err))
    }
	
	function replyComment(commentId){
		axios.post(`${API_URL}/replyComment`, { commentId: commentId, videoId: videoId, userId: localStorage.getItem("id"), text: replyCommentText }, {
			headers: {
				Authorization: "Bearer " + localStorage.getItem("jwt")
			}
		})
		.then((result) => {
			if(result.data.message === "Başarılı. "){
				alert(result.data.message, "Başarılıymış :D. ")
			}else{
				alert(result.data.message, "Bilinmeyen değer geldi başqanım. ")
			}
			
			setReplyCommentText("");
			updateVideoInfos();
			
		})
		
		
	}
	
	function unSubcribeChannel(){
		alert("abonelikten çık. ");
		
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
                            <h6 style={{
                                float: "left"
                            }}>{ videoInfos.views.length } İzlenme</h6>

                            <br /><br />

                            <h5 className="videoDesc" style={{
                                float: "left"
                            }}>{videoInfos.desc}</h5>

                            <br /><br /><br /><br />
                            
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
                            
                            <br /><br /><br /><br /><br />
                            
                            <hr />
                            <br />

                            <div className="channelInfos" style={{
                                float: "left",
                                width: "100%",
                                backgroundColor: "#181a1b",
                                heigth: "250px"
                            }}>
                                <h4 style={{ float: "left" }}>{videoInfos.postedBy.name}</h4>

                                { videoInfos.postedBy.subscribes.includes(localStorage.getItem("id")) === true ? 
                                    <Button type="primary" danger style={{ float: "right", backgroundColor: "#8a8a8a", color: "white", width: "15%", height: "80%", alignItems: "center" }} onClick={() => {
		alert("abonelikten çık. ");
		
		axios.post(`${API_URL}/unsubscribe`, { userId: videoInfos.postedBy._id }, {
			headers: {
				"Authorization": "Bearer " + localStorage.getItem("jwt")
			}
		})
		.then((unsubscribed) => {
			alert("message: " + unsubscribed.data.message);
			updateVideoInfos();
			
		})
		
	}}> Abonelikten Çık </Button>
                                :
                                    <Button type="primary" danger style={{ float: "right", backgroundColor: "red", color: "white", width: "15%", height: "80%", alignItems: "center" }} onClick={() => {
		alert("abone ol. ");
		
		axios.post(`${API_URL}/subscribe`, { userId: videoInfos.postedBy._id }, {
			headers: {
				"Authorization": "Bearer " + localStorage.getItem("jwt")
			}
		})
		.then((subscribed) => {
			alert("message: " + subscribed.data.message);
			updateVideoInfos();
			
		})
		
	}} > Abone Ol </Button>
                                }

                            </div>
                        </div>


                        {localStorage.getItem("logined") === "false" ? <h4>Like ve Dislike atmak için lütfen giriş yapınız.</h4> : ""}

                         <div className="videoComments">
                            <Content className="videoCommentLayout" style={{ backgroundColor: "#181a1b" }}>
                                <Row gutter={[16, 16]} >
                                    <Col flex="5 1 400px" >
                                        <Form layout={"vertical"} style={{ backgroundColor: '#181a1b', height: 700, overflowY: 'scroll', padding: 50, textAlign: 'center' }} name="basic" initialValues={{ remember: true, }} className="videoCommentLayout" >
											
                                            <div style={{ display: "flex" }}><input placeholder="Bu videoyu yorumlayın. . " value={commentText} onChange={(e) => setCommentText(e.target.value)} /> <button className="btn red medium" onClick={() => addComment()} type="submit" >Yorumla</button></div>	
											
                                            {
                                                commentsInfos ?
                                                    commentsInfos.map((comment) => {
                                                        console.log("maped comment")
                                                        console.log(comment);

                                                        return (
                                                            <Form.Item>
                                                                <div style={{ display: "" }}>
                                                                    <div className="videoCommentUserInfos" style={{ display: "flex" }}>
                                                                        <img src={comment.postedBy.pic} style={{ width: "50px", height: "50px" }} />
                                                                        <span style={{ marginLeft: "5px" }}><h5>{comment.postedBy.name}</h5></span>
                                                                    </div>
                                                                    <span><p>{comment.text}</p></span>
                                                                    <div className="videoCommentEvents" style={{ display: "flex" }}>
                                                                        {comment.likes.includes(localStorage.getItem("id")) === true ? <div style={{display: "flex"}}><AiFillLike style={{ color: "white"  }} onClick={() => unlikeComment(comment._id)} /> <h6 style={{ color: "white" }}>{comment.likes.length} Like</h6></div> : <div style={{ display: "flex"  }}><AiOutlineLike style={{ color: "white"  }} onClick={() => likeComment(comment._id)} /> <h6 style={{ color: "white" }}>{comment.likes.length} Like</h6> </div>}

                                                                        {comment.dislikes.includes(localStorage.getItem("id")) === true ? <div  style={{ display: "flex"  }}><AiFillDislike style={{ color: "white"  }} onClick={() => undislikeComment(comment._id)} /><h6 style={{ color: "white" }}>{comment.dislikes.length} Dislike</h6></div> : <div  style={{ display: "flex"  }}><AiOutlineDislike style={{ color: "white"  }} onClick={() => dislikeComment(comment._id)} /> <h6 style={{ color: "white" }}>{comment.dislikes.length} Dislike</h6> </div>}

                                                                        <Popup  style={{ backgroundColor: "#1e2122" }}  trigger={<h6 style={{ marginLeft: "30px", fontSize: "15px", display: "flex", marginTop: "0%", cursor: "pointer" }}>{comment.replys.length} Cevap</h6>} position="bottom right"> 
                                                                            <div  style={{ backgroundColor: "#1e2122" }}>
																				<div style={{ display: "flex" }}><input placeholder="Bu yorumu cevaplayın. " value={replyCommentText} onChange={(e) => setReplyCommentText(e.target.value)} /> <button className="btn red medium" onClick={() => replyComment(comment._id)} type="submit" >Cevapla</button></div>
																				
                                                                                { replyCommentsInfos ? 
																						<div>
																							{replyCommentsInfos.map((reply) =>
																								<div>
																									{ reply.comment === comment._id 
																										?
																										<div>
																											<div className="videoCommentUserInfos" style={{ display: "flex" }}>
																												<img src={reply.postedBy.pic} style={{ width: "50px", height: "50px" }} />
																												<span style={{ marginLeft: "5px" }}><h5>{reply.postedBy.name}</h5></span>
																											</div>
																											<span><p>{ reply.text }</p></span>
																											<div>
																												{reply.likes.includes(localStorage.getItem("id")) === true ? <div><AiFillLike style={{color: "white"}} onClick={() => unlikeReplyComment(reply._id)} /> <h6>{reply.likes.length} Like</h6></div> : <div> <AiOutlineLike style={{color: "white"}} onClick={() => likeReplyComment(reply._id)} /> <h6>{reply.likes.length} Like</h6></div>}
																												
																												{reply.dislikes.includes(localStorage.getItem("id")) === true ? <div><AiFillDislike style={{color: "white"}} onClick={() => undislikeReplyComment(reply._id)} /> <h6>{reply.dislikes.length} Dislike</h6></div> : <div> <AiOutlineDislike style={{color: "white"}} onClick={() => dislikeReplyComment(reply._id)} /> <h6>{reply.dislikes.length} Dislike</h6> </div>}
																											</div>
																										</div>
																										:
																										""}
																								</div>
																							)}
																						</div> 
																					: <h4>Yükleniyor... </h4>}
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
