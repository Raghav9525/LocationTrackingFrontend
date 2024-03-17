import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const SERVER_URL = 'http://localhost:5000';

function SocketIO() {
    const [message, setMessage] = useState('');
    // Declare socket variable outside useEffect to access it in sendMessage function
    const socket = io(SERVER_URL);

    useEffect(() => {
        // Listen to the connection event just once during component mount
        socket.on('connect', () => {
            console.log('Connected to server with socket ID:', socket.id);
        });

        // Listen for incoming messages
        socket.on('new-message', (msg) => {
            console.log('New message received:', msg);
            // Implement the logic to handle the incoming message (e.g., display it in the UI)
        });

        // Cleanup on component unmount
        return () => socket.disconnect();
    }, [socket]);

    function sendMessage(){
        socket.emit('user-message', message);
        // Optionally clear the message input after sending
        setMessage('');
    }

    return (
        <div>
            <input
                type="text"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send Message</button>
        </div>
    );
}

export default SocketIO;
