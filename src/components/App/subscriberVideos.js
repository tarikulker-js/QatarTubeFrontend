import React, { useState, useEffect } from 'react';
import { Content, RegisterPanel } from '../../lib/quntu-ui-v1/quntu-ui-v1';
import { API_URL, UPLOAD_IMG_URL, logo } from '../../config.json';
import M from 'materialize-css';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import '../../App.css';

import NotFoundVideos from '../404notFoundVideos';

function SubscriberVideos() {
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
        axios.post(`${API_URL}/get-sub-videos`, {}, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then((videos) => {
                console.log("videos", videos)
                setVideos(videos.data.subVideos);
                setFined(videos.data.fined);

                //alert(videos.data.message);
                //alert(videos.data.fined)
            })

    }, [url])

    return (
        <div className="SubscriberVideos">
            { videosFined === "true" 
                ?
	                videos.length !== 0
			 			? 
							<Content>
								<div className='gallery' style={{
									display: "flex",
									justifyContent: "space-around"
								}}>

									{videos.map((video) => {
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
					<Content><NotFoundVideos /></Content>
                :
				<Content>
					<div>
						<h4>Yükleniyor...</h4>
					</div>
				</Content>
            }

        </div>
    )
}

export default SubscriberVideos;