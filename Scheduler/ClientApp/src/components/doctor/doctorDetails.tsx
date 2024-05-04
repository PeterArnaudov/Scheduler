import React, { FC, useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import AppointmentList from '../appointment/appointmentList';
import Loader from '../common/loader';
import doctorService from '../../services/doctorService';
import { DoctorModel } from '../../models/doctorModel';
import { AppointmentModel } from '../../models/appointmentModel';

interface DoctorDetailsProps {
    doctor: DoctorModel | undefined,
    onSelectDoctor: (doctor: DoctorModel) => void,
    onSelectAppointment: (appointment: AppointmentModel) => void,
};

const DoctorDetails: FC<DoctorDetailsProps> = ({ doctor, onSelectDoctor, onSelectAppointment }) => {
    const navigate = useNavigate();
    const { clinicName, doctorName } = useParams();

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Fetch doctor data based on the name from the backend.
        const fetchDoctorData = async () => {
            try {
                if (!doctorName || !clinicName) {
                    return;
                }

                const result = await doctorService.getDoctorAsync(doctorName, clinicName);

                if (result.success) {
                    onSelectDoctor(result.data);
                }
                else {
                    if (result.statusCode === 404) {
                        navigate('/not-found');
                    }
                }
            } catch (error) {
                console.error('Error fetching doctor data:', error);

                navigate(`/${clinicName}/doctors`);
            }
        };

        setIsLoading(true);

        if (!doctor && doctorName) {
            // Fetch doctor data only if not already available and name is provided.
            fetchDoctorData();
        }


        setIsLoading(false);
    }, [doctor, clinicName, doctorName, navigate, onSelectDoctor]);

    return (
        <div className={`card ${isLoading ? 'loading' : ''}`}>
            {isLoading && <Loader />}
            {doctor &&
                <div className='row'>
                    {doctor?.image &&
                        <div className='col-sm-12 col-md-12 col-lg-4'>
                            <img src={doctor.image} className='card-img-top img-fluid' alt='doctor' />
                        </div>}
                    <div className='col-sm-12 col-md-12 col-lg-8 text-center'>
                        <div className='card-body'>
                            <h5 className="card-title">{doctor?.name}</h5>
                            {doctor?.description && <p className='card-text'>{doctor.description}</p>}
                            <AppointmentList
                                doctorName={doctor?.name}
                                onSelectAppointment={onSelectAppointment} />
                        </div>
                    </div>
                </div>
            }
        </div>
    )
};

export default DoctorDetails;