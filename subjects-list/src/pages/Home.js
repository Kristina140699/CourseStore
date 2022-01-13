import React from 'react';
import { Link } from 'react-router-dom';
import "./About.css";

const Home = () => {
    return(
        <div>
            <h2>Home</h2>
            <table className='styled-table'>
                <thead>
                <tr>
                <th style={{textAlign: "center"}}>Subjects</th>
                <th style={{textAlign: "justified"}}>Action</th>
                </tr></thead>
                <tbody>
                <tr>
                <th>Mathematics </th>
                <td> <Link to={`/add`}><button>Add Topic</button></Link> &nbsp;&nbsp;&nbsp;
                 <Link to={`/about`}><button>View Topics</button></Link></td>
                </tr>
                <tr>
                <th>English </th>
                <td> <Link to={`/add`}><button>Add Topic</button></Link> &nbsp;&nbsp;&nbsp;
                <Link to={`/about`}><button>View Topics</button></Link></td>
                </tr>
                <tr>
                <th>Computer Science </th>
                <td> <Link to={`/add`}><button>Add Topic</button></Link> &nbsp;&nbsp;&nbsp;
                 <Link to={`/about`}><button>View Topics</button></Link></td>
                </tr>
                
                </tbody>
                
                </table>
            </div>
    );
};

export default Home;