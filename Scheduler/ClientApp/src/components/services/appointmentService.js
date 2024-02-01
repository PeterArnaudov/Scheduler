import authService from "../api-authorization/authorizeService";

const appointmentService = {
    getAvailableAsync: async (doctorName) => {
        try {
            const response = await fetch(`/api/appointment/available/${doctorName}`);
            var result = await response.json();

            return result;
        }
        catch (error) {
            console.error('Error during getAvailableAsync:', error);
            throw new Error('An error occured during get operation.');
        }
    },

    searchAsync: async (filterData) => {
        try {
            const token = await authService.getAccessToken();
            const response = await fetch(`/api/appointment/search`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(filterData),
            });

            var result = await response.json();

            return result;
        }
        catch (error) {
            console.error('Error during searchAsync:', error);
            throw new Error('An error occured during search operation.');
        }
    },

    editAppointmentAsync: async (formData) => {
        try {
            const token = await authService.getAccessToken();
            const response = await fetch("/api/appointment", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData),
            });

            var result = await response.json();

            return result;
        }
        catch (error) {
            console.error('Error during editAppointmentAsync:', error);
            throw new Error('An error occured during edit operation.');
        }
    },

    deleteAppointmentAsync: async (id) => {
        try {
            const token = await authService.getAccessToken();
            const response = await fetch(`/api/appointment/${id}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });

            var result = await response.json();

            return result;
        }
        catch (error) {
            console.error('Error during deleteAppointmentAsync:', error);
            throw new Error('An error occured during delete operation.');
        }
    },

    bulkCreateAsync: async (formData) => {
        try {
            const token = await authService.getAccessToken();
            const response = await fetch(`/api/appointment/bulk-create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            var result = await response.json();

            return result;
        }
        catch (error) {
            console.error('Error during bulkCreateAsync:', error);
            throw new Error('An error occured during bulk create operation.');
        }
    },

    bulkDeleteAsync: async (formData) => {
        try {
            const token = await authService.getAccessToken();
            const response = await fetch(`/api/appointment/bulk-delete`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            var result = await response.json();

            return result;
        }
        catch (error) {
            console.error('Error during bulkDeleteAsync:', error);
            throw new Error('An error occured during bulk delete operation.');
        }
    },
};

export default appointmentService;