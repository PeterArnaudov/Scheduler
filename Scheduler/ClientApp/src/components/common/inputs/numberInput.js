import { __assign } from "tslib";
import React from "react";
import { FormFeedback, FormGroup, Input, Label } from "reactstrap";
;
var NumberInput = function (_a) {
    var id = _a.id, formData = _a.formData, label = _a.label, placeholder = _a.placeholder, error = _a.error, onChange = _a.onChange;
    return (React.createElement(FormGroup, { className: "" },
        React.createElement(Label, { for: id }, label),
        React.createElement(Input, __assign({ className: "mb-2", id: id, name: id, placeholder: placeholder, type: 'number', onChange: function (e) { return onChange(e, id); }, value: formData || "" }, (error ? { invalid: true } : { valid: true }))),
        error &&
            React.createElement(FormFeedback, null, error)));
};
export default NumberInput;
//# sourceMappingURL=numberInput.js.map