import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import M from 'materialize-css';
import Select from 'react-select';
import axios from 'axios';
import { Layout, Form, Input, Slider, Row, Col, Image, Typography, Radio, Divider, Button } from 'antd';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai'; //unlike \ undislike
import { AiFillLike, AiFillDislike } from 'react-icons/ai'; //liked | undisliked
import { FcLike, FcDislike } from 'react-icons/fc'; //add fav / takeout fav
import { MdRemoveCircle } from 'react-icons/md';
import Popup from 'reactjs-popup'; 
import 'reactjs-popup/dist/index.css';
import { QuntuContent } from '../../lib/quntu-ui-v1/quntu-ui-v1';

import VideoPlayer from '../VideoPlayer';
import { API_URL } from '../../config.json';

import '../../App.css';

const { Content } = Layout;
const { Title, Text } = Typography;

function PlaylistPage() {
    var { playlistId } = useParams();
    var [playlistInfos, setPlaylistInfos] = useState(null);
    var [commentsInfos, setCommentsInfos] = useState(null);
    var [replyCommentsInfos, setReplyCommentsInfos] = useState(null);
	
	var [commentText, setCommentText] = useState(null);
	var [replyCommentText, setReplyCommentText] = useState(null);
	
    var [currentTime, setCurrentTime] = useState();
    var [playbackSpeed, setPlaybackSpeed] = useState();

	var [addedVideoId, setAddedVideoId] = useState(null);
	var [addedViewUserEmail, setAddedViewUserEmail] = useState(null);
	var [takeoutedViewUserEmail, setTakeoutedViewUserEmail] = useState(null);
	var [addedAdminUserEmail, setAddedAdminUserEmail] = useState(null);
	var [takeoutedAdminUserEmail, setTakeoutedAdminUserEmail] = useState(null);
	

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
	
	function addVideo(){
		//alert("Playlist ID: " + playlistId + " Video ID: " + addedVideoId);

		axios.post(`${API_URL}/playlist/add-video`, { playlistId: playlistId, videoId: addedVideoId }, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then((result) => {
			//alert(result.data.message);
			M.toast({ html: result.data.message });
			
			updatePlaylistInfos();
		})
	}
	
	function takeoutVideo(videoId){
		//alert("Playlist ID: " + playlistId + " Video ID: " + videoId);

		axios.post(`${API_URL}/playlist/takeout-video`, { playlistId: playlistId, videoId: videoId }, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then((result) => {
			//alert(result.data.message);
			M.toast({ html: result.data.message });
			
			updatePlaylistInfos();
		})
	}
	
	function addViewUser(){
		//alert("Playlist ID: " + playlistId + " Video ID: " + videoId);

		axios.post(`${API_URL}/playlist/add-view`, { playlistId: playlistId, userEmail: addedViewUserEmail }, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then((result) => {
			alert(result.data.message);
			M.toast({ html: result.data.message });
			
			updatePlaylistInfos();
		})
	}
	
	function takeoutViewUser(){
		axios.post(`${API_URL}/playlist/takeout-view`, { playlistId: playlistId, userEmail: takeoutedViewUserEmail }, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then((result) => {
			alert(result.data.message);
			M.toast({ html: result.data.message });
			
			updatePlaylistInfos();
		})
	}
	
	function addAdminUser(){
		axios.post(`${API_URL}/playlist/add-admin`, { playlistId: playlistId, userEmail: addedAdminUserEmail }, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then((result) => {
			alert(result.data.message);
			M.toast({ html: result.data.message });
			
			updatePlaylistInfos();
		})
	}
	
	function takeoutAdminUser(){
		axios.post(`${API_URL}/playlist/takeout-admin`, { playlistId: playlistId, userEmail: takeoutedAdminUserEmail }, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then((result) => {
			alert(result.data.message);
			M.toast({ html: result.data.message });
			
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
											<div style={{ display: "flex" }}>
												<h4 style={{ float: "left", marginLeft: "15px", cursor: "default" }}>{ playlistInfos.name }</h4>
											</div>
											<br />
											<div style={{ display: "flex" }}>
												<h5 style={{ float: "left", marginLeft: "30px", marginTop: "12.5", cursor: "default" }}>Oynatma Lisesinin Sahibi: { playlistInfos.author.name }</h5>
											</div>
											<br />
											<div style={{display: "flex", marginLeft: "45px"}}>
												{
													playlistInfos.likes.includes(localStorage.getItem("id")) === false
														?
													<FcLike style={{ width: "35px", height: "35px", float: "left", marginRight: "15px", cursor: "pointer" }} onClick={addFavPlaylist} />
														:
													<FcDislike style={{ width: "35px", height: "35px", float: "left", marginRight: "15px", cursor: "pointer" }} onClick={takeoutFavPlaylist} />
												}

												{
													playlistInfos.admins.includes(localStorage.getItem("id")) === true
														?
													<Popup
														trigger={<button className="" style={{marginRight: "30px", marginTop: "11.5px", cursor: "pointer"}}> Video Ekleyin </button>}
														modal
														nested
													>
														<div style={{ backgroundColor: "#181a1b" }}>
															<input placeholder="Video ID'yi giriniz" style={{ color: "white", width: "80%" }} onChange={(e) => setAddedVideoId(e.target.value)}  />
															<button style={{ color: "white", width: "20%" }}  onClick={addVideo}>Ekle</button>
														</div>
													</Popup>
														:
													<></>
												}

												{
													playlistInfos.admins.includes(localStorage.getItem("id")) === true
														?
													<Popup
														trigger={<button className="" style={{marginRight: "30px", marginTop: "11.5px", cursor: "pointer"}}> Okuma Yetkisi </button>}
														modal
														nested
														style={{ backgroundColor: "red" }}
													>
														<>
															<div style={{ backgroundColor: "#181a1b" }}>
															<center><h5>Okuma yetkisini vermek için: </h5></center>
																<input placeholder="Kullanıcı Email'i giriniz" style={{ color: "white", width: "80%" }} onChange={(e) => setAddedViewUserEmail(e.target.value)}  />
																<button style={{ color: "white", width: "20%" }}  onClick={addViewUser}>Ekle</button>
															</div>
															<div style={{ backgroundColor: "#181a1b" }}>
																<center><h5>Okuma yetkisini kaldırmak için: </h5></center>
																<input placeholder="Kullanıcı Email'i giriniz" style={{ color: "white", width: "80%" }} onChange={(e) => setTakeoutedViewUserEmail(e.target.value)}  />
																<button style={{ color: "white", width: "20%" }}  onClick={takeoutViewUser}>Kaldır</button>
															</div>
															
														</>
													</Popup>
														:
													<></>
												}
												
												{
													playlistInfos.admins.includes(localStorage.getItem("id")) === true
														?
													<Popup
														trigger={<button className="" style={{marginRight: "30px", marginTop: "11.5px", cursor: "pointer"}}> Yönetici Yetkisi </button>}
														modal
														nested
														style={{ backgroundColor: "red" }}
													>
														<>
															<div style={{ backgroundColor: "#181a1b" }}>
															<center><h5>Yönetici yetkisini vermek için: </h5></center>
																<input placeholder="Kullanıcı Email'i giriniz" style={{ color: "white", width: "80%" }} onChange={(e) => setAddedAdminUserEmail(e.target.value)}  />
																<button style={{ color: "white", width: "20%" }}  onClick={addAdminUser}>Ekle</button>
															</div>
															<div style={{ backgroundColor: "#181a1b" }}>
																<center><h5>Yönetici yetkisini kaldırmak için: </h5></center>
																<input placeholder="Kullanıcı Email'i giriniz" style={{ color: "white", width: "80%" }} onChange={(e) => setTakeoutedAdminUserEmail(e.target.value)}  />
																<button style={{ color: "white", width: "20%" }}  onClick={takeoutAdminUser}>Kaldır</button>
															</div>
															
														</>
													</Popup>
														:
													<></>
												}
											</div>
											
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
																				
																				{playlistInfos.admins.includes(localStorage.getItem("id")) === true ? <MdRemoveCircle style={{ width: "40px", height: "40px", float: "right", marginLeft: "25px", marginRight: "10px", color: "#d30808", cursor: "pointer" }} onClick={() => takeoutVideo(video._id)}/> : <></>}
																				
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

export default PlaylistPage;