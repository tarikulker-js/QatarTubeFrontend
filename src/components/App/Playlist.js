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
    var { playlistId } = useParams();
    var [playlistInfos, setPlaylistInfos] = useState(null);
    var [commentsInfos, setCommentsInfos] = useState(null);
    var [replyCommentsInfos, setReplyCommentsInfos] = useState(null);
	
	var [commentText, setCommentText] = useState(null);
	var [replyCommentText, setReplyCommentText] = useState(null);
	
    var [currentTime, setCurrentTime] = useState();
    var [playbackSpeed, setPlaybackSpeed] = useState();

    function updatePlaylistInfos() {
		M.toast({html: "PlaylistInfos Updating... ", class: "yellow"});
		
		//alert("update");
        axios.post(`${API_URL}/playlist/view/${playlistId}`, { video: playlistId }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then((res) => {
			M.toast({html: res.data.message, classes: "green"});
			
        	setPlaylistInfos(res.data.playlist);
			
        })
		
    }

    useEffect(() => {
        updatePlaylistInfos();

    }, [])

    return (

        <center>
            <div className="PlaylistPage">
				{ playlistInfos 
					?
						<div>
							<h4>{ playlistInfos.name }</h4>
						
						</div>
					:
						<h4>Yükleniyor... </h4>
				}
            </div>
        </center>
    )
}

export default VideoPage;