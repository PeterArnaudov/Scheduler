import { __awaiter, __generator } from "tslib";
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import AppointmentList from '../appointment/appointmentList';
import Loader from '../common/loader';
import doctorService from '../../services/doctorService';
;
var DoctorDetails = function (_a) {
    var doctor = _a.doctor, onSelectDoctor = _a.onSelectDoctor, onSelectAppointment = _a.onSelectAppointment;
    var navigate = useNavigate();
    var _b = useParams(), clinicName = _b.clinicName, doctorName = _b.doctorName;
    var _c = useState(false), isLoading = _c[0], setIsLoading = _c[1];
    useEffect(function () {
        // Fetch doctor data based on the name from the backend.
        var fetchDoctorData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!doctorName || !clinicName) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, doctorService.getDoctorAsync(doctorName, clinicName)];
                    case 1:
                        result = _a.sent();
                        if (result.success) {
                            onSelectDoctor(result.data);
                        }
                        else {
                            if (result.statusCode === 404) {
                                navigate('/not-found');
                            }
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error('Error fetching doctor data:', error_1);
                        navigate("/".concat(clinicName, "/doctors"));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        setIsLoading(true);
        if (!doctor && doctorName) {
            // Fetch doctor data only if not already available and name is provided.
            fetchDoctorData();
        }
        setIsLoading(false);
    }, [doctor, clinicName, doctorName, navigate, onSelectDoctor]);
    return (React.createElement("div", { className: "card ".concat(isLoading ? 'loading' : '') },
        isLoading && React.createElement(Loader, null),
        doctor &&
            React.createElement("div", { className: 'row' },
                (doctor === null || doctor === void 0 ? void 0 : doctor.image) &&
                    React.createElement("div", { className: 'col-sm-12 col-md-12 col-lg-4' },
                        React.createElement("img", { src: doctor.image, className: 'card-img-top img-fluid', alt: 'doctor' })),
                React.createElement("div", { className: 'col-sm-12 col-md-12 col-lg-8 text-center' },
                    React.createElement("div", { className: 'card-body' },
                        React.createElement("h5", { className: "card-title" }, doctor === null || doctor === void 0 ? void 0 : doctor.name),
                        (doctor === null || doctor === void 0 ? void 0 : doctor.description) && React.createElement("p", { className: 'card-text' }, doctor.description),
                        React.createElement(AppointmentList, { doctorName: doctor === null || doctor === void 0 ? void 0 : doctor.name, onSelectAppointment: onSelectAppointment }))))));
};
export default DoctorDetails;
//# sourceMappingURL=doctorDetails.js.map