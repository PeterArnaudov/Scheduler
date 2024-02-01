export const formatDate = (datetimeString) => {
    try {
        const isDateInCurrentWeek = (inputDate) => {
            const currentDate = new Date();

            // Calculate the start and end of the current week
            const currentWeekStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay() + 1);
            const currentWeekEnd = new Date(currentWeekStart);
            currentWeekEnd.setDate(currentWeekStart.getDate() + 7);

            // Check if the input date is within the current week
            return inputDate >= currentWeekStart && inputDate <= currentWeekEnd;
        };

        const date = new Date(datetimeString);
        var options = {};

        if (!isDateInCurrentWeek(date)) {
            // Date is not within the current week, format as "15.12 22:30"
            options = {
                day: '2-digit',
                month: '2-digit',
                hour: 'numeric',
                minute: 'numeric',
            };
        } else {
            // Date is within the current week, format accordingly
            options = {
                weekday: 'long',  // Displays the full name of the day of the week
                hour: 'numeric',  // Displays the hour in 12-hour format
                minute: 'numeric',  // Displays the minute
            };
        }

        return new Intl.DateTimeFormat('bg', options).format(date);
    }
    catch (error) {
        console.error(error);

        return '';
    }
};

export const formatDateTimeLocal = (dateTimeString) => {
    try {

        const date = new Date(dateTimeString);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }
    catch (error) {
        console.error(error);

        return '';
    }
}

export const extractLongDate = (datetimeString) => {
    try {
        const date = new Date(datetimeString);
        var options = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        };

        return new Intl.DateTimeFormat('bg', options).format(date);
    }
    catch (error) {
        console.error(error);

        return '';
    }
}

export const extractDate = (datetimeString) => {
    try {
        const date = new Date(datetimeString);
        var options = {
            day: '2-digit',
            month: '2-digit',
        };

        return new Intl.DateTimeFormat('bg', options).format(date);
    }
    catch (error) {
        console.error(error);

        return '';
    }
}

export const extractHour = (datetimeString) => {
    try {
        const date = new Date(datetimeString);

        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return `${hours}:${minutes}`;
    }
    catch (error) {
        console.error(error);

        return '';
    }
}