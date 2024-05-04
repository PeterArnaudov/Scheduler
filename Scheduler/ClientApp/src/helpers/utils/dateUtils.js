import dayjs from 'dayjs';
export var convertUtcToLocal = function (date) {
    return dayjs(date.toString().concat("Z")).toDate();
};
//# sourceMappingURL=dateUtils.js.map