import { __assign } from "tslib";
import React from "react";
var Legend = function (_a) {
    var items = _a.items;
    return (React.createElement("div", null, items.map(function (item, index) {
        return (React.createElement("span", { key: index },
            React.createElement("div", { className: "d-inline-block me-3" },
                React.createElement("div", { style: __assign({ height: '25px', width: '25px', display: 'inline-block', backgroundColor: item.color }, item.style) }),
                React.createElement("span", { className: "align-top ms-1" }, item.text))));
    })));
};
export default Legend;
//# sourceMappingURL=legend.js.map