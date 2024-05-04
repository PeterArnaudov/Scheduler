import { __awaiter, __generator, __spreadArray } from "tslib";
import React, { useEffect, useState } from "react";
import appointmentTypeService from "../../services/appointmentTypeService";
import { toast } from "react-toastify";
import doctorService from "../../services/doctorService";
import { Button } from "reactstrap";
import AppointmentTypeCreate from "./appointmentTypeCreate";
import AppointmentTypeList from "./appointmenTypetList";
var AppointmentTypeContainer = function () {
    var _a = useState(false), isLoading = _a[0], setIsLoading = _a[1];
    var _b = useState([]), appointmentTypes = _b[0], setAppointmentTypes = _b[1];
    var _c = useState([]), doctorOptions = _c[0], setDoctorOptions = _c[1];
    var _d = useState(false), isCreateOpen = _d[0], setIsCreateOpen = _d[1];
    var toggleIsLoading = function () {
        setIsLoading(!isLoading);
    };
    var toggleCreateOpen = function () {
        setIsCreateOpen(!isCreateOpen);
    };
    useEffect(function () {
        var populateAppointmentTypeData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        toggleIsLoading();
                        return [4 /*yield*/, appointmentTypeService.getAppointmentTypesAsync()];
                    case 1:
                        result = _a.sent();
                        setAppointmentTypes(result.data);
                        return [3 /*break*/, 4];
                    case 2:
                        error_1 = _a.sent();
                        console.error('Error fetching appointment type data:', error_1);
                        return [3 /*break*/, 4];
                    case 3:
                        toggleIsLoading();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        var populateDoctorOptions = function () { return __awaiter(void 0, void 0, void 0, function () {
            var result, doctorOptions_1, defaultOption, options, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, doctorService.getDoctorsAsync()];
                    case 1:
                        result = _a.sent();
                        doctorOptions_1 = result.data.map(function (doctor) { return ({
                            value: doctor.id,
                            label: doctor.name,
                        }); });
                        defaultOption = {
                            value: undefined,
                            label: 'Всички'
                        };
                        options = __spreadArray([defaultOption], doctorOptions_1, true);
                        setDoctorOptions(options);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.error('Error fetching doctor data:', error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        populateAppointmentTypeData();
        populateDoctorOptions();
    }, []);
    var groupedAppointments = appointmentTypes.reduce(function (grouped, appointmentType) {
        var doctorId = appointmentType.doctorId || 0;
        grouped[doctorId] = grouped[doctorId] || [];
        grouped[doctorId].push(appointmentType);
        return grouped;
    }, {});
    var handleCreateAppointmentType = function (appointmentTypes) {
        setAppointmentTypes(function (prevAppointmentTypes) { return __spreadArray(__spreadArray([], prevAppointmentTypes, true), appointmentTypes, true); });
    };
    var handleEditAppointmentType = function (editedAppointmentType) { return __awaiter(void 0, void 0, void 0, function () {
        var result_1, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, appointmentTypeService.editAppointmentTypeAsync(editedAppointmentType)];
                case 1:
                    result_1 = _a.sent();
                    if (result_1.success) {
                        setAppointmentTypes(function (prevAppointmentTypes) {
                            return prevAppointmentTypes.map(function (appointmentType) {
                                return appointmentType.id === editedAppointmentType.id ? result_1.data : appointmentType;
                            });
                        });
                        toast.success("\u0423\u0441\u043F\u0435\u0448\u043D\u043E \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u0430\u0445\u0442\u0435 ".concat(editedAppointmentType.name, "."), {
                            icon: '✅'
                        });
                    }
                    else {
                        toast.error(result_1.message, {
                            icon: '❌',
                        });
                    }
                    return [2 /*return*/, result_1.success];
                case 2:
                    error_3 = _a.sent();
                    toast.error('Изникна грешка при обработването на резултата', {
                        icon: '❌',
                    });
                    return [2 /*return*/, false];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var handleDeleteAppointmentType = function (appointmentType) { return __awaiter(void 0, void 0, void 0, function () {
        var result, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, appointmentTypeService.deleteAppointmentTypeAsync(appointmentType.id)];
                case 1:
                    result = _a.sent();
                    if (result.success) {
                        setAppointmentTypes(function (prevAppointmentTypes) {
                            var updatedAppointmentTypes = prevAppointmentTypes.filter(function (x) { return x.id !== appointmentType.id; });
                            return updatedAppointmentTypes;
                        });
                        toast.success("\u0423\u0441\u043F\u0435\u0448\u043D\u043E \u0438\u0437\u0442\u0440\u0438\u0445\u0442\u0435 ".concat(appointmentType.name, "."), {
                            icon: '✅'
                        });
                    }
                    else {
                        toast.error(result.message, {
                            icon: '❌',
                        });
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    toast.error('Изникна грешка при обработването на резултата', {
                        icon: '❌',
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement(React.Fragment, null,
        React.createElement("span", null,
            React.createElement(Button, { className: "mb-2 w-100", color: !isCreateOpen ? "success" : "secondary", onClick: toggleCreateOpen }, !isCreateOpen ? "Създаване" : "Откажи"),
            isCreateOpen &&
                React.createElement(AppointmentTypeCreate, { onAppointmentTypeCreate: handleCreateAppointmentType, doctorOptions: doctorOptions, onCancelClick: toggleCreateOpen })),
        Object.entries(groupedAppointments).map(function (_a) {
            var _b, _c;
            var doctorId = _a[0], types = _a[1];
            return (React.createElement("div", { key: doctorId },
                React.createElement(AppointmentTypeList, { appointmentTypes: types, doctorName: (_c = (_b = doctorOptions.find(function (x) { return x.value === parseInt(doctorId); })) === null || _b === void 0 ? void 0 : _b.label) !== null && _c !== void 0 ? _c : 'Общи процедури', doctorOptions: doctorOptions, onEditAppointmentType: handleEditAppointmentType, onDeleteAppointmentType: handleDeleteAppointmentType })));
        })));
};
export default AppointmentTypeContainer;
//# sourceMappingURL=appointmentTypeContainer.js.map