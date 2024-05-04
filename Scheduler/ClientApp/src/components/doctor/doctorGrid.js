import { __awaiter, __generator, __spreadArray } from "tslib";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "reactstrap";
import doctorService from "../../services/doctorService";
import { useAuth } from "../../contexts/authContext";
import Loader from "../common/loader";
import DoctorCreate from "./doctorCreate";
import Doctor from "./doctor";
;
var DoctorGrid = function (_a) {
    var onSelectDoctor = _a.onSelectDoctor, onSelectAppointment = _a.onSelectAppointment, fetchDoctors = _a.fetchDoctors;
    var user = useAuth().user;
    var clinicName = useParams().clinicName;
    var _b = useState([]), doctors = _b[0], setDoctors = _b[1];
    var _c = useState(false), isLoading = _c[0], setIsLoading = _c[1];
    var _d = useState(false), isCreateOpen = _d[0], setIsCreateOpen = _d[1];
    useEffect(function () {
        var populateDoctorData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        setIsLoading(true);
                        return [4 /*yield*/, fetchDoctors(clinicName)];
                    case 1:
                        result = _a.sent();
                        setDoctors(result.data);
                        return [3 /*break*/, 4];
                    case 2:
                        error_1 = _a.sent();
                        console.error('Error fetching doctor data:', error_1);
                        return [3 /*break*/, 4];
                    case 3:
                        setIsLoading(false);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        populateDoctorData();
    }, []);
    var toggleCreateOpen = function () {
        setIsCreateOpen(!isCreateOpen);
    };
    var addDoctor = function (doctor) {
        setDoctors(function (prevDoctors) { return __spreadArray(__spreadArray([], prevDoctors, true), [doctor], false); });
    };
    var onDelete = function (doctor) { return __awaiter(void 0, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, doctorService.deleteDoctorAsync(doctor.id)];
                case 1:
                    _a.sent();
                    setDoctors(function (prevDoctors) {
                        var updatedAppointments = prevDoctors.filter(function (x) { return x.id !== doctor.id; });
                        return updatedAppointments;
                    });
                    toast.success("\u0423\u0441\u043F\u0435\u0448\u043D\u043E \u0438\u0437\u0442\u0440\u0438 ".concat(doctor.name, "."), {
                        icon: '✅'
                    });
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
    return (React.createElement("div", { className: "row ".concat(isLoading ? 'loading' : '') },
        isLoading && React.createElement(Loader, null),
        (user === null || user === void 0 ? void 0 : user.isAdmin) && (React.createElement("span", null,
            React.createElement(Button, { className: "mb-2 w-100", color: !isCreateOpen ? "success" : "secondary", onClick: toggleCreateOpen }, !isCreateOpen ? "Създаване" : "Откажи"),
            isCreateOpen &&
                React.createElement(DoctorCreate, { onDoctorCreate: addDoctor, onCancelClick: toggleCreateOpen }))),
        doctors.length > 0 && doctors.map(function (doctor) {
            return React.createElement(Doctor, { key: doctor.id, doctorData: doctor, onSelectDoctor: onSelectDoctor, onSelectAppointment: onSelectAppointment, onDelete: onDelete });
        }),
        (!isLoading && doctors.length === 0) &&
            React.createElement("p", null, "\u041D\u044F\u043C\u0430\u043C\u0435 \u043D\u0430\u043B\u0438\u0447\u043D\u0438 \u043B\u0435\u043A\u0430\u0440\u0438 \u043A\u044A\u043C \u0442\u043E\u0437\u0438 \u043C\u043E\u043C\u0435\u043D\u0442.")));
};
export default DoctorGrid;
//# sourceMappingURL=doctorGrid.js.map