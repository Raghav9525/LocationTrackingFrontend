import React, { useEffect, useState } from 'react';

function LocationDelete() {
    const server_url = process.env.REACT_APP_SERVER;
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${server_url}/location_delete`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                const data = await response.json();
                setMessage(data.message);

            } catch (error) {
                console.error("Error occurred during deletion:", error);
                setMessage("Failed to delete location history");
            }
        };

        fetchData();
    }, [server_url]); // Added server_url to the dependency array

    return (
        <div className='mt-4 ms-2'>                
            <p style={{ fontSize: '1.2em' }}>{message}</p>
        </div>
    );
}

export default LocationDelete;
