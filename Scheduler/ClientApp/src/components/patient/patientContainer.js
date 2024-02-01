import { useEffect, useState } from "react";
import patientService from "../services/patientService";
import { toast } from "react-toastify";
import PatientList from "./patientList";
import Loader from "../common/loader";
import FilterContainer from "../common/filters/filterContainer";
import TextFilter from "../common/filters/textFilter";

const PatientContainer = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [patients, setPatients] = useState([]);
    const [filterData, setFilterData] = useState({
        query: '',
    });

    useEffect(() => {
        const populatePatientData = async () => {
            try {
                setIsLoading(true);

                var result = await patientService.searchAsync(filterData);

                setPatients(result.data);
            } catch (error) {
                console.error('Error fetching doctor data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        populatePatientData();
    }, [filterData]);

    const updateFilterData = (updatedFilterData) => {
        setFilterData(updatedFilterData);
    };

    const handleEditPatient = async (editedPatient) => {
        try {
            const result = await patientService.editPatientAsync(editedPatient);

            if (result.success) {
                setPatients((prevPatients) => {
                    return prevPatients.map((patient) =>
                        patient.id === editedPatient.id ? result.data : patient
                    );
                });

                toast.success(`Успешно редактирахте ${editedPatient.name}.`, {
                    icon: '✅'
                });
            }
            else {
                toast.error(result.message, {
                    icon: '❌',
                });
            }

            return result.success;
        }
        catch (error) {
            toast.error('Изникна грешка при обработването на резултата', {
                icon: '❌',
            });

            return false;
        }
    };

    const handleDeletePatient = async (patient) => {
        try {
            const result = await patientService.deletePatientAsync(patient.id);

            if (result.success) {
                setPatients((prevPatients) => {
                    const updatedPatients = prevPatients.filter((x) => x.id !== patient.id);
                    return updatedPatients;
                });

                toast.success(`Успешно изтрихте ${patient.name}.`, {
                    icon: '✅'
                });
            }
            else {
                toast.error(result.message, {
                    icon: '❌',
                });
            }
        }
        catch (error) {
            toast.error('Изникна грешка при обработването на резултата', {
                icon: '❌',
            });
        }
    };

    return (
        <div className={`${isLoading ? 'loading' : ''}`}>
            {isLoading && <Loader />}
            <FilterContainer
                className='mb-2 row'
                initialFilterData={filterData}
                updateFilterData={updateFilterData} >
                <TextFilter
                    className='col-12 col-lg-6'
                    name='query'
                    label='Име, email или тел. номер'
                    placeholder='Въведете име, email или тел. номер' />
            </FilterContainer>
            <hr />
            <PatientList
                patients={patients}
                onEditPatient={handleEditPatient}
                onDeletePatient={handleDeletePatient} />
        </div>
    );
};

export default PatientContainer;