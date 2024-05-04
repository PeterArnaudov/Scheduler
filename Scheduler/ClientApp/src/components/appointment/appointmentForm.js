import { __awaiter, __generator } from "tslib";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Doctor from "../doctor/doctor";
import Result from "../common/result";
import { Alert, Button } from "reactstrap";
import { extractDate, extractHour } from "../../helpers/formatters/dateFormatter";
import StepList from "../common/stepList";
import Loader from "../common/loader";
import appointmentTypeService from "../../services/appointmentTypeService";
import TextInput from "../common/inputs/textInput";
import { handleInputChange } from "../../helpers/utils/inputUtils";
import SelectInput from "../common/inputs/selectInput";
import { handleSelectInputChange } from "../../helpers/utils/reactSelectUtils";
;
;
var AppointmentForm = function (_a) {
    var _b;
    var doctor = _a.doctor, selectedAppointment = _a.selectedAppointment;
    var navigate = useNavigate();
    var _c = useState({
        appointmentId: (_b = selectedAppointment === null || selectedAppointment === void 0 ? void 0 : selectedAppointment.id) !== null && _b !== void 0 ? _b : 0,
        phone: "",
    }), formData = _c[0], setFormData = _c[1];
    var _d = useState([]), appointmentTypes = _d[0], setAppointmentTypes = _d[1];
    var _e = useState(false), hasQuickAppointmentFailed = _e[0], setHasQuickAppointmentFailed = _e[1];
    var _f = useState({
        name: "",
        email: "",
        phone: "",
        appointment: "",
    }), formErrors = _f[0], setFormErrors = _f[1];
    var _g = useState(undefined), formResult = _g[0], setFormResult = _g[1];
    var _h = useState(false), isLoading = _h[0], setIsLoading = _h[1];
    var hasFormResult = formResult !== undefined && formResult !== null;
    useEffect(function () {
        var fetchData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, appointmentTypeService.getAppointmentTypesAsync(doctor.id)];
                    case 1:
                        result = _a.sent();
                        if (result.success) {
                            setAppointmentTypes(result.data);
                        }
                        else {
                            console.error('Error fetching appointment types:', result.message);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error('An unexpected error occurred:', error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        if (!doctor || !selectedAppointment) {
            navigate('/doctors');
        }
        else {
            fetchData();
        }
    }, [doctor, selectedAppointment, navigate]);
    var getAppointmentTypeOptions = function () {
        return appointmentTypes.map(function (type) { return ({
            value: type.id,
            label: type.name
        }); });
    };
    var onFormSubmitClick = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, result, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!validateForm(hasQuickAppointmentFailed)) return [3 /*break*/, 6];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    setIsLoading(true);
                    return [4 /*yield*/, fetch("/api/appointment", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(formData),
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    result = _a.sent();
                    if (response.ok) {
                        if (result.success) {
                            setFormResult(result.success);
                        }
                    }
                    else {
                        if (!result.success && result.isQuickAppointment) {
                            setHasQuickAppointmentFailed(true);
                            validateForm(true);
                        }
                        else {
                            setFormResult(result.success);
                        }
                    }
                    return [3 /*break*/, 6];
                case 4:
                    error_2 = _a.sent();
                    setFormResult(false);
                    console.error('An unexpected error occurred:', error_2);
                    return [3 /*break*/, 6];
                case 5:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    var validateForm = function (hasQuickAppointmentFailed) {
        var errors = {};
        if ((!formData.name || !formData.name.trim()) && hasQuickAppointmentFailed) {
            errors.name = "Моля, попълнете Вашето име.";
        }
        if ((!formData.email || !formData.email.trim()) && hasQuickAppointmentFailed) {
            errors.email = "Моля, попълнете Вашият email.";
        }
        if (!formData.phone || !formData.phone.trim()) {
            errors.phone = "Моля, попълнете Вашият телефонен номер.";
        }
        // Check either #typeId has a selected option or #comment has a value
        if (!formData.appointmentTypeId && (!formData.comment || !formData.comment.trim())) {
            errors.appointment = "Моля, изберете процедура или добавете коментар.";
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0; // Form is valid if there are no errors
    };
    var onInputChange = function (e, key) {
        handleInputChange(e, key, setFormData, setFormErrors);
        // Clear form result when user starts typing.
        setFormResult(undefined);
    };
    var onSelectChange = function (newValue, actionMeta) {
        handleSelectInputChange(newValue, actionMeta, setFormData);
    };
    return (React.createElement("div", null,
        hasFormResult &&
            React.createElement("div", null,
                React.createElement(Result, { isSuccess: formResult, message: formResult
                        ? "\u0423\u0441\u043F\u0435\u0448\u043D\u043E \u0437\u0430\u043F\u0430\u0437\u0438\u0445\u0442\u0435 \u0441\u0432\u043E\u044F \u0447\u0430\u0441. \u041E\u0447\u0430\u043A\u0432\u0430\u043C\u0435 \u0412\u0438 \u0432 ".concat(extractDate(selectedAppointment.startDateTime), " \u0432 ").concat(extractHour(selectedAppointment.startDateTime), " \u0447.")
                        : "Изникна грешка при запазване на час. Моля, свържете се по телефон с нас." },
                    formResult
                        ? React.createElement(Button, { color: "primary", onClick: function () { return navigate('/doctors'); } }, "\u0417\u0430\u043F\u0430\u0437\u0438 \u0434\u0440\u0443\u0433 \u0447\u0430\u0441")
                        : React.createElement(Button, { href: "tel:+359885127779", color: "primary" }, "\u041E\u0431\u0430\u0434\u0438 \u043D\u0438 \u0441\u0435"),
                    React.createElement(Button, { href: "https://dentahouse.bg", color: "primary" }, "\u0412\u044A\u0440\u043D\u0438 \u0441\u0435 \u0432 \u0441\u0430\u0439\u0442\u0430")),
                formResult && (React.createElement(React.Fragment, null,
                    React.createElement(Alert, { color: "info" },
                        React.createElement("p", null, "\u0410\u043A\u043E \u0436\u0435\u043B\u0430\u0435\u0442\u0435 \u0434\u0430 \u043F\u043E\u043B\u0443\u0447\u0430\u0432\u0430\u0442\u0435 \u043D\u0430\u043F\u043E\u043C\u043D\u044F\u043D\u0435 \u0437\u0430 \u0412\u0430\u0448\u0438\u0442\u0435 \u043F\u043E\u0441\u0435\u0449\u0435\u043D\u0438\u044F \u0438 \u0434\u0440\u0443\u0433\u0430 \u043F\u043E\u043B\u0435\u0437\u043D\u0430 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F \u043E\u0442 \u043D\u0430\u0441, \u043C\u043E\u0436\u0435 \u0434\u0430 \u0441\u0435 \u0430\u0431\u043E\u043D\u0438\u0440\u0430\u0442\u0435 \u0437\u0430 \u043D\u0430\u0448\u0438\u044F Viber Bot, \u0438\u0437\u043F\u044A\u043B\u043D\u044F\u0432\u0430\u0439\u0442\u0435 \u0438\u0437\u0431\u0440\u043E\u0435\u043D\u0438\u0442\u0435 \u0441\u0442\u044A\u043F\u043A\u0438 \u043E\u0442\u0434\u043E\u043B\u0443:"),
                        React.createElement(StepList, { steps: [
                                {
                                    title: "Отворете нашия Viber Bot",
                                    description: "Натиснете бутона отдолу, който ще Ви отведе до нашия Viber Bot.",
                                    children: [React.createElement(Button, { className: 'mt-2' }, "Viber Bot")]
                                },
                                {
                                    title: "Изпратете мобилен номер",
                                    description: "Въведете своя мобилен номер и изпратете съобщението до нашия Viber Bot."
                                },
                                {
                                    title: "Готово!",
                                    description: "Вие вече сте абониран за нашия Viber Bot и ще получавате напомняне за предстоящите Ви посещения и друга важна информация!"
                                },
                            ] }))))),
        (!hasFormResult || !formResult) &&
            React.createElement("div", { className: "row mb-4" },
                React.createElement(Doctor, { doctorData: doctor, selectedAppointment: selectedAppointment }),
                React.createElement("div", { className: "col-sm-12 col-md-6 col-lg-8 mt-3 ".concat(isLoading ? 'loading' : '') },
                    isLoading && React.createElement(Loader, null),
                    React.createElement("div", { className: "alert alert-info" }, "\u0410\u043A\u043E \u0432\u0435\u0447\u0435 \u0441\u0442\u0435 \u0437\u0430\u043F\u0430\u0437\u0432\u0430\u043B\u0438 \u0447\u0430\u0441 \u0447\u0440\u0435\u0437 \u043D\u0430\u0448\u0430\u0442\u0430 \u043E\u043D\u043B\u0430\u0439\u043D \u0441\u0438\u0441\u0442\u0435\u043C\u0430, \u043C\u043E\u0436\u0435 \u0434\u0430 \u043F\u043E\u043F\u044A\u043B\u043D\u0438\u0442\u0435 \u0435\u0434\u0438\u043D\u0441\u0442\u0432\u0435\u043D\u043E \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0435\u043D \u043D\u043E\u043C\u0435\u0440."),
                    React.createElement(TextInput, { id: 'name', formData: formData.name, label: '\u0418\u043C\u0435 \u0438 \u0444\u0430\u043C\u0438\u043B\u0438\u044F', placeholder: '\u0412\u044A\u0432\u0435\u0434\u0435\u0442\u0435 \u0438\u043C\u0435 \u0438 \u0444\u0430\u043C\u0438\u043B\u0438\u044F', error: formErrors.name, onChange: onInputChange }),
                    React.createElement(TextInput, { id: 'email', formData: formData.email, label: 'Email', placeholder: '\u0412\u044A\u0432\u0435\u0434\u0435\u0442\u0435 email', error: formErrors.email, onChange: onInputChange }),
                    React.createElement(TextInput, { id: 'phone', formData: formData.phone, label: '\u0422\u0435\u043B\u0435\u0444\u043E\u043D\u0435\u043D \u043D\u043E\u043C\u0435\u0440', placeholder: '\u0412\u044A\u0432\u0435\u0434\u0435\u0442\u0435 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0435\u043D \u043D\u043E\u043C\u0435\u0440', error: formErrors.phone, onChange: onInputChange }),
                    React.createElement(SelectInput, { id: 'appointmentTypeId', formData: formData.appointmentTypeId, options: getAppointmentTypeOptions(), label: 'Изберете процедура', placeholder: 'Изберете процедура', onChange: onSelectChange }),
                    React.createElement(TextInput, { id: 'comment', formData: formData.comment, label: '\u0414\u043E\u043F\u044A\u043B\u043D\u0438\u0442\u0435\u043B\u0435\u043D \u043A\u043E\u043C\u0435\u043D\u0442\u0430\u0440', placeholder: '\u0414\u043E\u0431\u0430\u0432\u0435\u0442\u0435 \u0434\u043E\u043F\u044A\u043B\u043D\u0438\u0442\u0435\u043B\u0435\u043D \u043A\u043E\u043C\u0435\u043D\u0442\u0430\u0440', error: formErrors.appointment, onChange: onInputChange }),
                    React.createElement("button", { className: "btn btn-primary mt-2 w-100", onClick: onFormSubmitClick }, "\u0417\u0430\u043F\u0430\u0437\u0438 \u0447\u0430\u0441")))));
};
export default AppointmentForm;
//# sourceMappingURL=appointmentForm.js.map