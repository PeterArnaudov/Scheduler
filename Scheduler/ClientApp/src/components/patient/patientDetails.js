import { __awaiter, __generator } from "tslib";
import React, { useEffect, useState } from "react";
import Loader from "../common/loader";
import AppointmentTable from "../appointment/appointmentTable";
import appointmentService from "../../services/appointmentService";
;
var PatientDetails = function (_a) {
    var patient = _a.patient;
    var _b = useState([]), appointments = _b[0], setAppointments = _b[1];
    var _c = useState(true), isLoading = _c[0], setIsLoading = _c[1];
    useEffect(function () {
        var populateAppointmentData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var request, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        setIsLoading(true);
                        request = {
                            free: false,
                            occupied: true,
                            patients: [patient.id]
                        };
                        return [4 /*yield*/, appointmentService.searchAsync(request)];
                    case 1:
                        result = _a.sent();
                        setAppointments(result.data);
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
        populateAppointmentData();
    }, []);
    return (React.createElement("div", { className: "".concat(isLoading ? 'loading' : '') },
        isLoading && React.createElement(Loader, null),
        appointments.length > 0 && React.createElement(AppointmentTable, { appointments: appointments }),
        appointments.length <= 0 && React.createElement("p", null, "\u041F\u0430\u0446\u0438\u0435\u043D\u0442\u044A\u0442 \u043D\u0435 \u0435 \u0437\u0430\u043F\u0430\u0437\u0432\u0430\u043B \u0447\u0430\u0441\u043E\u0432\u0435 \u043A\u044A\u043C \u043C\u043E\u043C\u0435\u043D\u0442\u0430.")));
};
export default PatientDetails;
//# sourceMappingURL=patientDetails.js.map