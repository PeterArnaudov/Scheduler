import { __awaiter, __generator } from "tslib";
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import Appointment from '../appointment/appointment';
import Loader from '../common/loader';
import { useAuth } from '../../contexts/authContext';
import DoctorEdit from './doctorEdit';
import { Button, Card, CardBody, CardImg, CardText, CardTitle, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
var Doctor = function (_a) {
    var _b;
    var doctorData = _a.doctorData, selectedAppointment = _a.selectedAppointment, onSelectDoctor = _a.onSelectDoctor, onDelete = _a.onDelete, onSelectAppointment = _a.onSelectAppointment;
    var navigate = useNavigate();
    var _c = useState(doctorData), doctor = _c[0], setDoctor = _c[1];
    var _d = useState(true), isLoading = _d[0], setIsLoading = _d[1];
    var _e = useState(false), isEditMode = _e[0], setIsEditMode = _e[1];
    var _f = useState(false), isConfirmationModalOpen = _f[0], setIsConfirmationModalOpen = _f[1];
    var user = useAuth().user;
    var doctorName = useParams().doctorName;
    var hasSelectedAppointment = selectedAppointment !== undefined && selectedAppointment !== null;
    var toggleConfirmationModal = function () {
        setIsConfirmationModalOpen(!isConfirmationModalOpen);
    };
    var onDeleteClick = function (doctor) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    toggleConfirmationModal();
                    setIsLoading(true);
                    if (!onDelete) return [3 /*break*/, 2];
                    return [4 /*yield*/, onDelete(doctor)];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    setIsLoading(false);
                    return [2 /*return*/];
            }
        });
    }); };
    useEffect(function () {
        // Fetch doctor data based on the name from the backend.
        var fetchDoctorData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, 4, 5]);
                        return [4 /*yield*/, fetch("/api/doctor/get/".concat(doctorName))];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        if (onSelectDoctor) {
                            onSelectDoctor(data);
                        }
                        return [3 /*break*/, 5];
                    case 3:
                        error_1 = _a.sent();
                        console.error('Error fetching doctor data:', error_1);
                        navigate('/doctors');
                        return [3 /*break*/, 5];
                    case 4:
                        setIsLoading(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        if (!doctor && doctorName) {
            // Fetch doctor data only if not already available and name is provided.
            fetchDoctorData();
        }
        else {
            setIsLoading(false);
        }
    }, [doctor, doctorName, navigate, onSelectDoctor]);
    return (React.createElement("div", { className: "col-sm-12 col-md-6 col-lg-4 p-2 ".concat(isLoading ? 'loading' : '') },
        !isEditMode &&
            React.createElement(Card, null,
                isLoading && React.createElement(Loader, null),
                React.createElement(CardBody, null,
                    (doctor === null || doctor === void 0 ? void 0 : doctor.image) &&
                        React.createElement(CardImg, { src: doctor.image, className: 'img-fluid', alt: 'doctor' }),
                    React.createElement(CardTitle, { className: 'h5' }, doctor === null || doctor === void 0 ? void 0 : doctor.name),
                    (doctor === null || doctor === void 0 ? void 0 : doctor.description) && React.createElement(CardText, null, doctor.description),
                    (!(doctor === null || doctor === void 0 ? void 0 : doctor.earliestAvailableAppointment) && onSelectAppointment) && (React.createElement("p", null, "\u041D\u044F\u043C\u0430 \u0441\u0432\u043E\u0431\u043E\u0434\u043D\u0438 \u0447\u0430\u0441\u043E\u0432\u0435.")),
                    hasSelectedAppointment && (React.createElement("div", null,
                        React.createElement("p", null, "\u0418\u0437\u0431\u0440\u0430\u043D \u0447\u0430\u0441:"),
                        React.createElement(Appointment, { appointment: selectedAppointment }))),
                    (!hasSelectedAppointment && (doctor === null || doctor === void 0 ? void 0 : doctor.earliestAvailableAppointment) && onSelectAppointment) && (React.createElement("div", null,
                        React.createElement("p", null, "\u041D\u0430\u0439-\u0440\u0430\u043D\u0435\u043D \u0447\u0430\u0441:"),
                        React.createElement(Appointment, { key: (_b = doctor === null || doctor === void 0 ? void 0 : doctor.earliestAvailableAppointment) === null || _b === void 0 ? void 0 : _b.id, appointment: doctor === null || doctor === void 0 ? void 0 : doctor.earliestAvailableAppointment, doctor: doctor, onSelectAppointment: onSelectAppointment }))),
                    onSelectDoctor && (React.createElement("button", { className: "btn btn-primary ".concat(!(doctor === null || doctor === void 0 ? void 0 : doctor.earliestAvailableAppointment) ? "disabled" : "", " mt-2 d-block"), onClick: function () { return onSelectDoctor(doctor); } }, "\u0418\u0437\u0431\u0435\u0440\u0438")),
                    (user === null || user === void 0 ? void 0 : user.isAdmin) && (React.createElement("div", null,
                        onDelete &&
                            React.createElement(Button, { className: 'mt-2 me-2 fw-bold', color: 'danger', onClick: toggleConfirmationModal }, "\u0418\u0437\u0442\u0440\u0438\u0439"),
                        React.createElement(Button, { className: 'mt-2 fw-bold', color: 'warning', onClick: function () { return setIsEditMode(true); } }, "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u0430\u0439"),
                        React.createElement(Modal, { isOpen: isConfirmationModalOpen, toggle: toggleConfirmationModal, centered: true },
                            React.createElement(ModalHeader, { toggle: toggleConfirmationModal }, "\u041F\u043E\u0442\u0432\u044A\u0440\u0436\u0434\u0435\u043D\u0438\u0435"),
                            React.createElement(ModalBody, null, "\u0421\u0438\u0433\u0443\u0440\u043D\u0438 \u043B\u0438 \u0441\u0442\u0435, \u0447\u0435 \u0438\u0441\u043A\u0430\u0442\u0435 \u0434\u0430 \u0438\u0437\u0442\u0440\u0438\u0435\u0442\u0435 \u0442\u043E\u0437\u0438 \u0437\u0430\u043F\u0438\u0441?"),
                            React.createElement(ModalFooter, null,
                                React.createElement(Button, { color: "danger", onClick: function () { return onDeleteClick(doctor); } }, "\u0418\u0437\u0442\u0440\u0438\u0439"),
                                React.createElement(Button, { color: "secondary", onClick: toggleConfirmationModal }, "\u041E\u0442\u043A\u0430\u0437"))))))),
        isEditMode && React.createElement(DoctorEdit, { doctor: doctor, setDoctor: setDoctor, setIsEditMode: setIsEditMode })));
};
export default Doctor;
//# sourceMappingURL=doctor.js.map