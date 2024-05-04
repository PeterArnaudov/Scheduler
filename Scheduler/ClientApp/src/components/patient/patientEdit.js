import { __awaiter, __generator } from "tslib";
import React, { useState } from "react";
import { Button, Form } from "reactstrap";
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../common/loader";
import TextInput from "../common/inputs/textInput";
import { handleInputChange } from "../../helpers/utils/inputUtils";
;
;
var PatientEdit = function (_a) {
    var patient = _a.patient, toggleEditMode = _a.toggleEditMode, onEditPatient = _a.onEditPatient;
    var _b = useState(false), isLoading = _b[0], setIsLoading = _b[1];
    var _c = useState({
        id: patient.id,
        name: patient.name,
        email: patient.email,
        phone: patient.phone
    }), requestData = _c[0], setRequestData = _c[1];
    var _d = useState({}), formErrors = _d[0], setFormErrors = _d[1];
    var onInputChange = function (e, key) {
        handleInputChange(e, key, setRequestData, setFormErrors);
    };
    var validateForm = function () {
        var isValidEmail = function (email) {
            var urlPattern = new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$', 'i');
            return !!urlPattern.test(email);
        };
        var errors = {};
        if (!requestData.name || !requestData.name.trim()) {
            errors.name = "Моля, попълнете име.";
        }
        if (!requestData.email) {
            errors.email = 'Моля, попълнете email адрес.';
        }
        else if (requestData.email.trim() && !isValidEmail(requestData.email)) {
            errors.email = "Моля, попълнете валиден email адрес.";
        }
        if (!requestData.phone || !requestData.phone.trim()) {
            errors.phone = "Моля, попълнете телефонен номер.";
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
                    requestData.id = patient === null || patient === void 0 ? void 0 : patient.id;
                    return [4 /*yield*/, onEditPatient(requestData)];
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
    return (React.createElement(Form, { className: "text-center ".concat(isLoading ? 'loading' : '') },
        isLoading && React.createElement(Loader, null),
        React.createElement(TextInput, { id: 'name', formData: requestData.name, label: 'Име', placeholder: 'Въведете име', error: formErrors.name, onChange: onInputChange }),
        React.createElement(TextInput, { id: 'email', formData: requestData.email, label: 'Email адрес', placeholder: 'Въведете email адрес', error: formErrors.email, onChange: onInputChange }),
        React.createElement(TextInput, { id: 'phone', formData: requestData.phone, label: 'Телефонен номер', placeholder: 'Въведете телефонен номер', error: formErrors.phone, onChange: onInputChange }),
        React.createElement(Button, { color: "success col-5", className: "fw-bold m-1", onClick: onFormSubmitClick }, "\u0417\u0430\u043F\u0430\u0437\u0438"),
        React.createElement(Button, { color: "secondary", className: "fw-bold m-1 col-5", onClick: toggleEditMode }, "\u041E\u0442\u043A\u0430\u0436\u0438")));
};
export default PatientEdit;
//# sourceMappingURL=patientEdit.js.map