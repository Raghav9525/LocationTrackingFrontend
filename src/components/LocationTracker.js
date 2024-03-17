import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Ensure you import Leaflet's CSS
import Navbar from './Navbar';
import { jwtDecode } from "jwt-decode";
import About from './About';

const LocationTracker = () => {
    const server_url = process.env.REACT_APP_SERVER

    const [mobile, setMobile] = useState('')
    const [address, setAddress] = useState('');
    const [position, setPosition] = useState({ latitude: null, longitude: null });
    const positionRef = useRef(position);

    // get mobile number from localStorage token.
    const getMobileFromToken = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            // token is created uing mobile no.so get mobile from token
            const decodedToken = jwtDecode(token);
            setMobile(decodedToken);
            return decodedToken
        } else {
            setMobile(null);
            return null
        }
    };


    // Ref to store the marker for managing popup programmatically
    const markerRef = React.useRef(null);

    const storeLocation = async (current_location) => {
        try {
            let cust_mobile = await getMobileFromToken()
            const location_details = {
                mobile: cust_mobile,
                current_location: current_location
            };
            console.log(location_details)

            const response = await fetch(`${server_url}/location`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(location_details)
            });

            if (response.ok) {
                console.log("Location stored successfully");
            } else {
                console.log("Location not stored");
            }
        } catch (error) {
            console.error("Error occurred during storing location:", error);
        }
    };


    useEffect(() => {
        const watchId = navigator.geolocation.watchPosition(
            async (pos) => {
                const { latitude, longitude } = pos.coords;
                const prevLatitude = positionRef.current.latitude;
                const prevLongitude = positionRef.current.longitude;

                if (latitude !== prevLatitude || longitude !== prevLongitude) {
                    positionRef.current = { latitude, longitude };
                    setPosition({ latitude, longitude });
                    const current_location = await findLocation(latitude, longitude);
                    storeLocation(current_location);
                }
            },
            (error) => {
                console.error('Error watching position:', error);
            },
            {
                enableHighAccuracy: true,
                maximumAge: 0,
                timeout: 20000,
            }
        );
        return () => navigator.geolocation.clearWatch(watchId);
    }, []); // storeLocation is stable and doesn't need to be a dependency


    const findLocation = async (latitude, longitude) => {
        let apiEndpoint = "https://api.opencagedata.com/geocode/v1/json";
        let apiKey = process.env.REACT_APP_API;

        let query = `${latitude}+${longitude}`;
        let apiUrl = `${apiEndpoint}?key=${apiKey}&q=${query}&pretty=1`;

        try {
            const response = await axios.get(apiUrl);
            setAddress(response.data.results[0].formatted);
            return response.data.results[0].formatted;
        } catch (error) {
            console.error('Error fetching location details:', error);
            return '';
        }
    };


    // Create a custom icon
    const customIcon = L.icon({
        iconUrl: require("./img/locationPoiner.webp"),
        iconSize: [60, 75], // Size of the icon
    });


    return (
        <div>
            {position.latitude && position.longitude && (
                <MapContainer center={[position.latitude, position.longitude]} zoom={13} style={{ height: '400px', width: '100%' }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker
                        position={[position.latitude, position.longitude]}
                        icon={customIcon}
                        ref={markerRef}
                    >
                        <Popup>{address}</Popup>
                    </Marker>
                </MapContainer>
            )}
            <div className='ms-2 mt-2'>
                <h2>My Location</h2>
                <p style={{ fontSize: '1.2em' }}>{address}</p>
                {position.latitude && position.longitude && (
                    <div className="">
                        <p style={{ fontSize: '1.3em' }}>Latitude = {position.latitude}</p>
                        <p style={{ fontSize: '1.3em' }}>Longitude= {position.longitude}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LocationTracker;
