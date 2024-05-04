import dayjs from 'dayjs';

/**
 * Formats the date with the given format.
 * @param dateTime The date to be formatted.
 * @returns The formatted date.
 */
export const formatDate = (datetime: Date, format: string): string => {
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
export const formatAppointmentDate = (dateTime: Date): string => {
    try {
        const isDateInCurrentWeek = (inputDate: Date): boolean => {
            const currentDate = new Date();

            // Calculate the start and end of the current week
            const currentWeekStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay() + 1);
            const currentWeekEnd = new Date(currentWeekStart);
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
export const formatDateTimeLocal = (dateTime: Date): string => {
    try {
        return dayjs(dateTime).format("YYYY-MM-DDTHH:mm");
    }
    catch (error) {
        console.error(error);

        return '';
    }
}

/**
 * Formats the date as "DD.MM.YYYY".
 * @param dateTime The date to be formatted.
 * @returns The formatted date as "DD.MM.YYYY".
 */
export const extractLongDate = (dateTime: Date): string => {
    try {
        return dayjs(dateTime).format("DD.MM.YYYY");
    }
    catch (error) {
        console.error(error);

        return '';
    }
}

/**
 * Formats the date as "DD.MM".
 * @param dateTime The date to be formatted.
 * @returns The formatted date as "DD.MM".
 */
export const extractDate = (datetime: Date): string => {
    try {
        return dayjs(datetime).format("DD.MM");
    }
    catch (error) {
        console.error(error);

        return '';
    }
}

/**
 * Formats the date as "HH:mm".
 * @param dateTime The date to be formatted.
 * @returns The formatted date as "HH:mm".
 */
export const extractHour = (datetime: Date): string => {
    try {
        return dayjs(datetime).format("HH:mm");
    }
    catch (error) {
        console.error(error);

        return '';
    }
}