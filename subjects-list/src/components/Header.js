import React, {useEffect, useState} from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css"

const Header =() =>{
    const [activeTab, setActiveTab] = useState("Home");
    const location = useLocation();

    useEffect(() => {
        if(location.pathname === "/"){
            setActiveTab("Home");
        } else if (location.pathname === "/add"){
            setActiveTab("AddSubject");
        } else if (location.pathname === "/about"){
            setActiveTab("About");
        }
    }, [location]);
    return(
        <div className="header">
            <p className="logo">Subject-List App</p>
            <div className="header-right">
            <Link to="/">
                <p 
                className={`${activeTab === "Home"? "active" : ""}`}
                onClick={() => setActiveTab("Home")}>
                    Home
                </p>
            </Link>
            <Link to="/add">
                <p 
                className={`${activeTab === "AddSubject"? "active" : ""}`}
                onClick={() => setActiveTab("AddSubject")}>
                    Add Topics
                </p>
            </Link>
            <Link to="/about">
                <p 
                className={`${activeTab === "About"? "active" : ""}`}
                onClick={() => setActiveTab("About")}>
                    List
                </p>
            </Link>
            </div>
        </div>
    )
}

export default Header;
