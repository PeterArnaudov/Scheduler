import { __awaiter, __generator } from "tslib";
import authService from "../api-authorization/authorizeService";
var patientService = {
    searchAsync: function (requestData) { return __awaiter(void 0, void 0, void 0, function () {
        var token, response, result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, authService.getAccessToken()];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, fetch('api/patient/search', {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                'Authorization': "Bearer ".concat(token),
                            },
                            body: JSON.stringify(requestData),
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    result = _a.sent();
                    return [2 /*return*/, result];
                case 4:
                    error_1 = _a.sent();
                    console.error('Error during getPatientsAsync:', error_1);
                    throw new Error('An error occured during get operation.');
                case 5: return [2 /*return*/];
            }
        });
    }); },
    editPatientAsync: function (requestData) { return __awaiter(void 0, void 0, void 0, function () {
        var token, response, result, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, authService.getAccessToken()];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, fetch("/api/patient", {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                                'Authorization': "Bearer ".concat(token)
                            },
                            body: JSON.stringify(requestData),
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    result = _a.sent();
                    return [2 /*return*/, result];
                case 4:
                    error_2 = _a.sent();
                    console.error('Error during editPatientAsync:', error_2);
                    throw new Error('An error occured during edit operation.');
                case 5: return [2 /*return*/];
            }
        });
    }); },
    deletePatientAsync: function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var token, response, result, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, authService.getAccessToken()];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, fetch("/api/patient/".concat(id), {
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
                    return [2 /*return*/, result];
                case 4:
                    error_3 = _a.sent();
                    console.error('Error during deletePatientAsync:', error_3);
                    throw new Error('An error occured during delete operation.');
                case 5: return [2 /*return*/];
            }
        });
    }); },
};
export default patientService;
//# sourceMappingURL=patientService.js.map