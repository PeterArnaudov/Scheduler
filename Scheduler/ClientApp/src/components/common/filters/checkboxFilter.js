import { __assign } from "tslib";
import React from "react";
import { FormGroup, Input, Label } from "reactstrap";
;
var CheckboxFilter = function (_a) {
    var name = _a.name, label = _a.label, filterData = _a.filterData, setFilterData = _a.setFilterData;
    var handleInputChange = function (event) {
        var _a = event.target, name = _a.name, checked = _a.checked;
        if (setFilterData) {
            setFilterData(function (prevFilterData) {
                var _a;
                return (__assign(__assign({}, prevFilterData), (_a = {}, _a[name] = checked, _a)));
            });
        }
    };
    return (React.createElement(FormGroup, { check: true, inline: true },
        React.createElement(Input, { id: name, name: name, type: "checkbox", onChange: handleInputChange, checked: filterData && filterData[name] ? filterData[name] : false }),
        React.createElement(Label, { for: name, check: true }, label)));
};
export default CheckboxFilter;
//# sourceMappingURL=checkboxFilter.js.map