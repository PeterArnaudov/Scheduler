import { __assign, __awaiter, __generator } from "tslib";
import React, { useState } from 'react';
import { Button } from "reactstrap";
import { extractHour, formatAppointmentDate } from "../../helpers/formatters/dateFormatter";
import { useAuth } from "../../contexts/authContext";
import Loader from "../common/loader";
var Appointment = function (_a) {
    var appointment = _a.appointment, doctor = _a.doctor, isShortFormat = _a.isShortFormat, onSelectAppointment = _a.onSelectAppointment, onDelete = _a.onDelete;
    var user = useAuth().user;
    var _b = useState(false), isLoading = _b[0], setIsLoading = _b[1];
    var onDeleteClick = function (appointment) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!onDelete) return [3 /*break*/, 2];
                    setIsLoading(true);
                    return [4 /*yield*/, onDelete(appointment)];
                case 1:
                    _a.sent();
                    setIsLoading(false);
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement("div", { className: "".concat(isLoading ? 'loading' : '') },
        isLoading && React.createElement(Loader, null),
        React.createElement(Button, __assign({ color: "primary" }, (!onSelectAppointment ? { disabled: true } : {}), { onClick: function () { return onSelectAppointment && onSelectAppointment(appointment, doctor); } }), isShortFormat
            ? extractHour(appointment.startDateTime)
            : formatAppointmentDate(appointment.startDateTime)),
        ((user === null || user === void 0 ? void 0 : user.isAdmin) && onDelete) &&
            React.createElement(Button, { color: "danger", size: "sm", onClick: function () { return onDeleteClick(appointment); } }, "x")));
};
export default Appointment;
//# sourceMappingURL=appointment.js.map