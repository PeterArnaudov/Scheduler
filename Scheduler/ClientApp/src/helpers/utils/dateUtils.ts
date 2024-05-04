import dayjs from 'dayjs';

export const convertUtcToLocal = function (date: Date) {
    return dayjs(date.toString().concat("Z")).toDate();
};