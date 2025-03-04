import React, { useState } from 'react';
import './navbar.css';
import { FiMenu, FiX } from "react-icons/fi";
import logo from '../assets/logo.png';  // Import the logo

const Navbar = ({ navBarLinks }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className='navbar'>
            <div className="navbar__brand">
                <img src={logo} alt="Nirbhayam Logo" className='navbar__logo' />
                <span className='navbar__name'></span>
            </div>
            {menuOpen ? (
                <FiX size={25} className='navbar__menu' onClick={() => setMenuOpen(false)} />
            ) : (
                <FiMenu size={25} className='navbar__menu' onClick={() => setMenuOpen(true)} />
            )}
            <ul className={`navbar__list ${menuOpen ? "navbar__list--active" : ""}`}>
                {navBarLinks.map((item) => (
                    <li className='navbar__item' key={item.title}>
                        <a className='navbar__links' href={item.url}>{item.title}</a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navbar;
