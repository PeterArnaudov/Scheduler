import { __assign, __awaiter, __generator } from "tslib";
import React, { useEffect, useState } from "react";
import appointmentService from "../../services/appointmentService";
import dayjs from "dayjs";
import timezone from 'dayjs/plugin/timezone';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'dayjs/locale/bg';
import Loader from "../common/loader";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import AppointmentDetails from "./appointmentDetails";
import Legend from "../common/legend";
import FilterContainer from "../common/filters/filterContainer";
import CheckboxFilter from "../common/filters/checkboxFilter";
import MultiSelectFilter from "../common/filters/multiSelectFilter";
import doctorService from "../../services/doctorService";
import appointmentTypeService from "../../services/appointmentTypeService";
import { toast } from "react-toastify";
import patientService from "../../services/patientService";
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import { extractHour, formatDateTimeLocal } from "../../helpers/formatters/dateFormatter";
import DateFilter from "../common/filters/dateFilter";
import AppointmentBulkManager from "./appointmentBulkManager";
import { Calendar, Views, dayjsLocalizer } from "react-big-calendar";
;
dayjs.locale('bg');
dayjs.extend(timezone);
var localizer = dayjsLocalizer(dayjs);
var DragAndDropCalendar = withDragAndDrop(Calendar);
var AppointmentSchedule = function () {
    var today = new Date();
    var oneMonthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    var oneMonthLater = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
    var _a = useState([]), appointments = _a[0], setAppointments = _a[1];
    var _b = useState([]), doctors = _b[0], setDoctors = _b[1];
    var _c = useState([]), appointmentTypes = _c[0], setAppointmentTypes = _c[1];
    var _d = useState([]), patients = _d[0], setPatients = _d[1];
    var _e = useState(), selectedAppointment = _e[0], setSelectedAppointment = _e[1];
    var _f = useState(false), isLoading = _f[0], setIsLoading = _f[1];
    var _g = useState(false), isModelOpen = _g[0], setIsModelOpen = _g[1];
    var _h = useState(false), isBulkManagerOpen = _h[0], setIsBulkManagerOpen = _h[1];
    var _j = useState(false), isFilteringOpen = _j[0], setIsFilteringOpen = _j[1];
    var _k = useState({
        free: true,
        occupied: true,
        startDateTime: new Date(formatDateTimeLocal(oneMonthAgo)),
        endDateTime: new Date(formatDateTimeLocal(oneMonthLater))
    }), filterData = _k[0], setFilterData = _k[1];
    useEffect(function () {
        var populateAppointmentData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        setIsLoading(true);
                        return [4 /*yield*/, appointmentService.searchAsync(filterData)];
                    case 1:
                        result = _a.sent();
                        setAppointments(result.data);
                        return [3 /*break*/, 4];
                    case 2:
                        error_1 = _a.sent();
                        console.error('Error fetching schedule data:', error_1);
                        return [3 /*break*/, 4];
                    case 3:
                        setIsLoading(false);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        populateAppointmentData();
    }, [filterData]);
    useEffect(function () {
        var populateDoctorData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        setIsLoading(true);
                        return [4 /*yield*/, doctorService.getDoctorsAsync()];
                    case 1:
                        result = _a.sent();
                        setDoctors(result.data);
                        return [3 /*break*/, 4];
                    case 2:
                        error_2 = _a.sent();
                        console.error('Error fetching doctor data:', error_2);
                        return [3 /*break*/, 4];
                    case 3:
                        setIsLoading(false);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        var populateAppointmentTypeData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, appointmentTypeService.getAppointmentTypesAsync()];
                    case 1:
                        result = _a.sent();
                        setAppointmentTypes(result.data);
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        console.error('Error fetching appointment types data.');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        var populatePatientData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var result, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, patientService.searchAsync()];
                    case 1:
                        result = _a.sent();
                        setPatients(result.data);
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        console.error('Error fetching appointment types data.');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        populateDoctorData();
        populateAppointmentTypeData();
        populatePatientData();
    }, []);
    var toggleModal = function () {
        setIsModelOpen(!isModelOpen);
    };
    var toggleBulkManagerOpen = function () {
        setIsBulkManagerOpen(!isBulkManagerOpen);
    };
    var toggleFilteringOpen = function () {
        setIsFilteringOpen(!isFilteringOpen);
    };
    var getDoctorMultiSelectOptions = function () {
        return doctors.map(function (doctor) { return ({
            value: doctor === null || doctor === void 0 ? void 0 : doctor.id,
            label: doctor === null || doctor === void 0 ? void 0 : doctor.name,
            color: doctor === null || doctor === void 0 ? void 0 : doctor.color,
        }); });
    };
    var getDoctorLegendItems = function () {
        return doctors.map(function (doctor) { return ({
            text: doctor === null || doctor === void 0 ? void 0 : doctor.name,
            color: doctor === null || doctor === void 0 ? void 0 : doctor.color
        }); });
    };
    var events = appointments.map(function (appointment) {
        var _a, _b, _c;
        return ({
            title: "".concat(extractHour(appointment.startDateTime), " - ").concat(extractHour(appointment.endDateTime), "\n            ").concat(((_a = appointment.patient) === null || _a === void 0 ? void 0 : _a.name) ? (_b = appointment.patient) === null || _b === void 0 ? void 0 : _b.name : 'Свободен'),
            start: new Date(appointment.startDateTime),
            end: new Date(appointment.endDateTime),
            settings: {
                color: (_c = doctors.find(function (x) { var _a; return x.id === ((_a = appointment.doctor) === null || _a === void 0 ? void 0 : _a.id); })) === null || _c === void 0 ? void 0 : _c.color,
                borderColor: appointment.isFree ? 'green' : 'red',
            },
            appointment: appointment
        });
    });
    var eventPropGetter = function (event) {
        return {
            style: {
                backgroundColor: event.settings.color,
                border: "2px solid ".concat(event.settings.borderColor)
            },
        };
    };
    var handleSelect = function (id) {
        setSelectedAppointment(appointments.find(function (x) { return x.id === id; }));
        toggleModal();
    };
    var updateFilterData = function (updatedFilterData) {
        setFilterData(updatedFilterData);
    };
    var onDelete = function (appointment) { return __awaiter(void 0, void 0, void 0, function () {
        var result, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    setIsLoading(true);
                    return [4 /*yield*/, appointmentService.deleteAppointmentAsync(appointment.id)];
                case 1:
                    result = _a.sent();
                    if (result.success) {
                        setAppointments(function (prevAppointments) {
                            var updatedAppointments = prevAppointments.filter(function (x) { return x.id !== appointment.id; });
                            return updatedAppointments;
                        });
                        toast.success("\u0423\u0441\u043F\u0435\u0448\u043D\u043E \u0438\u0437\u0442\u0440\u0438 \u0437\u0430\u043F\u0438\u0441\u0430.", {
                            icon: '✅'
                        });
                        toggleModal();
                    }
                    else {
                        toast.error(result.message, {
                            icon: '❌',
                        });
                    }
                    return [3 /*break*/, 4];
                case 2:
                    error_5 = _a.sent();
                    toast.error('Изникна грешка при обработването на резултата', {
                        icon: '❌',
                    });
                    return [3 /*break*/, 4];
                case 3:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var moveEvent = function (args) { return __awaiter(void 0, void 0, void 0, function () {
        var eventArgs, formData, result_1;
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    eventArgs = args.event;
                    if (!(typeof (args.start) !== "string" && typeof (args.end) !== "string")) return [3 /*break*/, 2];
                    formData = __assign(__assign({}, eventArgs.appointment), { typeId: (_a = eventArgs.appointment.type) === null || _a === void 0 ? void 0 : _a.id, isFree: eventArgs.appointment.isFree, doctorId: (_b = eventArgs.appointment.doctor) === null || _b === void 0 ? void 0 : _b.id, patientId: (_c = eventArgs.appointment.patient) === null || _c === void 0 ? void 0 : _c.id, startDateTime: args.start, endDateTime: args.end });
                    return [4 /*yield*/, appointmentService.editAppointmentAsync(formData)];
                case 1:
                    result_1 = _d.sent();
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
                    _d.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); };
    var doctorSelectStyles = {
        control: function (provided, state) { return (__assign(__assign({}, provided), { backgroundColor: 'white', borderColor: state.isFocused ? 'blue' : 'gray', boxShadow: state.isFocused ? '0 0 0 1px blue' : 'none' })); },
        option: function (provided, state) {
            var color = state.data.color;
            return __assign(__assign(__assign({}, provided), (state.data.color
                ? state.isDisabled
                    ? undefined
                    : state.isSelected
                        ? state.data.color
                        : state.isFocused
                            ? { backgroundColor: "".concat(color, "33") }
                            : { backgroundColor: 'white' }
                : undefined)), { color: state.isDisabled
                    ? '#ccc'
                    : state.isSelected
                        ? 'red'
                            ? 'white'
                            : 'black'
                        : color, cursor: state.isDisabled ? 'not-allowed' : 'default', ':active': __assign(__assign({}, provided[':active']), (state.data.color
                    ? {
                        backgroundColor: !state.isDisabled
                            ? state.isSelected
                                ? color
                                : state.data.color + '4D'
                            : undefined
                    }
                    : undefined)) });
        },
        multiValue: function (provided, state) { return (__assign(__assign({}, provided), (state.data.color ? { backgroundColor: state.data.color + '33' } : undefined))); },
        multiValueLabel: function (provided) { return (__assign(__assign({}, provided), { color: 'black' })); },
        multiValueRemove: function (provided) { return (__assign(__assign({}, provided), { color: 'black', ':hover': {
                backgroundColor: 'red',
                color: 'white',
            } })); },
    };
    return (React.createElement("div", { className: "".concat(isLoading ? 'loading' : '') },
        isLoading && React.createElement(Loader, null),
        React.createElement("span", null,
            React.createElement(Button, { className: "mb-2 w-100", color: !isBulkManagerOpen ? "success" : "secondary", onClick: toggleBulkManagerOpen }, !isBulkManagerOpen ? "Създаване/Изтриване" : "Откажи"),
            isBulkManagerOpen &&
                React.createElement(AppointmentBulkManager, { className: 'mb-2', doctorOptions: getDoctorMultiSelectOptions(), setAppointments: setAppointments, onCancelClick: toggleBulkManagerOpen })),
        React.createElement("span", null,
            React.createElement(Button, { className: "mb-2 w-100", color: !isFilteringOpen ? "primary" : "secondary", onClick: toggleFilteringOpen }, !isFilteringOpen ? "Филтриране" : "Откажи"),
            isFilteringOpen &&
                React.createElement(FilterContainer, { className: "mb-2 mt-2", initialFilterData: filterData, updateFilterData: updateFilterData },
                    React.createElement(DateFilter, { className: 'd-inline-block col-12 col-lg-3', name: 'startDateTime', label: '\u041D\u0430\u0447\u0430\u043B\u043D\u0430 \u0434\u0430\u0442\u0430' }),
                    React.createElement(DateFilter, { className: 'd-inline-block col-12 col-lg-3', name: 'endDateTime', label: '\u041A\u0440\u0430\u0439\u043D\u0430 \u0434\u0430\u0442\u0430' }),
                    React.createElement(MultiSelectFilter, { className: 'col-12 col-lg-6 mb-2', options: getDoctorMultiSelectOptions(), name: 'doctors', label: '\u0414\u043E\u043A\u0442\u043E\u0440\u0438', customStyles: doctorSelectStyles }),
                    React.createElement(CheckboxFilter, { name: 'free', label: 'Свободни часове' }),
                    React.createElement(CheckboxFilter, { name: 'occupied', label: 'Заети часове' }))),
        React.createElement("hr", null),
        React.createElement("div", { className: "mb-2" },
            React.createElement(Legend, { items: getDoctorLegendItems() }),
            React.createElement(Legend, { items: [
                    {
                        text: 'Свободен час',
                        style: {
                            border: '2px solid green'
                        },
                    },
                    {
                        text: 'Зает час',
                        style: {
                            border: '2px solid red'
                        },
                    }
                ] })),
        React.createElement("hr", null),
        React.createElement(DragAndDropCalendar, { localizer: localizer, events: events, defaultView: Views.WEEK, dayLayoutAlgorithm: "no-overlap" // render option for overlapping events
            , min: new Date(2020, 1, 1, 6), max: new Date(9999, 1, 1, 23), length: 6, popup: true, eventPropGetter: eventPropGetter, onSelectEvent: function (event) { return handleSelect(event.appointment.id); }, onEventDrop: moveEvent, onEventResize: moveEvent, messages: {
                day: 'Ден',
                week: 'Седмица',
                month: 'Месец',
                previous: 'Назад',
                next: 'Напред',
                yesterday: 'Вчера',
                tomorrow: 'Утре',
                today: 'Днес',
                agenda: 'Седмичен ред',
                showMore: function (total) { return "+".concat(total, " \u043E\u0449\u0435"); }
            }, formats: {
                eventTimeRangeFormat: function () { return ''; },
                timeGutterFormat: function (date, culture, localizer) {
                    return localizer.format(date, 'HH:mm', culture);
                }
            } }),
        React.createElement(Modal, { isOpen: isModelOpen, toggle: toggleModal, centered: true },
            selectedAppointment &&
                React.createElement(React.Fragment, null,
                    React.createElement(ModalHeader, { toggle: toggleModal }, "\u0414\u0435\u0442\u0430\u0439\u043B\u0438"),
                    React.createElement(ModalBody, null,
                        React.createElement(AppointmentDetails, { appointment: selectedAppointment, doctors: doctors, appointmentTypes: appointmentTypes, patients: patients, setAppointment: setSelectedAppointment, setAppointments: setAppointments, onDelete: onDelete }))),
            !selectedAppointment &&
                React.createElement(React.Fragment, null,
                    React.createElement(ModalHeader, { toggle: toggleModal }, "\u0413\u0440\u0435\u0448\u043A\u0430"),
                    React.createElement(ModalBody, null,
                        React.createElement("p", null, "\u0412\u044A\u0437\u043D\u0438\u043A\u043D\u0430 \u0433\u0440\u0435\u0448\u043A\u0430 \u043F\u0440\u0438 \u0432\u0438\u0437\u0443\u0430\u043B\u0438\u0437\u0438\u0440\u0430\u043D\u0435\u0442\u043E \u043D\u0430 \u0438\u0437\u0431\u0440\u0430\u043D\u043E\u0442\u043E \u0441\u044A\u0431\u0438\u0442\u0438\u0435."))),
            React.createElement(ModalFooter, null,
                React.createElement(Button, { color: "secondary", onClick: toggleModal }, "\u0417\u0430\u0442\u0432\u043E\u0440\u0438")))));
};
export default AppointmentSchedule;
//# sourceMappingURL=appointmentSchedule.js.map