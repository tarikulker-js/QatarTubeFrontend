import React, { useState } from 'react';
import { Link } from "react-router-dom";
import '../../App.css';

function Navbar(){
    return(
        <div className={localStorage.getItem("dark") === true ? "dark" : "light"} >
            {localStorage.getItem("logined") == "true" ? 
                <nav className="navbar">
                    <tr style={{float: "right"}}>
                        <td><Link to="/"><img src="https://res.cloudinary.com/qatar-tube/image/upload/v1625427505/faq91idqohkkid6aiayz.png" style={{
                            marginLeft: "",
                            width: "11%",
                            height: "10vh",
                            backgroundColor: "white"
                        }} /> </Link></td>
                        <td><Link to="/"><h4 className="navbar-item navbar-title" style={{
                            marginLeft: "-615%"
                        }}>QatarTube</h4></Link></td>
                        <td><Link to="/trends"><h4 className="navbar-item" style={{
                            marginLeft: "-75%"
                        }}>Trendler</h4></Link></td>
                        <td><Link to="/subvideos"><h4 className="navbar-item" style={{
                            marginLeft: "-50%"
                        }}>Abonelikler</h4></Link></td>
                        <td><Link to="/logout"><h4 className="navbar-item red" style={{
                            marginLeft: "-75%"
                        }}>Çıkış</h4></Link></td>

                    </tr>
                </nav>
            :
                <nav className="navbar">
                    <tr style={{float: "right"}}>
                        <td><Link to="/login"><h4 className="navbar-item" style={{
                            marginLeft: "-50%"
                        }}>Giriş Yap</h4></Link></td>
                        <td><Link to="/register"><h4 className="navbar-item" style={{
                            marginLeft: "-25%"
                       }}>Kayıt Ol</h4></Link></td>
                    </tr>
                </nav>            
            }
        </div>
    )
}

export default Navbar