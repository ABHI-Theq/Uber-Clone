import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

// Custom hook to use the socket context
export const useSocket = () => {
    return useContext(SocketContext)
};

const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Create socket connection
    const socketCon = io('http://localhost:7000');
    setSocket(socketCon);

    // Handle connection and disconnection logs
    socketCon.on('connect', () => {
      console.log('connected to server');
    });

    socketCon.on('disconnect', () => {
      console.log('disconnected from server');
    });

    // Cleanup on component unmount
    return () => {
      socketCon.disconnect();
    };
  }, []);

  const sendMsg = (eventName, msg) => {
    if (socket) {
      socket.emit(eventName, msg);
    }
  };

  const receiveMsg = (eventName, callback) => {
    if (socket) {
      socket.on(eventName, callback);
    }
  };

  return (
    <SocketContext.Provider value={{ socket, sendMsg, receiveMsg }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
