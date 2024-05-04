import React, { FC } from 'react';
import './loader.css';

const Loader: FC = () => {
    return (
        <div className="loader-overlay">
            <div className="d-flex justify-content-center align-items-center loader-container">
                <div className="spinner-grow text-success" role="status"></div>
            </div>
        </div>
    );
};

export default Loader;