import React, {useState, useEffect} from 'react';
import fireDB from "../firebase";
import { Link } from 'react-router-dom';
import "./About.css";
import { toast } from 'react-toastify';

const About = () => {
    const [data, setData] = useState({});

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
    }, []);

    const onDelete = (id) =>{
        if(window.confirm("Are you sure of deleting this topic?")){
            fireDB.child(`Subjects/${id}`).remove((err)=>{
                if(err){
                    toast.error(err)
                }else{
                    toast.success("Topic deleted succesfully!");
                }
            })
        }
    }
    return(
        <div style={{marginTop: "50px"}}>
            <center>
            <table className='styled-table'>
                <thead>
                <tr>
                <th style={{textAlign: "center"}}>S. No.</th>
                <th style={{textAlign: "center"}}>Topic Title</th>
                <th style={{textAlign: "justified"}}>Topic Content</th>
                <th style={{textAlign: "justified"}}>Action</th>
                </tr>
                </thead>

                <tbody>
                    {Object.keys(data).map((id, index) => {
                        return(
                            <tr key={id}>
                                <td scope="row">{index + 1}</td>
                                <td>{data[id].topic}</td>
                                <td>{data[id].content}</td>
                            <td>
                                <Link to={`/update/${id}`}>
                                <button className='btn btn-edit'>Edit</button>
                                </Link>
                                <button 
                                className='btn btn-delete' 
                                onClick={() => onDelete(id)}>Delete</button>
                                <Link to={`/view/${id}`}>
                                <button className='btn btn-view'>View</button>
                                </Link>
                            </td>
                            
                            </tr>
                        );
                    })}
                </tbody>
            </table></center>
            </div>
    );
};

export default About;