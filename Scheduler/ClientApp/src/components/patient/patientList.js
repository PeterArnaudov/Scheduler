import Patient from "./patient";

const PatientList = ({ patients, onEditPatient, onDeletePatient }) => {
    return (
        <div>
            {(patients && patients?.length > 0) &&
                patients.map((patient) => (
                    <Patient
                        key={patient.id}
                        patient={patient}
                        onEditPatient={onEditPatient}
                        onDeletePatient={onDeletePatient} />
                ))
            }
            {(!patients || patients?.length === 0) &&
                <p className="text-center">Няма резултати.</p>
            }
        </div>
    )
};

export default PatientList;