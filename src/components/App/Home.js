import React, {} from 'react';
import '../../App.css';

function Home(){
    return(
        <div className="Home">
            <h4>Here is Home</h4>
            
            <h4>{localStorage.getItem("jwt")}</h4>
        </div>
    )
}

export default Home;