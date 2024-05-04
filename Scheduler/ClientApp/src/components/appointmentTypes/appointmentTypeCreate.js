import { __assign, __awaiter, __generator } from "tslib";
import React, { useState } from "react";
import appointmentTypeService from "../../services/appointmentTypeService";
import { toast } from "react-toastify";
import { Button, Card, CardBody, CardHeader, CardTitle, Form } from "reactstrap";
import Loader from "../common/loader";
import TextInput from "../common/inputs/textInput";
import SelectInput from "../common/inputs/selectInput";
import { handleInputChange } from "../../helpers/utils/inputUtils";
import { handleSelectInputChange } from "../../helpers/utils/reactSelectUtils";
;
;
var AppointmentTypeCreate = function (_a) {
    var onAppointmentTypeCreate = _a.onAppointmentTypeCreate, doctorOptions = _a.doctorOptions, onCancelClick = _a.onCancelClick;
    var _b = useState(false), isLoading = _b[0], setIsLoading = _b[1];
    var _c = useState({
        name: "",
    }), requestData = _c[0], setRequestData = _c[1];
    var _d = useState({}), formErrors = _d[0], setFormErrors = _d[1];
    var clearFormData = function () {
        setRequestData(__assign(__assign({}, requestData), { name: "" }));
    };
    var onInputChange = function (e, key) {
        handleInputChange(e, key, setRequestData, setFormErrors);
    };
    var onSelectChange = function (newValue, actionMeta) {
        handleSelectInputChange(newValue, actionMeta, setRequestData);
    };
    var validateForm = function () {
        var errors = {};
        if (!requestData.name.trim()) {
            errors.name = "Моля, попълнете име.";
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0; // Form is valid if there are no errors
    };
    var onFormSubmitClick = function () { return __awaiter(void 0, void 0, void 0, function () {
        var result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!validateForm()) return [3 /*break*/, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    setIsLoading(true);
                    return [4 /*yield*/, appointmentTypeService.createAppointmentTypeAsync(requestData)];
                case 2:
                    result = _a.sent();
                    if (result.success) {
                        onAppointmentTypeCreate(result.data);
                        toast.success("\u0423\u0441\u043F\u0435\u0448\u043D\u043E \u0441\u044A\u0437\u0434\u0430\u0434\u043E\u0445\u0442\u0435 ".concat(requestData.name, "."), {
                            icon: '✅',
                        });
                        clearFormData();
                    }
                    else {
                        toast.error(result.message, {
                            icon: '❌',
                        });
                    }
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    toast.error('Изникна грешка при обработването на резултата.', {
                        icon: '❌',
                    });
                    return [3 /*break*/, 5];
                case 4:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement(Card, null,
        isLoading && React.createElement(Loader, null),
        React.createElement(CardHeader, null,
            React.createElement(CardTitle, { className: "h5" }, "\u0421\u044A\u0437\u0434\u0430\u0432\u0430\u043D\u0435")),
        React.createElement(CardBody, null,
            React.createElement(Form, null,
                React.createElement(TextInput, { id: 'name', formData: requestData.name, label: 'Име', placeholder: 'Въведете име', error: formErrors.name, onChange: onInputChange }),
                React.createElement(SelectInput, { id: 'doctors', formData: requestData.doctors, options: doctorOptions, label: 'Доктор', placeholder: 'Изберете доктор', isMulti: true, onChange: onSelectChange })),
            React.createElement(Button, { color: "success", onClick: onFormSubmitClick }, "\u0421\u044A\u0437\u0434\u0430\u0439"),
            React.createElement(Button, { className: "ms-2", color: "secondary", onClick: onCancelClick }, "\u041E\u0442\u043A\u0430\u0436\u0438"))));
};
export default AppointmentTypeCreate;
//# sourceMappingURL=appointmentTypeCreate.js.map