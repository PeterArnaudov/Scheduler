import { __assign } from "tslib";
import React from "react";
import ReactSelect from "react-select";
;
var MultiSelectFilter = function (_a) {
    var options = _a.options, name = _a.name, label = _a.label, customStyles = _a.customStyles, className = _a.className, setFilterData = _a.setFilterData;
    var handleInputChange = function (newValue, actionMeta) {
        if (!newValue)
            return;
        var values = newValue.map(function (option) { return option.value; });
        if (setFilterData) {
            setFilterData(function (prevFilterData) {
                var _a;
                return (__assign(__assign({}, prevFilterData), (_a = {}, _a[name] = values, _a)));
            });
        }
    };
    return (React.createElement(ReactSelect, { className: className, closeMenuOnSelect: false, isMulti: true, options: options, placeholder: label, noOptionsMessage: function () { return "Не са налични опции"; }, onChange: handleInputChange, styles: customStyles }));
};
export default MultiSelectFilter;
//# sourceMappingURL=multiSelectFilter.js.map