import React, {useState, useEffect} from "react";
import fireDB from "../firebase";
import { useParams, Link} from "react-router-dom";
import "./View.css";

const View = () => {
    const [user, setUser] = useState({});
    
    const {id} = useParams();

 useEffect(() => {
    fireDB
    .child(`Subjects/${id}`)
    .get()
    .then((snapshot) => {
        if(snapshot.exists()) {
            setUser({ ...snapshot.val() });
            }else{
                setUser({});
            }
    });
 }, [id]);
 
 console.log("user", user);
    return(
        <div style={{marginTop: "150px"}}>
            <div className="card">
                <div className="card-header">
                    <p>Topic Details</p>
                </div>
                <div className="container">
                <strong>ID: </strong>
                <span>{id}</span>
                <br/><br/>
                <strong>Topic: </strong>
                <span>{user.topic}</span>
                <br/><br/>
                <strong>Content: </strong>
                <span>{user.content}</span>
                <br/><br/>
                <Link to="/">
                    <button className="btn btn-edit">Go Back</button>
                    </Link>
                </div>
            </div>
            </div>
    );
};

export default View;

