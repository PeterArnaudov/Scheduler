import { __awaiter, __generator } from "tslib";
import React, { useState } from "react";
import { Button, Card, CardBody, CardHeader, CardTitle, Form } from "reactstrap";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../common/loader";
import doctorService from "../../services/doctorService";
import TextInput from "../common/inputs/textInput";
import { handleInputChange } from "../../helpers/utils/inputUtils";
var DoctorCreate = function (_a) {
    var onDoctorCreate = _a.onDoctorCreate, onCancelClick = _a.onCancelClick;
    var _b = useState(false), isLoading = _b[0], setIsLoading = _b[1];
    var _c = useState({
        name: "",
        description: "",
        image: "",
        color: "",
    }), requestData = _c[0], setRequestData = _c[1];
    var _d = useState({}), formErrors = _d[0], setFormErrors = _d[1];
    var clearFormData = function () {
        setRequestData({
            name: "",
            description: "",
            image: "",
            color: ""
        });
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
        var result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!validateForm()) return [3 /*break*/, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    setIsLoading(true);
                    return [4 /*yield*/, doctorService.createDoctorAsync(requestData)];
                case 2:
                    result = _a.sent();
                    if (result.success) {
                        onDoctorCreate(result.data);
                        toast.success("\u0423\u0441\u043F\u0435\u0448\u043D\u043E \u0441\u044A\u0437\u0434\u0430\u0434\u0435 ".concat(requestData.name, "."), {
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
                React.createElement(TextInput, { id: 'description', formData: requestData.description, label: 'Описание', placeholder: 'Въведете описание', error: formErrors.description, onChange: onInputChange }),
                React.createElement(TextInput, { id: 'image', formData: requestData.image, label: 'Снимка (URL)', placeholder: 'Въведете линк към снимка', error: formErrors.image, onChange: onInputChange }),
                React.createElement(TextInput, { id: 'color', formData: requestData.color, label: 'Цвят', placeholder: 'Въведете цвят', error: formErrors.color, onChange: onInputChange })),
            React.createElement(Button, { color: "success", onClick: onFormSubmitClick }, "\u0421\u044A\u0437\u0434\u0430\u0439"),
            React.createElement(Button, { className: "ms-2", color: "secondary", onClick: onCancelClick }, "\u041E\u0442\u043A\u0430\u0436\u0438"))));
};
export default DoctorCreate;
//# sourceMappingURL=doctorCreate.js.map