import { __awaiter, __generator } from "tslib";
import 'tslib';
import authService from "../api-authorization/authorizeService";
import { convertUtcToLocal } from '../helpers/utils/dateUtils';
var doctorService = {
    getSummarizedDoctorsAsync: function (clinicId) { return __awaiter(void 0, void 0, void 0, function () {
        var response, result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("/api/doctor/summarized?clinicId=".concat(clinicId, "&clinicId=0"), {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    result = _a.sent();
                    result.data.forEach(function (doctor) {
                        if (doctor.earliestAvailableAppointment) {
                            doctor.earliestAvailableAppointment.startDateTime = convertUtcToLocal(doctor.earliestAvailableAppointment.startDateTime);
                            doctor.earliestAvailableAppointment.endDateTime = convertUtcToLocal(doctor.earliestAvailableAppointment.endDateTime);
                        }
                    });
                    return [2 /*return*/, result];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error during getSummarizedDoctorsAsync:', error_1);
                    throw new Error('An error occured during get operation.');
                case 4: return [2 /*return*/];
            }
        });
    }); },
    getDoctorsAsync: function () { return __awaiter(void 0, void 0, void 0, function () {
        var token, response, result, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, authService.getAccessToken()];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, fetch("/api/doctor/list", {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                                'Authorization': "Bearer ".concat(token)
                            },
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    result = _a.sent();
                    result.data.forEach(function (doctor) {
                        if (doctor.earliestAvailableAppointment) {
                            doctor.earliestAvailableAppointment.startDateTime = convertUtcToLocal(doctor.earliestAvailableAppointment.startDateTime);
                            doctor.earliestAvailableAppointment.endDateTime = convertUtcToLocal(doctor.earliestAvailableAppointment.endDateTime);
                        }
                    });
                    return [2 /*return*/, result];
                case 4:
                    error_2 = _a.sent();
                    console.error('Error during getDoctorsAsync:', error_2);
                    throw new Error('An error occured during get operation.');
                case 5: return [2 /*return*/];
            }
        });
    }); },
    getDoctorAsync: function (doctorName, clinicId) { return __awaiter(void 0, void 0, void 0, function () {
        var response, result, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("/api/doctor/single?doctorName=".concat(doctorName, "&clinicId=").concat(clinicId), {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    result = _a.sent();
                    return [2 /*return*/, result];
                case 3:
                    error_3 = _a.sent();
                    console.error('Error during getDoctorAsync:', error_3);
                    throw new Error('An error occured during get operation.');
                case 4: return [2 /*return*/];
            }
        });
    }); },
    createDoctorAsync: function (request) { return __awaiter(void 0, void 0, void 0, function () {
        var token, response, result, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, authService.getAccessToken()];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, fetch("/api/doctor", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                'Authorization': "Bearer ".concat(token)
                            },
                            body: JSON.stringify(request),
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    result = _a.sent();
                    if (result.data.earliestAvailableAppointment) {
                        result.data.earliestAvailableAppointment.startDateTime = convertUtcToLocal(result.data.earliestAvailableAppointment.startDateTime);
                        result.data.earliestAvailableAppointment.endDateTime = convertUtcToLocal(result.data.earliestAvailableAppointment.endDateTime);
                    }
                    return [2 /*return*/, result];
                case 4:
                    error_4 = _a.sent();
                    console.error('Error during createDoctorAsync:', error_4);
                    throw new Error('An error occured during create operation.');
                case 5: return [2 /*return*/];
            }
        });
    }); },
    editDoctorAsync: function (request) { return __awaiter(void 0, void 0, void 0, function () {
        var token, response, result, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, authService.getAccessToken()];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, fetch("/api/doctor", {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                                'Authorization': "Bearer ".concat(token)
                            },
                            body: JSON.stringify(request),
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    result = _a.sent();
                    if (result.data.earliestAvailableAppointment) {
                        result.data.earliestAvailableAppointment.startDateTime = convertUtcToLocal(result.data.earliestAvailableAppointment.startDateTime);
                        result.data.earliestAvailableAppointment.endDateTime = convertUtcToLocal(result.data.earliestAvailableAppointment.endDateTime);
                    }
                    return [2 /*return*/, result];
                case 4:
                    error_5 = _a.sent();
                    console.error('Error during editDoctorAsync:', error_5);
                    throw new Error('An error occured during edit operation.');
                case 5: return [2 /*return*/];
            }
        });
    }); },
    deleteDoctorAsync: function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var token, response, result, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, authService.getAccessToken()];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, fetch("/api/doctor/".concat(id), {
                            method: "DELETE",
                            headers: {
                                'Authorization': "Bearer ".concat(token)
                            },
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    result = _a.sent();
                    return [2 /*return*/, result.data];
                case 4:
                    error_6 = _a.sent();
                    console.error('Error during deleteDoctorAsync:', error_6);
                    throw new Error('An error occured during delete operation.');
                case 5: return [2 /*return*/];
            }
        });
    }); },
};
export default doctorService;
//# sourceMappingURL=doctorService.js.map