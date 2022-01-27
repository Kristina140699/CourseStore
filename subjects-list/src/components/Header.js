import React, {useEffect, useState} from "react";
/*In simple words, useState allows our functional components 
which used to be stateless become stateful. And useEffect allows 
our functional components leverage the component lifecycle hooks which were, 
in the past, only supported for class components.*/ 
import { Link, useLocation } from "react-router-dom";
/*useLocation: This hook returns the location object used by the react-router. 
This object represents the current URL and is immutable. Whenever the URL changes, 
the useLocation() hook returns a newly updated location object.

<Link> will render a fully accessible anchor tag with the proper href. 

The Link component is responsible for the transition from state to state (page to page),
while the Route component is responsible to act as a switch to display certain components based on route state.*/ 
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
