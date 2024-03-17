import React from 'react';

function About() {
  return (
    <div className="container mt-4">
      <h6 className="text-uppercase text-center font-weight-medium mb-3" style={{ color: "rgb(70, 198, 206)" }}>
        About Us
      </h6>
      <div className="row">
        <div className="col-sm-6 ">
          <div className="card"><img src={require("./img/location-tracker.jpg")} alt="" /></div>
        </div>
        <div className="col-sm-6 ">
          At Location Tracker, we are dedicated to simplifying your tracking needs with cutting-edge technology and user-friendly interfaces. Whether you're keeping tabs on your fleet, monitoring your loved ones' safety, or simply want to stay informed about your own whereabouts, we have the solutions you need.
          <br /><br />
          Our mission is to provide reliable and efficient location tracking services that empower individuals and businesses alike. With our intuitive platform, you can effortlessly monitor real-time locations, set geofences for alerts, access historical data, and much more.
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-sm-6">
          Join the thousands of satisfied users who trust Location Tracker for their tracking needs. Sign up now to experience the convenience and peace of mind that comes with knowing you're always in control of your location data.
          <br /><br />
          Whether you're a concerned parent, a fleet manager, or a solo traveler, Location Tracker has the tools you need to navigate the world with confidence. Let us help you make tracking simpler, smarter, and more efficient.
        </div>
        <div className="col-sm-6">
          <div className="card"><img src={require("./img/location-tracker1.jpg")} alt="" /></div>
        </div>
      </div>
    </div>
  );
}

export default About;
