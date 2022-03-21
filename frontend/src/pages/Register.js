import React, { createRef } from 'react';
import axios from 'axios';
import makeToast from '../Toaster';

const Register = ({ history }) => {
    const nameRef = createRef();
    const emailRef = createRef();
    const passwordRef = createRef();

    const registerUser = () => {
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        axios.post('/user/register', {
            name,
            email,
            password
        }).then((response) => {
            makeToast('success', response.data.message);
            history.push('/login');
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
                Registration
            </div>
            <div className="cardBody">
                <div className="inputGroup">
                    <label htmlFor="name">Name</label>
                    <input 
                        type="text" 
                        name="name" 
                        id="name" 
                        placeholder="Enter your name"
                        ref={nameRef}
                    />
                </div>
                <div className="inputGroup">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        placeholder="Enter your email"
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
                <button onClick={registerUser}>
                    Register
                </button>
            </div>
        </div>
    );
}

export default Register;
