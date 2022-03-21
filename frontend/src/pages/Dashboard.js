import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = ({ socket }) => {
    const [chatrooms, setChatrooms] = useState([]);

    const getChatrooms = () => {
        axios.get('http://localhost:5000/chatroom', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then((response) => {
            setChatrooms(response.data);
        }).catch((err) => {
            setTimeout(getChatrooms, 3000);
        });
    }

    useEffect(() => {
        getChatrooms();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="card">
            <div className="cardHeader">
                Chatrooms
            </div>
            <div className="cardBody">
                <div className="inputGroup">
                    <label htmlFor="chatroomName">
                        Chatroom Name
                    </label>
                    <input 
                        type="text" 
                        name="chatroomName" 
                        id="chatroomName" 
                        placeholder="Enter your chatroom name"
                    />
                </div>
                <button>Create Chatroom</button>
                <div className="chatrooms">
                    {chatrooms.map((chatroom) => (
                        <div className="chatroom" key={chatroom._id}>
                            <div>{chatroom.name}</div>
                            <Link 
                                to={`/chatroom/${chatroom._id}`}
                            >
                                <div className="join">
                                    Join
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
