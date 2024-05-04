import { __awaiter, __generator } from "tslib";
import React, { useState } from "react";
import { Button, Form } from "reactstrap";
import Loader from "../common/loader";
import TextInput from "../common/inputs/textInput";
import SelectInput from "../common/inputs/selectInput";
import { handleSelectInputChange } from "../../helpers/utils/reactSelectUtils";
import { handleInputChange } from "../../helpers/utils/inputUtils";
;
;
var AppointmentTypeEdit = function (_a) {
    var appointmentType = _a.appointmentType, doctorOptions = _a.doctorOptions, toggleEditMode = _a.toggleEditMode, onEditAppointmentType = _a.onEditAppointmentType;
    var _b = useState(false), isLoading = _b[0], setIsLoading = _b[1];
    var _c = useState({
        id: appointmentType.id,
        name: appointmentType.name,
        doctorId: appointmentType.doctorId,
    }), requestData = _c[0], setRequestData = _c[1];
    var _d = useState({
        name: "",
    }), formErrors = _d[0], setFormErrors = _d[1];
    var onInputChange = function (e, key) {
        handleInputChange(e, key, setRequestData, setFormErrors);
    };
    var onSelectChange = function (newValue, actionMeta) {
        handleSelectInputChange(newValue, actionMeta, setRequestData);
    };
    var validateForm = function () {
        var errors = {};
        if (!requestData.name || !requestData.name.trim()) {
            errors.name = "Моля, попълнете име.";
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0; // Form is valid if there are no errors
    };
    var onFormSubmitClick = function () { return __awaiter(void 0, void 0, void 0, function () {
        var isEdited;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!validateForm()) return [3 /*break*/, 2];
                    setIsLoading(true);
                    requestData.id = appointmentType === null || appointmentType === void 0 ? void 0 : appointmentType.id;
                    return [4 /*yield*/, onEditAppointmentType(requestData)];
                case 1:
                    isEdited = _a.sent();
                    if (isEdited) {
                        toggleEditMode();
                    }
                    setIsLoading(false);
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement(Form, { className: "".concat(isLoading ? 'loading' : '') },
        isLoading && React.createElement(Loader, null),
        React.createElement(TextInput, { id: 'name', formData: requestData.name, label: 'Име', placeholder: 'Въведете име', error: formErrors.name, onChange: onInputChange }),
        React.createElement(SelectInput, { id: 'doctorId', formData: requestData.doctorId, options: doctorOptions, label: 'Доктор', placeholder: 'Изберете доктор', onChange: onSelectChange }),
        React.createElement(Button, { color: "success col-5", className: "fw-bold m-1", onClick: onFormSubmitClick }, "\u0417\u0430\u043F\u0430\u0437\u0438"),
        React.createElement(Button, { color: "secondary", className: "fw-bold m-1 col-5", onClick: toggleEditMode }, "\u041E\u0442\u043A\u0430\u0436\u0438")));
};
export default AppointmentTypeEdit;
//# sourceMappingURL=appointmentTypeEdit.js.map