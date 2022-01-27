import React, {useState, useEffect} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import './AddEdit.css';
import fireDB from "../firebase";
import { toast } from 'react-toastify';
/*
The useHistory hook gives you access to the history instance that you may use to navigate.
 useParams returns an object of key/value pairs of URL parameters. Use it to access match. params of the current <Route> .
 */
//Here initialState is used to hold the initial contnet topic and content for the users to edit it.
//to access the same I have made use of the id, since Firebase is NoSQL.

/*State is a plain JavaScript object used by React to represent an information about the component's current situation. It's managed in the component (just like any variable declared in a function).*/
/*Hooks are functions that let you “hook into” React state and lifecycle features from function components.
It allows you to use state and other React features without writing a class.
Hooks were first introduced in React 16.8.*/
const initialState = {  
    topic: "",
    content: "",
};


const AddEdit = () => {
    const [state, setState] = useState(initialState);
    const [data, setData] = useState({});

    const {topic, content} = state;

    const history = useHistory();

const{id} = useParams();
/*fireDB.child("Subjects").on("value", (sanpshot) => Gets a DataSnapshot for the location at the specified relative path.*/
/*A DataSnapshot contains data from a Database location. 
Any time you read data from the Database, you receive the data as a DataSnapshot . 
A DataSnapshot is passed to the event callbacks you attach with on() or once() .*/
useEffect(() => {
    fireDB.child("Subjects").on("value", (sanpshot) => {
        if(sanpshot.val() !== null){
            setData({ ...sanpshot.val() });
        }else {
            setData({});
        }
    });

    return() => {
        setData({});
    };
}, [id]);

useEffect(() => {
    if(id){
        setState({...data[id]})
    }else{
        setState({...initialState})
    }

    return ()=>{
        setState({...initialState});
    };
}, [id, data]);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setState({ ...state, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!topic || !content){
            toast.error("Please provide value in each input field");
        }else{
            if(!id){
                fireDB.child("Subjects").push(state, (err) => {
                    if(err){
                        toast.error(err);
                    }else {
                        toast.success("Topic added successfully!!");
                    }
    
                });
            }else{
                fireDB.child(`Subjects/${id}`).set(state, (err) => {
                    if(err){
                        toast.error(err);
                    }else {
                        toast.success("Topic updated successfully!!");
                    }
    
                });
            }
          
            setTimeout(() => history.push("/about", 100));
        }
    };
    return(<center>
        <div style={{ marginTop: "50px"}}>
            <form 
                style={{
                margin: "auto",
                padding: "15px",
                maxWidth: "400px",
                alignContent: "center",
            }}
            onSubmit={handleSubmit}
            >
                <label htmlFor='topic'>Topic: </label>
                <input 
                type="text" 
                id= "topic" 
                name="topic" 
                placeHolder="Enter the Topic Title..." 
                value={topic || ""}
                onChange = {handleInputChange}
                /><br/><br/>
                 <label htmlFor='content'>Content: </label>
                <input style={{height:"100px", width:"200px"}} 
                type="text" 
                id= "content" 
                name="content" 
                placeHolder="Enter the Content..." 
                value={content || ""}
                onChange = {handleInputChange}
                /><br/><br/>

                <input type="submit" value={id ? "Update":"Save"}/>
            </form>
            </div></center>
    );
};

export default AddEdit;