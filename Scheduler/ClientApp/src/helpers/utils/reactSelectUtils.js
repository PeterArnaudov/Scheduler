import { __assign } from "tslib";
export var isMultiValue = function (arg) {
    return Array.isArray(arg);
};
export var handleSelectInputChange = function (newValue, actionMeta, setRequestData) {
    if (isMultiValue(newValue)) {
        var selectedValues_1 = newValue.map(function (option) { return option.value; });
        setRequestData(function (prevRequestData) {
            var _a;
            return (__assign(__assign({}, prevRequestData), (_a = {}, _a[actionMeta.name] = selectedValues_1, _a)));
        });
    }
    else {
        setRequestData(function (prevRequestData) {
            var _a;
            return (__assign(__assign({}, prevRequestData), (_a = {}, _a[actionMeta.name] = newValue === null || newValue === void 0 ? void 0 : newValue.value, _a)));
        });
    }
};
//# sourceMappingURL=reactSelectUtils.js.map