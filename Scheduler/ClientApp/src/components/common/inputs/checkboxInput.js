import { __assign } from "tslib";
import React from "react";
import { FormFeedback, FormGroup, Input, Label } from "reactstrap";
;
var CheckboxInput = function (_a) {
    var id = _a.id, formData = _a.formData, label = _a.label, error = _a.error, onChange = _a.onChange;
    return (React.createElement(FormGroup, { check: true },
        React.createElement(Label, { for: id, check: true }, label),
        React.createElement(Input, __assign({ id: id, name: id, type: "checkbox", onChange: function (e) { return onChange(e, id); }, checked: formData }, (error ? { invalid: true } : { valid: true }))),
        error &&
            React.createElement(FormFeedback, null, error)));
};
export default CheckboxInput;
//# sourceMappingURL=checkboxInput.js.map