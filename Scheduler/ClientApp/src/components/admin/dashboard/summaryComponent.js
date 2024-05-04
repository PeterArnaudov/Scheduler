import React from "react";
;
var SummaryComponent = function (_a) {
    var title = _a.title, data = _a.data;
    return (React.createElement("div", { className: "col-12 col-sm-6 col-md-4 col-lg-3" },
        React.createElement("div", { className: "card mb-4" },
            React.createElement("div", { className: "card-body" },
                React.createElement("div", { className: "card-title text-disabled" }, title),
                React.createElement("div", { className: "fs-4 fw-bolder pb-3" }, data)))));
};
export default SummaryComponent;
//# sourceMappingURL=summaryComponent.js.map