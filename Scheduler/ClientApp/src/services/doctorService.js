import authService from "../api-authorization/authorizeService";

const doctorService = {
    getSummarizedDoctorsAsync: async (clinicId) => {
        try {
            const response = await fetch(`/api/doctor/summarized?clinicId=${clinicId}&clinicId=0`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = await response.json();

            return result;
        }
        catch (error) {
            console.error('Error during getSummarizedDoctorsAsync:', error);
            throw new Error('An error occured during get operation.');
        }
    },

    getDoctorsAsync: async () => {
        try {
            const token = await authService.getAccessToken();
            const response = await fetch("/api/doctor/list", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
            });
            const result = await response.json();

            return result;
        }
        catch (error) {
            console.error('Error during getDoctorsAsync:', error);
            throw new Error('An error occured during get operation.');
        }
    },

    getDoctorAsync: async (doctorName, clinicId) => {
        try {
            const response = await fetch(`/api/doctor/single?doctorName=${doctorName}&clinicId=${clinicId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = await response.json();

            return result;
        }
        catch (error) {
            console.error('Error during getDoctorAsync:', error);
            throw new Error('An error occured during get operation.');
        }
    },

    createDoctorAsync: async (formData) => {
        try {
            const token = await authService.getAccessToken();
            const response = await fetch("/api/doctor", {
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
            console.error('Error during createDoctorAsync:', error);
            throw new Error('An error occured during create operation.');
        }
    },

    editDoctorAsync: async (formData) => {
        try {
            const token = await authService.getAccessToken();
            const response = await fetch("/api/doctor", {
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
            console.error('Error during editDoctorAsync:', error);
            throw new Error('An error occured during edit operation.');
        }
    },

    deleteDoctorAsync: async (id) => {
        try {

            const token = await authService.getAccessToken();
            const response = await fetch(`/api/doctor/${id}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });

            var result = await response.json();

            return result;
        }
        catch (error) {
            console.error('Error during deleteDoctorAsync:', error);
            throw new Error('An error occured during delete operation.');
        }
    },
};

export default doctorService;