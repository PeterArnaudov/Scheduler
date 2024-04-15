import authService from "../api-authorization/authorizeService";

const patientService = {
    searchAsync: async (filterData) => {
        try {
            const token = await authService.getAccessToken();
            const response = await fetch('api/patient/search', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(filterData),
            });
            const result = await response.json();

            return result;
        }
        catch (error) {
            console.error('Error during getPatientsAsync:', error);
            throw new Error('An error occured during get operation.');
        }
    },

    editPatientAsync: async (formData) => {
        try {
            const token = await authService.getAccessToken();
            const response = await fetch("/api/patient", {
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
            console.error('Error during editPatientAsync:', error);
            throw new Error('An error occured during edit operation.');
        }
    },

    deletePatientAsync: async (id) => {
        try {

            const token = await authService.getAccessToken();
            const response = await fetch(`/api/patient/${id}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });

            var result = await response.json();

            return result;
        }
        catch (error) {
            console.error('Error during deletePatientAsync:', error);
            throw new Error('An error occured during delete operation.');
        }
    },
};

export default patientService;