import React, { useState } from 'react';
import { API_URL } from '../../config.json';
import M from 'materialize-css';
import axios from 'axios';
import { Content, RegisterPanel } from '../../lib/quntu-ui-v1/quntu-ui-v1';

function CreatePlaylist(){
	var [playlistName, setPlaylistname] = useState("Girilmedi :D");
	
	const create = () => {
		
	}
	
	return(
		<div>
			<Content>
				<br />
				<RegisterPanel
					imageUrl="https://image.shutterstock.com/image-vector/vector-illustration-music-songs-playlist-260nw-1535959064.jpg"
					imageHeaderText="Hemen Ücretsiz Oynatma Listesi Oluştur!"
					imageContentText="Oynatma Listesinin adını gir ve yeni bir Oynatma Listesi oluştur. "
				>
					
					<center><h4>Yeni Oynatma Listesi</h4></center>
					
					<input 
						placeholder="Oynatma Listesinin adı (Zorunlu değildir.)"
						onChange={(e) => setPlaylistname(e.target.value)}
					/>
					
					<button onClick={() => {
							axios.post(`${API_URL}/playlist/create`, { playlistName: playlistName }, {
								headers: {
									"Authorization": "Bearer " + localStorage.getItem("jwt")
								}
							}).then((res) => {
								console.log(res.data);
								
								alert(res.data.message);
								
								M.toast({ html: res.data.message, classes: "green" });
								
								window.location="/playlist/view/" + res.data.playlist;
								alert("başarılı. ");
								
							}).catch((err) => alert(err))
							
						}} >Oluştur</button>
						
				</RegisterPanel>
				<br />
			</Content>
		</div>
	)
}

export default CreatePlaylist;