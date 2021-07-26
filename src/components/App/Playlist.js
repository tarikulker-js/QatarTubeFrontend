import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import M from 'materialize-css';
import Select from 'react-select';
import axios from 'axios';
import { Layout, Form, Input, Slider, Row, Col, Image, Typography, Radio, Divider, Button } from 'antd';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai'; //unlike \ undislike
import { AiFillLike, AiFillDislike } from 'react-icons/ai'; //liked | undisliked
import { FcLike, FcDislike } from 'react-icons/fc'; //add fav / takeout fav
import Popup from 'reactjs-popup'; 
import 'reactjs-popup/dist/index.css';
import { QuntuContent } from '../../lib/quntu-ui-v1/quntu-ui-v1';

import VideoPlayer from '../VideoPlayer';
import { API_URL } from '../../config.json';

import '../../App.css';

const { Content } = Layout;
const { Title, Text } = Typography;

function VideoPage() {
    var { playlistId } = useParams();
    var [playlistInfos, setPlaylistInfos] = useState(null);
    var [commentsInfos, setCommentsInfos] = useState(null);
    var [replyCommentsInfos, setReplyCommentsInfos] = useState(null);
	
	var [commentText, setCommentText] = useState(null);
	var [replyCommentText, setReplyCommentText] = useState(null);
	
    var [currentTime, setCurrentTime] = useState();
    var [playbackSpeed, setPlaybackSpeed] = useState();

    function updatePlaylistInfos() {
		//alert("update");
        axios.post(`${API_URL}/playlist/view/${playlistId}`, { video: playlistId }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then((res) => {
        	setPlaylistInfos(res.data.playlist);
			
        })
		
    }

    useEffect(() => {
        updatePlaylistInfos();

    }, [])

	function likeVideo(videoId) {
        //alert("clicked. ");

        axios.put(`${API_URL}/like`, { videoId: videoId, userId: localStorage.getItem("id") }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then((res) => {
            updatePlaylistInfos();

            console.log(res);
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
            updatePlaylistInfos();

            console.log(res);

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
            updatePlaylistInfos();

            console.log(res);
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
            updatePlaylistInfos();

            //alert("undisliked. ");

            console.log(res);

            if (!res.data.message) {

            } else {
                //alert("Video zaten beğenildi. ");

            }
        })

    }
	
	function addFavPlaylist() {
		//alert("likeing... ");
		
		axios.put(`${API_URL}/playlist/like/${playlistId}`, {  }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
		.then((likedPlaylist) => {
			updatePlaylistInfos();
			
		})
		
	}
	
	function takeoutFavPlaylist() {
		axios.put(`${API_URL}/playlist/unlike/${playlistId}`, {  }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
		.then((likedPlaylist) => {
			updatePlaylistInfos();
			
		})
	}
	
    return (

        <center>
            <div className="PlaylistPage">
				<QuntuContent>
					{ playlistInfos 
						?
							<>
								<Content className="" style={{ backgroundColor: "#181a1b", float: "left" }}>
										<div style={{ float: "left" }} >
											<h4 style={{ float: "left", marginLeft: "15px", cursor: "default" }}>{ playlistInfos.name }</h4><br />
											<h5 style={{ float: "left", marginLeft: "30px", cursor: "default" }}>Oynatma Lisesinin Sahibi: { playlistInfos.author.name }</h5><br />

											{
												playlistInfos.likes.includes(localStorage.getItem("id")) === false
													?
												<FcLike style={{ width: "35px", height: "35px", float: "left", marginLeft: "55px", cursor: "pointer" }} onClick={addFavPlaylist} />
													:
												<FcDislike style={{ width: "35px", height: "35px", float: "left", marginLeft: "55px", cursor: "pointer" }} onClick={takeoutFavPlaylist} />
											}
											
											{
												playlistInfos.admins.includes(localStorage.getItem("id")) === true
													?
												<Popup
													trigger={<button className="button"> Open </button>}
													modal
													nested
												>
													{close => (
													  <div className="modal">
														<button className="close" onClick={close}>
														  &times;
														</button>
														<div className="header"> Modal Title </div>
														<div className="content">
														  {' '}
														  Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a nostrum.
														  Dolorem, repellat quidem ut, minima sint vel eveniet quibusdam voluptates
														  delectus doloremque, explicabo tempore dicta adipisci fugit amet dignissimos?
														  <br />
														  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur sit
														  commodi beatae optio voluptatum sed eius cumque, delectus saepe repudiandae
														  explicabo nemo nam libero ad, doloribus, voluptas rem alias. Vitae?
														</div>
														<div className="actions">
														  <Popup
															trigger={<button className="button"> Trigger </button>}
															position="top center"
															nested
														  >
															<span>
															  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
															  magni omnis delectus nemo, maxime molestiae dolorem numquam
															  mollitia, voluptate ea, accusamus excepturi deleniti ratione
															  sapiente! Laudantium, aperiam doloribus. Odit, aut.
															</span>
														  </Popup>
														  <button
															className="button"
															onClick={() => {
															  console.log('modal closed ');
															  close();
															}}
														  >
															close modal
														  </button>
														</div>
													  </div>
													)}
												</Popup>
													:
												<></>
											}
											
										</div>
								</Content>
								
								<Content className="videoCommentLayout" style={{ backgroundColor: "#181a1b" }}>
										<Row gutter={[16, 16]} >
											<Col flex="5 1 400px" >
												<Form layout={"vertical"} style={{ backgroundColor: '#181a1b', height: 700, overflowY: 'scroll', padding: 50, textAlign: 'center' }} name="basic" initialValues={{ remember: true, }} className="videoCommentLayout" >
													<Content>
														<Form.Item>
															{ playlistInfos.videos.length == 0 
																?
																	<h4>Oynatma listesinde video yok. </h4>
																:
																	 playlistInfos.videos.map((video) => {
																		return(
																			<div style={{ display: "", width: "100%", height: "125px",minHeight: "100px", maxHeight: "150px", backgroundColor: "#8a8a8a", cursor: "default" }}>
																				<div className="playlist-video" style={{ display: "flex",  float: "left", height: "125px", minHeight: "100px", maxHeight: "150px", cursor: "pointer" }}  onClick={() => window.location="/watch/"+video._id}>	
																					<img src={ video.videoImageURL } style={{ height: "100%", float: "left" }} />
																					<h4 style={{ height: "45%", marginLeft: "15px", float: "left" }}>{ video.title }</h4>
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
																									onClick={() => {dislikeVideo(video._id)}} 
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
																									onClick={() => { alert("ayn kardeşim aras kargo aç kapıyı amq") }} 
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
														</Form.Item>
													</Content>
												</Form>
											</Col>
										</Row>
								</Content>
							</>
						:
							<h4>Yükleniyor... </h4>
					}
				</QuntuContent>
            </div>
        </center>
    )
}

export default VideoPage;