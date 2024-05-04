import { __awaiter, __generator } from "tslib";
import 'tslib';
import authService from "../api-authorization/authorizeService";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { convertUtcToLocal } from '../helpers/utils/dateUtils';
dayjs.extend(utc);
var appointmentService = {
    getAvailableAsync: function (doctorName) { return __awaiter(void 0, void 0, void 0, function () {
        var response, result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("/api/appointment/available/".concat(doctorName))];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    result = _a.sent();
                    result.data.forEach(function (appointment) {
                        appointment.startDateTime = convertUtcToLocal(appointment.startDateTime);
                        appointment.endDateTime = convertUtcToLocal(appointment.endDateTime);
                    });
                    return [2 /*return*/, result];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error during getAvailableAsync:', error_1);
                    throw new Error('An error occured during get operation.');
                case 4: return [2 /*return*/];
            }
        });
    }); },
    searchAsync: function (request) { return __awaiter(void 0, void 0, void 0, function () {
        var token, response, result, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    request.startDateTime = dayjs(request.startDateTime).utc().toDate();
                    request.endDateTime = dayjs(request.endDateTime).utc().toDate();
                    return [4 /*yield*/, authService.getAccessToken()];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, fetch("/api/appointment/search", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                'Authorization': "Bearer ".concat(token),
                            },
                            body: JSON.stringify(request),
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    result = _a.sent();
                    result.data.forEach(function (appointment) {
                        appointment.startDateTime = convertUtcToLocal(appointment.startDateTime);
                        appointment.endDateTime = convertUtcToLocal(appointment.endDateTime);
                    });
                    return [2 /*return*/, result];
                case 4:
                    error_2 = _a.sent();
                    console.error('Error during searchAsync:', error_2);
                    throw new Error('An error occured during search operation.');
                case 5: return [2 /*return*/];
            }
        });
    }); },
    editAppointmentAsync: function (request) { return __awaiter(void 0, void 0, void 0, function () {
        var token, response, result, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    request.startDateTime = dayjs(request.startDateTime).utc().toDate();
                    request.endDateTime = dayjs(request.endDateTime).utc().toDate();
                    return [4 /*yield*/, authService.getAccessToken()];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, fetch("/api/appointment", {
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
                    result.data.startDateTime = convertUtcToLocal(result.data.startDateTime);
                    result.data.endDateTime = convertUtcToLocal(result.data.endDateTime);
                    return [2 /*return*/, result];
                case 4:
                    error_3 = _a.sent();
                    console.error('Error during editAppointmentAsync:', error_3);
                    throw new Error('An error occured during edit operation.');
                case 5: return [2 /*return*/];
            }
        });
    }); },
    deleteAppointmentAsync: function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var token, response, result, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, authService.getAccessToken()];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, fetch("/api/appointment/".concat(id), {
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
                    error_4 = _a.sent();
                    console.error('Error during deleteAppointmentAsync:', error_4);
                    throw new Error('An error occured during delete operation.');
                case 5: return [2 /*return*/];
            }
        });
    }); },
    bulkCreateAsync: function (request) { return __awaiter(void 0, void 0, void 0, function () {
        var token, response, result, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    request.startDateTime = dayjs(request.startDateTime).utc().toDate();
                    request.endDateTime = dayjs(request.endDateTime).utc().toDate();
                    return [4 /*yield*/, authService.getAccessToken()];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, fetch("/api/appointment/bulk-create", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                'Authorization': "Bearer ".concat(token),
                            },
                            body: JSON.stringify(request),
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    result = _a.sent();
                    result.data.forEach(function (appointment) {
                        appointment.startDateTime = convertUtcToLocal(appointment.startDateTime);
                        appointment.endDateTime = convertUtcToLocal(appointment.endDateTime);
                    });
                    return [2 /*return*/, result];
                case 4:
                    error_5 = _a.sent();
                    console.error('Error during bulkCreateAsync:', error_5);
                    throw new Error('An error occured during bulk create operation.');
                case 5: return [2 /*return*/];
            }
        });
    }); },
    bulkDeleteAsync: function (request) { return __awaiter(void 0, void 0, void 0, function () {
        var token, response, result, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    request.startDateTime = dayjs(request.startDateTime).utc().toDate();
                    request.endDateTime = dayjs(request.endDateTime).utc().toDate();
                    return [4 /*yield*/, authService.getAccessToken()];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, fetch("/api/appointment/bulk-delete", {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json",
                                'Authorization': "Bearer ".concat(token),
                            },
                            body: JSON.stringify(request),
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    result = _a.sent();
                    result.data.forEach(function (appointment) {
                        appointment.startDateTime = convertUtcToLocal(appointment.startDateTime);
                        appointment.endDateTime = convertUtcToLocal(appointment.endDateTime);
                    });
                    return [2 /*return*/, result];
                case 4:
                    error_6 = _a.sent();
                    console.error('Error during bulkDeleteAsync:', error_6);
                    throw new Error('An error occured during bulk delete operation.');
                case 5: return [2 /*return*/];
            }
        });
    }); },
};
export default appointmentService;
//# sourceMappingURL=appointmentService.js.map