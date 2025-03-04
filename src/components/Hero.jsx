import React, { useState } from 'react';
import './hero.css';
import AuthForm from './LoginPage'; // Import the login component

const Hero = ({ imageSrc, emergencyAlert }) => {
    const [showLogin, setShowLogin] = useState(false);

    return (
        <div className='hero'>
            <img src={imageSrc} alt="Nirbhayam" className='hero__image' />
            <h1 className='hero__title'>Nirbhayam</h1>
            {emergencyAlert && <p className="hero__alert">🚨 Emergency Alert Triggered!</p>}
            
            {/* {!showLogin ? (
                <button className="hero__login-btn" onClick={() => setShowLogin(true)}>
                    Login
                </button>
            ) : (
                <AuthForm />
            )} */}
        </div>
    );
};

export default Hero;

// import React from 'react';
// import './hero.css';

// const Hero = ({ imageSrc, emergencyAlert }) => {
//     return (
//         <div className='hero'>
//             <img src={imageSrc} alt="Nirbhayam" className='hero__image' />
//             <h1 className='hero__title'>Nirbhayam</h1>
//             {emergencyAlert && <p className="hero__alert">🚨 Emergency Alert Triggered!</p>}

//         </div>
//     );
// };

// export default Hero;
