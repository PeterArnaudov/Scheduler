import { __assign } from "tslib";
import React from "react";
import ReactSelect from "react-select";
import { FormGroup, Label } from "reactstrap";
;
var SelectInput = function (_a) {
    var id = _a.id, formData = _a.formData, options = _a.options, label = _a.label, placeholder = _a.placeholder, _b = _a.isMulti, isMulti = _b === void 0 ? false : _b, _c = _a.isDisabled, isDisabled = _c === void 0 ? false : _c, error = _a.error, onChange = _a.onChange;
    var defaultValue = null;
    if (formData) {
        if (Array.isArray(formData)) {
            defaultValue = options.filter(function (x) { return formData.includes(x.value); });
        }
        else {
            defaultValue = options.filter(function (x) { return x.value === formData; });
        }
    }
    return (React.createElement(FormGroup, null,
        React.createElement(Label, { for: id }, label),
        React.createElement(ReactSelect, __assign({ isDisabled: isDisabled, isMulti: isMulti, closeMenuOnSelect: !isMulti, id: id, name: id, options: options, placeholder: placeholder }, (defaultValue ? { value: defaultValue } : {}), { noOptionsMessage: function () { return "Не са налични опции"; }, onChange: onChange })),
        error &&
            React.createElement("div", { className: "invalid-feedback d-inline-block" }, error)));
};
export default SelectInput;
//# sourceMappingURL=selectInput.js.map