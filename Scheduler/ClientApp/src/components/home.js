import React from 'react';
import { useNavigate } from 'react-router-dom';
var Home = function () {
    var navigate = useNavigate();
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "px-4 pt-5 my-5 text-center border-bottom" },
            React.createElement("h1", { className: "display-4 fw-bold" }, "Scheduler"),
            React.createElement("div", { className: "col-lg-6 mx-auto" },
                React.createElement("p", { className: "lead mb-4" }, "\u041F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435\u0442\u043E \u0437\u0430 \u043A\u043B\u0438\u043D\u0438\u043A\u0438 \u0438 \u043F\u0440\u0430\u043A\u0442\u0438\u043A\u0438, \u0441\u0438\u043C\u043F\u043B\u0438\u0441\u0442\u0438\u0447\u043D\u043E \u0438 \u043B\u0435\u0441\u043D\u043E \u0437\u0430 \u0438\u0437\u043F\u043E\u043B\u0437\u0432\u0430\u043D\u0435, \u043F\u0440\u0435\u0434\u043B\u0430\u0433\u0430 \u0444\u0443\u043D\u043A\u0446\u0438\u0438 \u0438 \u0443\u0434\u043E\u0431\u0441\u0442\u0432\u0430 \u0437\u0430 \u043F\u0430\u0446\u0438\u0435\u043D\u0442\u0438 \u0438 \u0434\u043E\u043A\u0442\u043E\u0440\u0438."),
                React.createElement("div", { className: "d-grid gap-2 d-sm-flex justify-content-sm-center mb-5" },
                    React.createElement("button", { type: "button", className: "btn btn-primary btn-lg px-4 me-sm-3", onClick: function () { return navigate('/clinics'); } }, "\u0422\u044A\u0440\u0441\u0438 \u043A\u043B\u0438\u043D\u0438\u043A\u0438"),
                    React.createElement("button", { type: "button", className: "btn btn-secondary btn-lg px-4" }, "\u0421\u044A\u0437\u0434\u0430\u0439 \u043A\u043B\u0438\u043D\u0438\u043A\u0430"))))));
};
export default Home;
//# sourceMappingURL=home.js.map