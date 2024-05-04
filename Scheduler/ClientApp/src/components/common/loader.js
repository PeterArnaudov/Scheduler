import React from 'react';
import './loader.css';
var Loader = function () {
    return (React.createElement("div", { className: "loader-overlay" },
        React.createElement("div", { className: "d-flex justify-content-center align-items-center loader-container" },
            React.createElement("div", { className: "spinner-grow text-success", role: "status" }))));
};
export default Loader;
//# sourceMappingURL=loader.js.map