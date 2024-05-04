import { __assign, __awaiter, __generator } from "tslib";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Form } from "reactstrap";
import Loader from "../common/loader";
import appointmentService from "../../services/appointmentService";
import CheckboxInput from "../common/inputs/checkboxInput";
import DateTimeInput from "../common/inputs/dateTimeInput";
import SelectInput from "../common/inputs/selectInput";
import { handleSelectInputChange, isMultiValue } from "../../helpers/utils/reactSelectUtils";
import { handleInputChange } from "../../helpers/utils/inputUtils";
;
;
var AppointmentEdit = function (_a) {
    var _b, _c;
    var appointment = _a.appointment, doctors = _a.doctors, patients = _a.patients, appointmentTypes = _a.appointmentTypes, setAppointment = _a.setAppointment, setAppointments = _a.setAppointments, toggleEditMode = _a.toggleEditMode;
    var _d = useState(false), isLoading = _d[0], setIsLoading = _d[1];
    var _e = useState([]), doctorAppointmentTypes = _e[0], setDoctorAppointmentTypes = _e[1];
    var _f = useState({
        id: appointment.id,
        isFree: appointment.isFree,
        doctorId: appointment.doctor.id,
        patientId: (_b = appointment.patient) === null || _b === void 0 ? void 0 : _b.id,
        typeId: (_c = appointment.type) === null || _c === void 0 ? void 0 : _c.id,
        startDateTime: appointment.startDateTime,
        endDateTime: appointment.endDateTime,
    }), requestData = _f[0], setRequestData = _f[1];
    var _g = useState({}), formErrors = _g[0], setFormErrors = _g[1];
    useEffect(function () {
        var _a;
        if ((_a = appointment.doctor) === null || _a === void 0 ? void 0 : _a.id) {
            setDoctorAppointmentTypes(getDoctorAppointmentTypes(appointment.doctor.id));
        }
    }, []);
    var getDoctorOptions = function () {
        return doctors.map(function (doctor) { return ({
            value: doctor.id,
            label: doctor.name,
        }); });
    };
    var getPatientOptions = function () {
        return patients.map(function (patient) { return ({
            value: patient.id,
            label: "".concat(patient.name, " (").concat(patient.phone, ")"),
        }); });
    };
    var getDoctorAppointmentTypes = function (doctorId) {
        var filteredAppointmentTypes = appointmentTypes.filter(function (appointmentType) { return appointmentType.doctorId === doctorId || appointmentType.doctorId === undefined; });
        var mappedAppointments = filteredAppointmentTypes.map(function (appointmentType) { return ({
            value: appointmentType.id,
            label: appointmentType.name,
        }); });
        return mappedAppointments;
    };
    var onDoctorSelect = function (newValue, actionMeta) {
        if (isMultiValue(newValue)) {
            return;
        }
        else {
            setDoctorAppointmentTypes(getDoctorAppointmentTypes(newValue === null || newValue === void 0 ? void 0 : newValue.value));
        }
        onSelectChange(newValue, actionMeta);
    };
    var onSelectChange = function (newValue, actionMeta) {
        handleSelectInputChange(newValue, actionMeta, setRequestData);
    };
    var onInputChange = function (e, key) {
        handleInputChange(e, key, setRequestData, setFormErrors);
    };
    var validateForm = function () {
        var errors = {};
        if (!requestData.doctorId || requestData.doctorId === 0) {
            errors.doctor = "Моля, изберете доктор.";
        }
        if (!requestData.isFree && (!requestData.patientId || requestData.patientId === 0)) {
            errors.patient = 'Моля, изберете пациент.';
        }
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
                    setIsLoading(true);
                    requestData.id = appointment.id;
                    return [4 /*yield*/, appointmentService.editAppointmentAsync(requestData)];
                case 2:
                    result_1 = _a.sent();
                    if (result_1.success) {
                        setAppointment(function (prevAppointment) { return (__assign(__assign({}, prevAppointment), result_1.data)); });
                        setAppointments(function (prevAppointments) {
                            var updatedAppointment = result_1.data;
                            var updatedAppointments = prevAppointments.map(function (appointment) {
                                if (appointment.id === updatedAppointment.id) {
                                    // If the ID matches, replace the existing appointment with the updated one
                                    return updatedAppointment;
                                }
                                // For other appointments, return them unchanged
                                return appointment;
                            });
                            return updatedAppointments;
                        });
                        toggleEditMode();
                        toast.success("\u0423\u0441\u043F\u0435\u0448\u043D\u043E \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u0430 \u0441\u043B\u043E\u0442\u0430.", {
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
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement(Form, { className: "text-start ".concat(isLoading ? 'loading' : '') },
        isLoading && React.createElement(Loader, null),
        React.createElement(CheckboxInput, { id: 'isFree', formData: requestData.isFree, label: '\u0421\u0432\u043E\u0431\u043E\u0434\u0435\u043D \u0447\u0430\u0441', error: formErrors.isFree, onChange: onInputChange }),
        React.createElement(SelectInput, { id: 'doctorId', formData: requestData.doctorId, options: getDoctorOptions(), label: 'Доктор', placeholder: 'Изберете доктор', error: formErrors.doctor, onChange: onDoctorSelect }),
        React.createElement(SelectInput, { id: 'typeId', formData: requestData.typeId, options: doctorAppointmentTypes, label: 'Процедура', placeholder: 'Изберете процедура', onChange: onSelectChange }),
        React.createElement(SelectInput, { id: 'patientId', formData: requestData.patientId, options: getPatientOptions(), isDisabled: requestData.isFree, label: 'Пациент', placeholder: 'Изберете пациент', error: formErrors.patient, onChange: onSelectChange }),
        React.createElement(DateTimeInput, { id: 'startDateTime', formData: requestData.startDateTime, label: '\u041D\u0430\u0447\u0430\u043B\u043E', error: formErrors.startDateTime, onChange: onInputChange }),
        React.createElement(DateTimeInput, { id: 'endDateTime', formData: requestData.endDateTime, label: '\u041A\u0440\u0430\u0439', error: formErrors.endDateTime, onChange: onInputChange }),
        React.createElement("div", { className: "text-center" },
            React.createElement(Button, { color: "success col-5", className: "fw-bold m-1", onClick: onFormSubmitClick }, "\u0417\u0430\u043F\u0430\u0437\u0438"),
            React.createElement(Button, { color: "secondary", className: "fw-bold m-1 col-5", onClick: toggleEditMode }, "\u041E\u0442\u043A\u0430\u0436\u0438"))));
};
export default AppointmentEdit;
//# sourceMappingURL=appointmentEdit.js.map