import { __assign } from "tslib";
import React, { useState } from "react";
import { Button, ButtonGroup, Form } from "reactstrap";
var FilterContainer = function (_a) {
    var initialFilterData = _a.initialFilterData, updateFilterData = _a.updateFilterData, className = _a.className, children = _a.children;
    var _b = useState(__assign({}, initialFilterData)), filterData = _b[0], setFilterData = _b[1];
    var childrenWithProps = React.Children.map(children, function (child) {
        if (React.isValidElement(child)) {
            var elementProps = {
                filterData: filterData,
                setFilterData: setFilterData
            };
            return React.cloneElement(child, elementProps);
        }
        return child;
    });
    var handleSubmit = function () {
        updateFilterData(filterData);
    };
    var clearFilters = function () {
        setFilterData({});
        updateFilterData({});
    };
    return (React.createElement(Form, { className: className, onSubmit: function (e) { return e.preventDefault(); } },
        childrenWithProps,
        React.createElement(ButtonGroup, { className: "gap-1 d-block mt-2" },
            React.createElement(Button, { color: "primary", onClick: handleSubmit }, "\u0424\u0438\u043B\u0442\u0440\u0438\u0440\u0430\u0439"),
            React.createElement(Button, { color: "secondary", onClick: clearFilters }, "\u0418\u0437\u0447\u0438\u0441\u0442\u0438 \u0444\u0438\u043B\u0442\u0440\u0438\u0442\u0435"))));
};
export default FilterContainer;
//# sourceMappingURL=filterContainer.js.map