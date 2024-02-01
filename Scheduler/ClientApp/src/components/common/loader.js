import React from 'react';
import './loader.css';

const Loader = () => {
    return (
        <div className="loader-overlay">
            <div className="d-flex justify-content-center align-items-center loader-container">
                <div className="spinner-grow text-success" role="status"></div>
            </div>
        </div>
    );
};

export default Loader;