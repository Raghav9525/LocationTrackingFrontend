import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const closeMenu = () => {
        setIsNavOpen(false);
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light m-0 p-0" >
                <div className="container-fluid  me-4">
                    <Link className="navbar-brand" to="/">
                        <img className="ms-4" src={require("./img/locationLogo1.webp")} style={{ width: "60px", height: "45px" }} alt="logo" />
                    </Link>
                    <button className="navbar-toggler" type="button" onClick={() => setIsNavOpen(!isNavOpen)} style={{ fontSize: "28px" }}>
                        <span style={{ width: "60px", height: "60px", color: "rgb(56, 182, 255)" }}> <GiHamburgerMenu /></span>
                    </button>

                    <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ""}`} id="navbarNav">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link id="nav-link1" className="nav-link" to="/location" onClick={closeMenu}>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link id="nav-link1" className="nav-link" to="/location_history" onClick={closeMenu}>LocationHistory</Link>
                            </li>

                            <li className="nav-item">
                                <Link id="nav-link1" className="nav-link" to="/about" onClick={closeMenu}>About</Link>
                            </li>

                            <li className="nav-item">
                                <Link id="nav-link1" className="nav-link" to="/location_delete" onClick={closeMenu}>DeleteLocation</Link>
                            </li>
                        
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
