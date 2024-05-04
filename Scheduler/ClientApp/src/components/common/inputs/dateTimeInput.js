import { __assign } from "tslib";
import React from "react";
import { FormFeedback, FormGroup, Input, Label } from "reactstrap";
import { formatDateTimeLocal } from "../../../helpers/formatters/dateFormatter";
;
var DateTimeInput = function (_a) {
    var id = _a.id, formData = _a.formData, label = _a.label, error = _a.error, onChange = _a.onChange;
    return (React.createElement(FormGroup, null,
        React.createElement(Label, { for: id }, label),
        React.createElement(Input, __assign({ id: id, name: id, type: "datetime-local", onChange: function (e) { return onChange(e, id); } }, (formData ? { value: formatDateTimeLocal(formData) } : {}), (error ? { invalid: true } : { valid: true }))),
        error &&
            React.createElement(FormFeedback, null, error)));
};
export default DateTimeInput;
//# sourceMappingURL=dateTimeInput.js.map