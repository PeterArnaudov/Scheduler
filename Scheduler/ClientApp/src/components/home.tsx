import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const Home: FC = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="px-4 pt-5 my-5 text-center border-bottom">
                <h1 className="display-4 fw-bold">Scheduler</h1>
                <div className="col-lg-6 mx-auto">
                    <p className="lead mb-4">Приложението за клиники и практики, симплистично и лесно за използване, предлага функции и удобства за пациенти и доктори.</p>
                    <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
                        <button
                            type="button"
                            className="btn btn-primary btn-lg px-4 me-sm-3"
                            onClick={() => navigate('/clinics')}>
                            Търси клиники
                        </button>
                        <button type="button" className="btn btn-secondary btn-lg px-4">Създай клиника</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
