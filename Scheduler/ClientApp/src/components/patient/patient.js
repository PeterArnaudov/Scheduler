import { __awaiter, __generator } from "tslib";
import React, { useState } from "react";
import { Button, Card, CardBody, CardText, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import PatientEdit from "./patientEdit";
import Loader from "../common/loader";
import PatientDetails from "./patientDetails";
;
var Patient = function (_a) {
    var patient = _a.patient, onEditPatient = _a.onEditPatient, onDeletePatient = _a.onDeletePatient;
    var _b = useState(false), isLoading = _b[0], setIsLoading = _b[1];
    var _c = useState(false), isEditMode = _c[0], setIsEditMode = _c[1];
    var _d = useState(false), appointmentsDisplayed = _d[0], setAppointmentsDisplayed = _d[1];
    var _e = useState(false), isConfirmationModalOpen = _e[0], setIsConfirmationModalOpen = _e[1];
    var toggleEditMode = function () {
        setIsEditMode(!isEditMode);
    };
    var toggleAppointmentsDisplayed = function () {
        setAppointmentsDisplayed(!appointmentsDisplayed);
    };
    var toggleConfirmationModal = function () {
        setIsConfirmationModalOpen(!isConfirmationModalOpen);
    };
    var handleDelete = (function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    toggleConfirmationModal();
                    setIsLoading(true);
                    return [4 /*yield*/, onDeletePatient(patient)];
                case 1:
                    _a.sent();
                    setIsLoading(false);
                    return [2 /*return*/];
            }
        });
    }); });
    return (React.createElement(Card, { className: "mb-2 ".concat(isLoading ? 'loading' : '') },
        isLoading && React.createElement(Loader, null),
        React.createElement(CardBody, { className: "text-center" },
            React.createElement("div", { className: "row" },
                React.createElement(CardText, { className: "col-12 col-sm-3 col-md-4" }, patient.name),
                React.createElement(CardText, { className: "col-12 col-sm-3 col-md-4" }, patient.phone),
                React.createElement(CardText, { className: "col-12 col-sm-6 col-md-4" }, patient.email)),
            React.createElement("div", null,
                React.createElement(Button, { color: "".concat(appointmentsDisplayed ? "secondary" : "primary"), className: "fw-bold m-1 col-12 col-sm-3 col-lg-2", onClick: toggleAppointmentsDisplayed }, appointmentsDisplayed ? "Скрий" : "Процедури"),
                React.createElement(Button, { color: "".concat(isEditMode ? "secondary" : "warning"), className: "fw-bold m-1 col-12 col-sm-3 col-lg-2", onClick: toggleEditMode }, isEditMode ? "Откажи" : "Редактирай"),
                React.createElement(Button, { color: "danger fw-bold m-1 col-12 col-sm-3 col-lg-2", onClick: toggleConfirmationModal }, "\u0418\u0437\u0442\u0440\u0438\u0439"),
                React.createElement(Modal, { isOpen: isConfirmationModalOpen, toggle: toggleConfirmationModal, centered: true },
                    React.createElement(ModalHeader, { toggle: toggleConfirmationModal }, "\u041F\u043E\u0442\u0432\u044A\u0440\u0436\u0434\u0435\u043D\u0438\u0435"),
                    React.createElement(ModalBody, null, "\u0421\u0438\u0433\u0443\u0440\u043D\u0438 \u043B\u0438 \u0441\u0442\u0435, \u0447\u0435 \u0438\u0441\u043A\u0430\u0442\u0435 \u0434\u0430 \u0438\u0437\u0442\u0440\u0438\u0435\u0442\u0435 \u0442\u043E\u0437\u0438 \u0437\u0430\u043F\u0438\u0441?"),
                    React.createElement(ModalFooter, null,
                        React.createElement(Button, { color: "danger", onClick: handleDelete }, "\u0418\u0437\u0442\u0440\u0438\u0439"),
                        React.createElement(Button, { color: "secondary", onClick: toggleConfirmationModal }, "\u041E\u0442\u043A\u0430\u0437")))),
            isEditMode &&
                React.createElement("div", { className: "mt-4" },
                    React.createElement(PatientEdit, { patient: patient, toggleEditMode: toggleEditMode, onEditPatient: onEditPatient })),
            appointmentsDisplayed &&
                React.createElement("div", { className: "mt-4" },
                    React.createElement(PatientDetails, { patient: patient })))));
};
export default Patient;
//# sourceMappingURL=patient.js.map