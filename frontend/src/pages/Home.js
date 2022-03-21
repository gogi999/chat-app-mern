import React, { useEffect } from 'react';

const Home = ({ history }) => {
    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            history.push('/login');
        } else {
            history.push('/dashboard');
        }
        // eslint-disable-next-line
    }, [0]);
    
    return (
        <div></div>
    );
}

export default Home;
