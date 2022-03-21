import React, { createRef } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import makeToast from '../Toaster';

const Login = ({ history, setupSocket }) => {
    const emailRef = createRef();
    const passwordRef = createRef();

    const loginUser = () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        axios.post('/user/login', {
            email,
            password
        }).then((response) => {
            makeToast('success', response.data.message);
            localStorage.setItem('token', response.data.token);
            history.push('/dashboard');
            setupSocket();
        }).catch((err) => {
            if (
                err &&
                err.response &&
                err.response.data &&
                err.response.data.message
            )
                makeToast('error', err.response.data.message);
        });
    }

    return (
        <div className="card">
            <div className="cardHeader">
                Login
            </div>
            <div className="cardBody">
                <div className="inputGroup">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        placeholder="abc@example.com"
                        ref={emailRef}
                    />
                </div>
                <div className="inputGroup">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        placeholder="Enter your password"
                        ref={passwordRef}
                    />
                </div>
                <button onClick={loginUser}>
                    Login
                </button>
            </div>
        </div>
    );
}

export default withRouter(Login);
