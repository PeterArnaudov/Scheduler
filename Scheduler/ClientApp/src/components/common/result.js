import React from "react";
var Result = function (_a) {
    var isSuccess = _a.isSuccess, message = _a.message, children = _a.children;
    return (React.createElement("div", { className: "alert ".concat(isSuccess ? 'alert-success' : 'alert-danger') },
        React.createElement("p", null, message),
        React.createElement("p", null, isSuccess), children === null || children === void 0 ? void 0 :
        children.map(function (button, index) { return (React.createElement("span", { key: index, className: "me-2" }, button)); })));
};
export default Result;
//# sourceMappingURL=result.js.map