import authService from "../api-authorization/authorizeService";

const appointmentTypeService = {
    getAppointmentTypesAsync: async (doctorId, clinicId) => {
        try {
            const token = await authService.getAccessToken();
            const response = await fetch(`/api/appointmenttype?doctorId=${doctorId ?? ''}&clinicId=${clinicId ?? ''}`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const result = await response.json();

            return result;
        }
        catch (error) {
            console.error('Error during getAppointmentTypesAsync:', error);
            throw new Error('An error occured during get operation.');
        }
    },

    createAppointmentTypeAsync: async (formData) => {
        try {
            const token = await authService.getAccessToken();
            const response = await fetch("/api/appointmenttype", {
                method: "POST",
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
            console.error('Error during createAppointmentTypeAsync:', error);
            throw new Error('An error occured during create operation.');
        }
    },

    editAppointmentTypeAsync: async (formData) => {
        try {
            const token = await authService.getAccessToken();
            const response = await fetch("/api/appointmenttype", {
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
            console.error('Error during editAppointmentTypeAsync:', error);
            throw new Error('An error occured during edit operation.');
        }
    },

    deleteAppointmentTypeAsync: async (id) => {
        try {

            const token = await authService.getAccessToken();
            const response = await fetch(`/api/appointmenttype/${id}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });

            var result = await response.json();

            return result;
        }
        catch (error) {
            console.error('Error during deleteAppointmentTypeAsync:', error);
            throw new Error('An error occured during delete operation.');
        }
    },
};

export default appointmentTypeService;