
import React, { useEffect, useState } from 'react'
import { jwtDecode } from "jwt-decode";
import Navbar from './Navbar';

function LocationHistory() {
  const [locationHistory, setLocationHistory] = useState()
  const [displayTable, setDisplayTable] = useState(false)
  const server_url = process.env.REACT_APP_SERVER

  // get mobile number from localStorage token.
  const getMobileFromToken = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      // token is created uing mobile no.so get mobile from token
      const decodedToken = jwtDecode(token);
      return decodedToken
    } else {
      return null
    }
  };

  useEffect(() => {
    const fetchLocationHistory = async () => {
      try {
        let mobile = await getMobileFromToken();

        const response = await fetch(`${server_url}/location_history`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ mobile })
        });

        if (response.ok) {
          const data = await response.json();
          setLocationHistory(data);
          console.log("Location history fetched successfully:", data);
          setDisplayTable(true)
        } else {
          console.log("Failed to fetch location history");
        }
      } catch (error) {
        console.error("Error occurred during fetching location history:", error);
      }
    };

    fetchLocationHistory();
  }, []);

  const tableStyle = {
    borderCollapse: 'collapse',
    width: '100%',
    borderRadius: '8px', // Rounded border
    overflow: 'hidden', // Ensures the border radius applies correctly
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' // 3D shadow effect
  };
  return (

    <div className='vh-100' style={{ backgroundColor: "rgb(239, 244, 249)",overflow: "auto"  }}>
      <h2 className='pt-2 ms-2'>My Location History</h2>
      <div className='col-sm-3'></div>
      
      <div style={{ }}>
        {displayTable ? (
          <div className='col-sm-6 mt-4   mx-auto text-center'>
            <table className='table table-striped ms-2 me-2' style={tableStyle}>
              <thead id="table-head">

                <tr>
                  <th>Time</th>
                  <th>Location</th>

                </tr>
              </thead>
              <tbody>
                {locationHistory.map((item) => (
                  <tr key={item.id}>
                    <td>{item.time}</td>
                    <td>{item.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No Records Found</p>
        )}
      </div>
      <div className='col-sm-3'></div>

    </div>
  )
}

export default LocationHistory