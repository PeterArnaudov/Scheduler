import { __awaiter, __generator, __spreadArray } from "tslib";
import { Button, ButtonGroup, Card, CardBody, CardHeader, CardTitle, Form } from "reactstrap";
import Loader from "../common/loader";
import React, { useState } from "react";
import DateTimeInput from "../common/inputs/dateTimeInput";
import SelectInput from "../common/inputs/selectInput";
import NumberInput from "../common/inputs/numberInput";
import appointmentService from "../../services/appointmentService";
import { toast } from "react-toastify";
import { handleSelectInputChange } from "../../helpers/utils/reactSelectUtils";
import { handleInputChange } from "../../helpers/utils/inputUtils";
;
;
var AppointmentBulkManager = function (_a) {
    var doctorOptions = _a.doctorOptions, setAppointments = _a.setAppointments, onCancelClick = _a.onCancelClick, className = _a.className;
    var _b = useState(false), isLoading = _b[0], setIsLoading = _b[1];
    var _c = useState({
        startDateTime: new Date(),
        endDateTime: new Date(),
        duration: 60,
        interval: 15,
        doctors: doctorOptions.map(function (d) { return d.value; }),
        weekDays: [1, 2, 3, 4, 5]
    }), requestData = _c[0], setRequestData = _c[1];
    var _d = useState({}), formErrors = _d[0], setFormErrors = _d[1];
    var weekDayOptions = [
        { value: 0 /* Weekdays.Sunday */, label: 'Неделя' },
        { value: 1 /* Weekdays.Monday */, label: 'Понеделник' },
        { value: 2 /* Weekdays.Tuesday */, label: 'Вторник' },
        { value: 3 /* Weekdays.Wednesday */, label: 'Сряда' },
        { value: 4 /* Weekdays.Thursday */, label: 'Четвъртък' },
        { value: 5 /* Weekdays.Friday */, label: 'Петък' },
        { value: 6 /* Weekdays.Saturday */, label: 'Събота' },
    ];
    var onInputChange = function (e, key) {
        handleInputChange(e, key, setRequestData, setFormErrors);
    };
    var onSelectChange = function (newValue, actionMeta) {
        handleSelectInputChange(newValue, actionMeta, setRequestData);
    };
    var validateForm = function (operation) {
        var errors = {};
        if (!requestData.startDateTime) {
            errors.startDateTime = "Моля, попълнете начални дата и час.";
        }
        if (!requestData.endDateTime) {
            errors.endDateTime = "Моля, попълнете крайни дата и час.";
        }
        if (new Date(requestData.startDateTime) >= new Date(requestData.endDateTime)) {
            errors.startDateTime = "Моля, попълнете начални дата и час, които са преди крайните.";
            errors.endDateTime = "Моля, попълнете крайни дата и час, които са след началните.";
        }
        if (!requestData.weekDays || requestData.weekDays.length === 0) {
            errors.weekDays = "Моля, изберете дни от седмицата.";
        }
        if (operation === 'create') {
            if (!requestData.doctors || requestData.doctors.length === 0) {
                errors.doctors = "Моля, изберете доктор(и).";
            }
            if (!requestData.duration || requestData.duration === 0) {
                errors.duration = "Моля, попълнете продължителност.";
            }
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0; // Form is valid if there are no errors
    };
    var handleCreateClick = function () { return __awaiter(void 0, void 0, void 0, function () {
        var result_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!validateForm("create")) return [3 /*break*/, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    setIsLoading(true);
                    return [4 /*yield*/, appointmentService.bulkCreateAsync(requestData)];
                case 2:
                    result_1 = _a.sent();
                    if (result_1.success) {
                        setAppointments(function (prevAppointments) { return __spreadArray(__spreadArray([], prevAppointments, true), result_1.data, true); });
                        toast.success("\u0423\u0441\u043F\u0435\u0448\u043D\u043E \u0441\u044A\u0437\u0434\u0430\u0434\u043E\u0445\u0442\u0435 ".concat(result_1.data.length, " \u0437\u0430\u043F\u0438\u0441\u0430."), {
                            icon: '✅'
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
                    toast.error('Изникна грешка при обработването на резултата', {
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
    var handleDeleteClick = function () { return __awaiter(void 0, void 0, void 0, function () {
        var result_2, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!validateForm("delete")) return [3 /*break*/, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    setIsLoading(true);
                    return [4 /*yield*/, appointmentService.bulkDeleteAsync(requestData)];
                case 2:
                    result_2 = _a.sent();
                    if (result_2.success) {
                        setAppointments(function (prevAppointments) {
                            var updatedAppointments = prevAppointments.filter(function (x) { return !result_2.data.some(function (y) { return y.id === x.id; }); });
                            return updatedAppointments;
                        });
                        toast.success("\u0423\u0441\u043F\u0435\u0448\u043D\u043E \u0438\u0437\u0442\u0440\u0438\u0445\u0442\u0435 ".concat(result_2.data.length, " \u0437\u0430\u043F\u0438\u0441\u0430."), {
                            icon: '✅'
                        });
                    }
                    else {
                        toast.error(result_2.message, {
                            icon: '❌',
                        });
                    }
                    return [3 /*break*/, 5];
                case 3:
                    error_2 = _a.sent();
                    toast.error('Изникна грешка при обработването на резултата', {
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
    return (React.createElement(Card, { className: className },
        isLoading && React.createElement(Loader, null),
        React.createElement(CardHeader, null,
            React.createElement(CardTitle, { className: "h5" }, "\u0413\u0440\u0443\u043F\u043E\u0432\u043E \u0441\u044A\u0437\u0434\u0430\u0432\u0430\u043D\u0435/\u0438\u0437\u0442\u0440\u0438\u0432\u0430\u043D\u0435")),
        React.createElement(CardBody, null,
            React.createElement(Form, null,
                React.createElement(DateTimeInput, { id: 'startDateTime', formData: requestData.startDateTime, label: '\u041D\u0430\u0447\u0430\u043B\u043E', error: formErrors.startDateTime, onChange: onInputChange }),
                React.createElement(DateTimeInput, { id: 'endDateTime', formData: requestData.endDateTime, label: '\u041A\u0440\u0430\u0439', error: formErrors.endDateTime, onChange: onInputChange }),
                React.createElement(NumberInput, { id: 'duration', formData: requestData.duration, label: '\u041F\u0440\u043E\u0434\u044A\u043B\u0436\u0438\u0442\u0435\u043B\u043D\u043E\u0441\u0442 *', placeholder: '\u0418\u0437\u0431\u0435\u0440\u0435\u0442\u0435 \u043F\u0440\u043E\u0434\u044A\u043B\u0436\u0438\u0442\u0435\u043B\u043D\u043E\u0441\u0442 (\u0432 \u043C\u0438\u043D\u0443\u0442\u0438)', error: formErrors.duration, onChange: onInputChange }),
                React.createElement(NumberInput, { id: 'interval', formData: requestData.interval, label: '\u0418\u043D\u0442\u0435\u0440\u0432\u0430\u043B \u043C\u0435\u0436\u0434\u0443 \u0447\u0430\u0441\u043E\u0432\u0435 *', placeholder: '\u0418\u0437\u0431\u0435\u0440\u0435\u0442\u0435 \u0438\u043D\u0442\u0435\u0440\u0432\u0430\u043B \u043C\u0435\u0436\u0434\u0443 \u0447\u0430\u0441\u043E\u0432\u0435\u0442\u0435 (\u0432 \u043C\u0438\u043D\u0443\u0442\u0438)', error: formErrors.interval, onChange: onInputChange }),
                React.createElement(SelectInput, { id: 'doctors', formData: requestData.doctors, options: doctorOptions, label: '\u0414\u043E\u043A\u0442\u043E\u0440\u0438', placeholder: '\u0418\u0437\u0431\u0435\u0440\u0435\u0442\u0435 \u0434\u043E\u043A\u0442\u043E\u0440\u0438', isMulti: true, error: formErrors.doctors, onChange: onSelectChange }),
                React.createElement(SelectInput, { id: 'weekDays', formData: requestData.weekDays, options: weekDayOptions, label: '\u0414\u043D\u0438 \u043E\u0442 \u0441\u0435\u0434\u043C\u0438\u0446\u0430\u0442\u0430', placeholder: '\u0418\u0437\u0431\u0435\u0440\u0435\u0442\u0435 \u0434\u043D\u0438 \u043E\u0442 \u0441\u0435\u0434\u043C\u0438\u0446\u0430\u0442\u0430', isMulti: true, error: formErrors.weekDays, onChange: onSelectChange }),
                React.createElement("p", null, "* \u0412\u0437\u0438\u043C\u0430 \u0441\u0435 \u043F\u0440\u0435\u0434\u0432\u0438\u0434 \u0441\u0430\u043C\u043E \u043F\u0440\u0438 \u0441\u044A\u0437\u0434\u0430\u0432\u0430\u043D\u0435.")),
            React.createElement(ButtonGroup, { className: "gap-1 d-block" },
                React.createElement(Button, { color: "success", onClick: handleCreateClick }, "\u0421\u044A\u0437\u0434\u0430\u0439"),
                React.createElement(Button, { color: "danger", onClick: handleDeleteClick }, "\u0418\u0437\u0442\u0440\u0438\u0439"),
                React.createElement(Button, { color: "secondary", onClick: onCancelClick }, "\u041E\u0442\u043A\u0430\u0436\u0438")))));
};
export default AppointmentBulkManager;
//# sourceMappingURL=appointmentBulkManager.js.map