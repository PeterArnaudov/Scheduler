import { __awaiter, __generator } from "tslib";
import React, { useEffect, useState } from "react";
import patientService from "../../services/patientService";
import { toast } from "react-toastify";
import PatientList from "./patientList";
import Loader from "../common/loader";
import FilterContainer from "../common/filters/filterContainer";
import TextFilter from "../common/filters/textFilter";
var PatientContainer = function () {
    var _a = useState(false), isLoading = _a[0], setIsLoading = _a[1];
    var _b = useState([]), patients = _b[0], setPatients = _b[1];
    var _c = useState({}), filterData = _c[0], setFilterData = _c[1];
    useEffect(function () {
        var populatePatientData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        setIsLoading(true);
                        return [4 /*yield*/, patientService.searchAsync(filterData)];
                    case 1:
                        result = _a.sent();
                        setPatients(result.data);
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
        populatePatientData();
    }, [filterData]);
    var updateFilterData = function (updatedFilterData) {
        setFilterData(updatedFilterData);
    };
    var handleEditPatient = function (editedPatient) { return __awaiter(void 0, void 0, void 0, function () {
        var result_1, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, patientService.editPatientAsync(editedPatient)];
                case 1:
                    result_1 = _a.sent();
                    if (result_1.success) {
                        setPatients(function (prevPatients) {
                            return prevPatients.map(function (patient) {
                                return patient.id === editedPatient.id ? result_1.data : patient;
                            });
                        });
                        toast.success("\u0423\u0441\u043F\u0435\u0448\u043D\u043E \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u0430\u0445\u0442\u0435 ".concat(editedPatient.name, "."), {
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
                    error_2 = _a.sent();
                    toast.error('Изникна грешка при обработването на резултата', {
                        icon: '❌',
                    });
                    return [2 /*return*/, false];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var handleDeletePatient = function (deletedPatient) { return __awaiter(void 0, void 0, void 0, function () {
        var result, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, patientService.deletePatientAsync(deletedPatient.id)];
                case 1:
                    result = _a.sent();
                    if (result.success) {
                        setPatients(function (prevPatients) {
                            var updatedPatients = prevPatients.filter(function (x) { return x.id !== deletedPatient.id; });
                            return updatedPatients;
                        });
                        toast.success("\u0423\u0441\u043F\u0435\u0448\u043D\u043E \u0438\u0437\u0442\u0440\u0438\u0445\u0442\u0435 ".concat(deletedPatient.name, "."), {
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
                    error_3 = _a.sent();
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
        React.createElement(FilterContainer, { className: 'mb-2 row', initialFilterData: filterData, updateFilterData: updateFilterData },
            React.createElement(TextFilter, { className: 'col-12 col-lg-6', name: 'query', label: '\u0418\u043C\u0435, email \u0438\u043B\u0438 \u0442\u0435\u043B. \u043D\u043E\u043C\u0435\u0440', placeholder: '\u0412\u044A\u0432\u0435\u0434\u0435\u0442\u0435 \u0438\u043C\u0435, email \u0438\u043B\u0438 \u0442\u0435\u043B. \u043D\u043E\u043C\u0435\u0440' })),
        React.createElement("hr", null),
        React.createElement(PatientList, { patients: patients, onEditPatient: handleEditPatient, onDeletePatient: handleDeletePatient })));
};
export default PatientContainer;
//# sourceMappingURL=patientContainer.js.map