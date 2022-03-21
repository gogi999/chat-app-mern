import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Chatroom from './pages/Chatroom';
import makeToast from './Toaster';

const App = () => {
  const [socket, setSocket] = useState(null);

  const setupSocket = () => {
    const token = localStorage.getItem('token');

    if (token && !socket) {
      const newSocket = io('http://localhost:5000', {
        query: {
            token: localStorage.getItem('token')
        }
      });

      newSocket.on('disconnect', () => {
        setSocket(null);
        setTimeout(setupSocket, 3000);
        makeToast('error', 'Socket Disconnected!');
      });

      newSocket.on('connect', () => {
        makeToast('success', 'Socket Connected!')
      });

      setSocket(newSocket);
    }
  }

  useEffect(() => {
    setupSocket();
    // eslint-disable-next-line
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route 
          exact path="/login"
          render={() => <Login setupSocket={setupSocket} />} 
        />
        <Route exact path="/register" component={Register} />
        <Route 
          exact path="/dashboard" 
          render={() => <Dashboard socket={socket} />}
        />
        <Route 
          exact path="/chatroom/:id"
          render={() => <Chatroom socket={socket} />}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
