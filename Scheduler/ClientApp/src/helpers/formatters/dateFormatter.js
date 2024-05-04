import dayjs from 'dayjs';
/**
 * Formats the date with the given format.
 * @param dateTime The date to be formatted.
 * @returns The formatted date.
 */
export var formatDate = function (datetime, format) {
    try {
        return dayjs(datetime).format(format);
    }
    catch (error) {
        console.log(error);
        return '';
    }
};
/**
 * Formats the appointment date based on whether it's in the current week.
 * @param dateTime The appointment date to be formatted.
 * @returns The formatted date as "DD.MM HH:mm" or "dddd, HH:mm".
 */
export var formatAppointmentDate = function (dateTime) {
    try {
        var isDateInCurrentWeek = function (inputDate) {
            var currentDate = new Date();
            // Calculate the start and end of the current week
            var currentWeekStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay() + 1);
            var currentWeekEnd = new Date(currentWeekStart);
            currentWeekEnd.setDate(currentWeekStart.getDate() + 7);
            // Check if the input date is within the current week
            return inputDate >= currentWeekStart && inputDate <= currentWeekEnd;
        };
        return !isDateInCurrentWeek(dateTime)
            ? dayjs(dateTime).format("DD.MM, HH:mm")
            : dayjs(dateTime).format("dddd, HH:mm");
    }
    catch (error) {
        console.error(error);
        return '';
    }
};
/**
 * Formats the date as local string, "YYYY-MM-DDTHH:mm".
 * @param dateTime The date to be formatted.
 * @returns The formatted date as "YYYY-MM-DDTHH:mm".
 */
export var formatDateTimeLocal = function (dateTime) {
    try {
        return dayjs(dateTime).format("YYYY-MM-DDTHH:mm");
    }
    catch (error) {
        console.error(error);
        return '';
    }
};
/**
 * Formats the date as "DD.MM.YYYY".
 * @param dateTime The date to be formatted.
 * @returns The formatted date as "DD.MM.YYYY".
 */
export var extractLongDate = function (dateTime) {
    try {
        return dayjs(dateTime).format("DD.MM.YYYY");
    }
    catch (error) {
        console.error(error);
        return '';
    }
};
/**
 * Formats the date as "DD.MM".
 * @param dateTime The date to be formatted.
 * @returns The formatted date as "DD.MM".
 */
export var extractDate = function (datetime) {
    try {
        return dayjs(datetime).format("DD.MM");
    }
    catch (error) {
        console.error(error);
        return '';
    }
};
/**
 * Formats the date as "HH:mm".
 * @param dateTime The date to be formatted.
 * @returns The formatted date as "HH:mm".
 */
export var extractHour = function (datetime) {
    try {
        return dayjs(datetime).format("HH:mm");
    }
    catch (error) {
        console.error(error);
        return '';
    }
};
//# sourceMappingURL=dateFormatter.js.map