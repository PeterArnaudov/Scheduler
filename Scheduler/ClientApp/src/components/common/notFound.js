import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
var NotFound = function (_a) {
    var buttonText = _a.buttonText, redirectUrl = _a.redirectUrl;
    var navigate = useNavigate();
    return (React.createElement("div", { className: "d-flex align-items-center justify-content-center" },
        React.createElement("div", { className: "text-center" },
            React.createElement("h1", { className: "display-1 fw-bold" }, "404"),
            React.createElement("p", { className: "fs-3" },
                " ",
                React.createElement("span", { className: "text-danger" }, "\u041E\u043F\u0430!"),
                " \u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430\u0442\u0430 \u043D\u0435 \u0435 \u043D\u0430\u043C\u0435\u0440\u0435\u043D\u0430."),
            React.createElement("p", { className: "lead" }, "\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430\u0442\u0430 \u0438\u043B\u0438 \u0440\u0435\u0441\u0443\u0440\u0441\u044A\u0442, \u043A\u043E\u0439\u0442\u043E \u0441\u0435 \u043E\u043F\u0438\u0442\u0432\u0430\u0442\u0435 \u0434\u0430 \u0434\u043E\u0441\u0442\u044A\u043F\u0438\u0442\u0435 \u043D\u0435 \u0441\u044A\u0449\u0435\u0441\u0442\u0432\u0443\u0432\u0430."),
            React.createElement(Button, { color: 'primary', onClick: function () { return navigate(redirectUrl); } }, buttonText))));
};
export default NotFound;
//# sourceMappingURL=notFound.js.map