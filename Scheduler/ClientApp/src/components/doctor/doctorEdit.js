import { __assign, __awaiter, __generator } from "tslib";
import React, { useState } from "react";
import { Button, Card, CardBody, CardHeader, CardTitle, Form } from "reactstrap";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../common/loader";
import doctorService from "../../services/doctorService";
import TextInput from "../common/inputs/textInput";
import { handleInputChange } from "../../helpers/utils/inputUtils";
var DoctorEdit = function (_a) {
    var _b, _c, _d;
    var doctor = _a.doctor, setDoctor = _a.setDoctor, setIsEditMode = _a.setIsEditMode;
    var _e = useState(false), isLoading = _e[0], setIsLoading = _e[1];
    var _f = useState({
        id: doctor.id,
        name: doctor.name,
        description: (_b = doctor.description) !== null && _b !== void 0 ? _b : '',
        image: (_c = doctor.image) !== null && _c !== void 0 ? _c : '',
        color: (_d = doctor.color) !== null && _d !== void 0 ? _d : '',
    }), requestData = _f[0], setRequestData = _f[1];
    var _g = useState({}), formErrors = _g[0], setFormErrors = _g[1];
    var toggleIsLoading = function () {
        setIsLoading(!isLoading);
    };
    var onInputChange = function (e, key) {
        handleInputChange(e, key, setRequestData, setFormErrors);
    };
    var validateForm = function () {
        var isValidUrl = function (urlString) {
            var urlPattern = new RegExp('^(https?:\\/\\/)?' + // validate protocol
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
                '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
                '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
                '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
                '(\\#[-a-z\\d_]*)?$', 'i'); // validate fragment locator
            return !!urlPattern.test(urlString);
        };
        var errors = {};
        if (!requestData.name.trim()) {
            errors.name = "Моля, попълнете име.";
        }
        if (requestData.image.trim() && !isValidUrl(requestData.image)) {
            errors.image = "Моля, попълнете валиден URL адрес.";
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0; // Form is valid if there are no errors
    };
    var onFormSubmitClick = function () { return __awaiter(void 0, void 0, void 0, function () {
        var result_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!validateForm()) return [3 /*break*/, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    toggleIsLoading();
                    requestData.id = doctor === null || doctor === void 0 ? void 0 : doctor.id;
                    return [4 /*yield*/, doctorService.editDoctorAsync(requestData)];
                case 2:
                    result_1 = _a.sent();
                    if (result_1.success) {
                        setDoctor(function (prevDoctor) { return (__assign(__assign({}, prevDoctor), result_1.data)); });
                        setIsEditMode(false);
                        toast.success("\u0423\u0441\u043F\u0435\u0448\u043D\u043E \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u0430 ".concat(doctor.name, "."), {
                            icon: '✅',
                        });
                    }
                    else {
                        toast.error(result_1.message, {
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
                    toggleIsLoading();
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement(Card, null,
        isLoading && React.createElement(Loader, null),
        React.createElement(CardHeader, null,
            React.createElement(CardTitle, { className: "h5" }, "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u0430\u043D\u0435")),
        React.createElement(CardBody, null,
            React.createElement(Form, null,
                React.createElement(TextInput, { id: 'name', formData: requestData.name, label: 'Име', placeholder: 'Въведете име', error: formErrors.name, onChange: onInputChange }),
                React.createElement(TextInput, { id: 'description', formData: requestData.description, label: 'Описание', placeholder: 'Въведете описание', error: formErrors.description, onChange: onInputChange }),
                React.createElement(TextInput, { id: 'image', formData: requestData.image, label: 'Снимка (URL)', placeholder: 'Въведете линк към снимка', error: formErrors.image, onChange: onInputChange }),
                React.createElement(TextInput, { id: 'color', formData: requestData.color, label: 'Цвят', placeholder: 'Въведете цвят (използван в графика)', error: formErrors.name, onChange: onInputChange })),
            React.createElement(Button, { color: "success", onClick: onFormSubmitClick }, "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u0430\u0439"),
            React.createElement(Button, { className: "ms-2", color: "secondary", onClick: function () { return setIsEditMode(false); } }, "\u041E\u0442\u043A\u0430\u0436\u0438"))));
};
export default DoctorEdit;
//# sourceMappingURL=doctorEdit.js.map