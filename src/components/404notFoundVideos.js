import React, { useState } from 'react';
import '../App.css';

function NotFoundVideos() {
	return(
		<>
			<meta charset="utf-8" />
			<meta http-equiv="X-UA-Compatible" content="IE=edge" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />

			<title>404 HTML Tempalte by Colorlib</title>

			<center>
				<div id="notfound">
					<div class="notfound">
						<div class="notfound-404">
							<h1>Oops! <br /> Henüz video yok. </h1>
						</div>
						<a href="/">Ana Sayfaya Gidin. </a>
					</div>
				</div>
			</center>
		</>
	)
}

export default NotFoundVideos;