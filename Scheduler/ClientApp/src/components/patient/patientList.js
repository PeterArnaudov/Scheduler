import React from "react";
import Patient from "./patient";
var PatientList = function (_a) {
    var patients = _a.patients, onEditPatient = _a.onEditPatient, onDeletePatient = _a.onDeletePatient;
    return (React.createElement("div", null,
        (patients && (patients === null || patients === void 0 ? void 0 : patients.length) > 0) &&
            patients.map(function (patient) { return (React.createElement(Patient, { key: patient.id, patient: patient, onEditPatient: onEditPatient, onDeletePatient: onDeletePatient })); }),
        (!patients || (patients === null || patients === void 0 ? void 0 : patients.length) === 0) &&
            React.createElement("p", { className: "text-center" }, "\u041D\u044F\u043C\u0430 \u0440\u0435\u0437\u0443\u043B\u0442\u0430\u0442\u0438.")));
};
export default PatientList;
//# sourceMappingURL=patientList.js.map