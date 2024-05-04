import { __assign } from "tslib";
import React from "react";
import { FormGroup, Input, Label } from "reactstrap";
import { formatDateTimeLocal } from "../../../helpers/formatters/dateFormatter";
;
var DateFilter = function (_a) {
    var name = _a.name, label = _a.label, _b = _a.className, className = _b === void 0 ? "" : _b, filterData = _a.filterData, setFilterData = _a.setFilterData;
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
        React.createElement(Input, { id: name, name: name, type: "datetime-local", onChange: handleInputChange, value: filterData && filterData[name] ? formatDateTimeLocal(filterData[name]) : "" })));
};
export default DateFilter;
//# sourceMappingURL=dateFilter.js.map