import { __awaiter, __generator } from "tslib";
import React, { useState } from "react";
import { Button, ButtonGroup, Card, CardBody, CardText, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Loader from "../common/loader";
import { extractHour } from "../../helpers/formatters/dateFormatter";
import AppointmentEdit from "./appointmentEdit";
;
var AppointmentDetails = function (_a) {
    var _b, _c, _d, _e, _f, _g;
    var appointment = _a.appointment, doctors = _a.doctors, patients = _a.patients, appointmentTypes = _a.appointmentTypes, setAppointment = _a.setAppointment, setAppointments = _a.setAppointments, onDelete = _a.onDelete;
    var _h = useState(false), isLoading = _h[0], setIsLoading = _h[1];
    var _j = useState(false), isEditMode = _j[0], setIsEditMode = _j[1];
    var _k = useState(false), isConfirmationModalOpen = _k[0], setIsConfirmationModalOpen = _k[1];
    var toggleEditMode = function () {
        setIsEditMode(!isEditMode);
    };
    var toggleConfirmationModal = function () {
        setIsConfirmationModalOpen(!isConfirmationModalOpen);
    };
    var onDeleteClick = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    toggleConfirmationModal();
                    setIsLoading(true);
                    return [4 /*yield*/, onDelete(appointment)];
                case 1:
                    _a.sent();
                    setIsLoading(false);
                    return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement(Card, { className: "".concat((appointment === null || appointment === void 0 ? void 0 : appointment.isFree) ? 'border-success' : 'border-danger', " ").concat(isLoading ? 'loading' : '') },
        isLoading && React.createElement(Loader, null),
        React.createElement(CardBody, null,
            React.createElement("div", { className: "row text-center" },
                React.createElement(CardText, { className: "col-8 col-sm-12 col-lg-8" }, (_b = appointment === null || appointment === void 0 ? void 0 : appointment.doctor) === null || _b === void 0 ? void 0 : _b.name),
                React.createElement(CardText, { className: "col-4 col-sm-12 col-lg-4" }, extractHour(appointment === null || appointment === void 0 ? void 0 : appointment.startDateTime)),
                (((_c = appointment === null || appointment === void 0 ? void 0 : appointment.patient) === null || _c === void 0 ? void 0 : _c.name) && ((_d = appointment === null || appointment === void 0 ? void 0 : appointment.patient) === null || _d === void 0 ? void 0 : _d.phone)) &&
                    React.createElement(CardText, { className: "col-12" }, (_e = appointment === null || appointment === void 0 ? void 0 : appointment.patient) === null || _e === void 0 ? void 0 :
                        _e.name,
                        " (", (_f = appointment === null || appointment === void 0 ? void 0 : appointment.patient) === null || _f === void 0 ? void 0 :
                        _f.phone,
                        ")"),
                appointment.type &&
                    React.createElement(CardText, { className: "col-12" }, (_g = appointment === null || appointment === void 0 ? void 0 : appointment.type) === null || _g === void 0 ? void 0 : _g.name),
                React.createElement("div", { className: "col-12" },
                    React.createElement(ButtonGroup, { className: "gap-1" },
                        React.createElement(Button, { color: "".concat(isEditMode ? "secondary" : "warning"), className: "fw-bold", onClick: toggleEditMode }, isEditMode ? "Откажи" : "Редактирай"),
                        React.createElement(Button, { color: "danger fw-bold", onClick: toggleConfirmationModal }, "\u0418\u0437\u0442\u0440\u0438\u0439"))),
                isEditMode &&
                    React.createElement("div", { className: "mt-4" },
                        React.createElement(AppointmentEdit, { appointment: appointment, doctors: doctors, patients: patients, appointmentTypes: appointmentTypes, setAppointment: setAppointment, setAppointments: setAppointments, toggleEditMode: toggleEditMode })))),
        React.createElement(Modal, { isOpen: isConfirmationModalOpen, toggle: toggleConfirmationModal, centered: true },
            React.createElement(ModalHeader, { toggle: toggleConfirmationModal }, "\u041F\u043E\u0442\u0432\u044A\u0440\u0436\u0434\u0435\u043D\u0438\u0435"),
            React.createElement(ModalBody, null, "\u0421\u0438\u0433\u0443\u0440\u043D\u0438 \u043B\u0438 \u0441\u0442\u0435, \u0447\u0435 \u0438\u0441\u043A\u0430\u0442\u0435 \u0434\u0430 \u0438\u0437\u0442\u0440\u0438\u0435\u0442\u0435 \u0442\u043E\u0437\u0438 \u0437\u0430\u043F\u0438\u0441?"),
            React.createElement(ModalFooter, null,
                React.createElement(Button, { color: "danger", onClick: onDeleteClick }, "\u0418\u0437\u0442\u0440\u0438\u0439"),
                React.createElement(Button, { color: "secondary", onClick: toggleConfirmationModal }, "\u041E\u0442\u043A\u0430\u0437")))));
};
export default AppointmentDetails;
//# sourceMappingURL=appointmentDetails.js.map