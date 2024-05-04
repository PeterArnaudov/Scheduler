import React, { FC } from "react";
import Patient from "./patient";
import { PatientModel } from "../../models/patientModel";

interface PatientListProps {
    patients: PatientModel[],
    onEditPatient: (patient: PatientModel) => Promise<boolean>,
    onDeletePatient: (patient: PatientModel) => Promise<void>
}

const PatientList: FC<PatientListProps> = ({ patients, onEditPatient, onDeletePatient }) => {
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