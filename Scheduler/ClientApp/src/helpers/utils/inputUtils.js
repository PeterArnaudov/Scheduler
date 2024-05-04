import { __assign } from "tslib";
export var handleInputChange = function (e, key, setRequestData, setErrors) {
    if (e.target.type === "checkbox") {
        setRequestData(function (prevRequestData) {
            var _a;
            return (__assign(__assign({}, prevRequestData), (_a = {}, _a[key] = e.target.checked, _a)));
        });
    }
    else {
        setRequestData(function (prevRequestData) {
            var _a;
            return (__assign(__assign({}, prevRequestData), (_a = {}, _a[key] = e.target.value, _a)));
        });
    }
    // Clear validation error when user starts typing.
    setErrors(function (prevErrors) {
        var _a;
        return (__assign(__assign({}, prevErrors), (_a = {}, _a[key] = "", _a)));
    });
};
//# sourceMappingURL=inputUtils.js.map