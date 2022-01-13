import React, {useState, useEffect} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import './AddEdit.css';
import fireDB from "../firebase";
import { toast } from 'react-toastify';

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