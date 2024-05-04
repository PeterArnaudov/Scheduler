import { __awaiter, __generator } from "tslib";
import React, { useEffect, useState } from "react";
import { extractDate, formatAppointmentDate } from "../../helpers/formatters/dateFormatter";
import Appointment from "./appointment";
import { toast } from "react-toastify";
import appointmentService from "../../services/appointmentService";
import Loader from "../common/loader";
var AppointmentList = function (_a) {
    var doctorName = _a.doctorName, onSelectAppointment = _a.onSelectAppointment;
    var _b = useState(false), isLoading = _b[0], setIsLoading = _b[1];
    var _c = useState([]), appointments = _c[0], setAppointments = _c[1];
    var _d = useState(0), scrollIndex = _d[0], setScrollIndex = _d[1];
    useEffect(function () {
        var fetchAppointmentData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        return [4 /*yield*/, appointmentService.getAvailableAsync(doctorName)];
                    case 1:
                        result = _a.sent();
                        if (result.success) {
                            setAppointments(result.data);
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        error_1 = _a.sent();
                        console.error('Error fetching appointment data:', error_1);
                        return [3 /*break*/, 4];
                    case 3:
                        setIsLoading(false);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        setIsLoading(true);
        fetchAppointmentData();
    }, [doctorName]);
    var hasAppointments = (appointments === null || appointments === void 0 ? void 0 : appointments.length) > 0;
    var groupAppointmentsByDay = function (appointments) {
        return appointments.reduce(function (grouped, appointment) {
            var day = extractDate(appointment.startDateTime);
            grouped[day] = grouped[day] || [];
            grouped[day].push(appointment);
            return grouped;
        }, {});
    };
    var groupedAppointments = Object.entries(groupAppointmentsByDay(appointments));
    var visibleAppointments = groupedAppointments.slice(scrollIndex, scrollIndex + 3);
    var handleScroll = function (direction) {
        var newIndex = direction === "left" ? scrollIndex - 3 : scrollIndex + 3;
        setScrollIndex(Math.max(0, Math.min(groupedAppointments.length - 3, newIndex)));
    };
    var onDelete = function (appointment) { return __awaiter(void 0, void 0, void 0, function () {
        var result, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, appointmentService.deleteAppointmentAsync(appointment.id)];
                case 1:
                    result = _a.sent();
                    if (result.success) {
                        setAppointments(function (prevAppointments) {
                            var updatedAppointments = prevAppointments.filter(function (x) { return x.id !== appointment.id; });
                            return updatedAppointments;
                        });
                        toast.success("\u0423\u0441\u043F\u0435\u0448\u043D\u043E \u0438\u0437\u0442\u0440\u0438 ".concat(formatAppointmentDate(appointment.startDateTime), "."), {
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
                    error_2 = _a.sent();
                    toast.error('Изникна грешка при обработването на резултата', {
                        icon: '❌',
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement("div", { className: "".concat(isLoading ? 'loading' : '') },
        isLoading && React.createElement(Loader, null),
        (!isLoading && !hasAppointments) &&
            React.createElement("p", null, "\u041D\u044F\u043C\u0430 \u0441\u0432\u043E\u0431\u043E\u0434\u043D\u0438 \u0447\u0430\u0441\u043E\u0432\u0435 \u0437\u0430 \u0438\u0437\u0431\u0440\u0430\u043D\u0438\u044F\u0442 \u043B\u0435\u043A\u0430\u0440."),
        (!isLoading && hasAppointments) &&
            React.createElement(React.Fragment, null,
                React.createElement("p", null, "\u0421\u0432\u043E\u0431\u043E\u0434\u043D\u0438 \u0447\u0430\u0441\u043E\u0432\u0435"),
                React.createElement("div", { className: "row mb-2" },
                    React.createElement("div", { className: "col-6 text-start" },
                        React.createElement("button", { className: "btn btn-primary", onClick: function () { return handleScroll("left"); }, disabled: scrollIndex === 0 }, "<")),
                    React.createElement("div", { className: "col-6 text-end" },
                        React.createElement("button", { className: "btn btn-primary", onClick: function () { return handleScroll("right"); }, disabled: scrollIndex >= groupedAppointments.length - 3 }, ">"))),
                React.createElement("div", { className: "row" }, visibleAppointments.map(function (_a) {
                    var day = _a[0];
                    return (React.createElement("div", { key: day, className: "col-4 text-center" },
                        React.createElement("p", { className: "fw-bold" }, day)));
                })),
                React.createElement("div", { className: "row" }, visibleAppointments.map(function (_a) {
                    var day = _a[0], appointments = _a[1];
                    return (React.createElement("div", { key: day, className: "col-4 text-center" }, appointments.map(function (appointment) { return (React.createElement("span", { key: appointment.id, className: "d-block p-1" },
                        React.createElement(Appointment, { appointment: appointment, isShortFormat: true, onSelectAppointment: onSelectAppointment, onDelete: onDelete }))); })));
                })))));
};
export default AppointmentList;
//# sourceMappingURL=appointmentList.js.map