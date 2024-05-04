import { __assign } from "tslib";
import React from "react";
import { FormGroup, Input, Label } from "reactstrap";
;
var TextFilter = function (_a) {
    var name = _a.name, label = _a.label, placeholder = _a.placeholder, className = _a.className, filterData = _a.filterData, setFilterData = _a.setFilterData;
    var handleInputChange = function (event) {
        var _a = event.target, name = _a.name, value = _a.value;
        if (setFilterData) {
            setFilterData(function (prevFilterData) {
                var _a;
                return (__assign(__assign({}, prevFilterData), (_a = {}, _a[name] = value, _a)));
            });
        }
    };
    return (React.createElement(FormGroup, { className: className },
        React.createElement(Label, { for: name }, label),
        React.createElement(Input, { id: name, name: name, type: "text", placeholder: placeholder, onChange: handleInputChange, value: filterData && filterData[name] ? filterData[name] : "" })));
};
export default TextFilter;
//# sourceMappingURL=textFilter.js.map