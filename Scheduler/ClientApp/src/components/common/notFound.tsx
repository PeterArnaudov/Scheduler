import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

interface NotFoundProps {
    buttonText: string,
    redirectUrl: string
}

const NotFound: FC<NotFoundProps> = ({ buttonText, redirectUrl }) => {
    const navigate = useNavigate();

    return (
        <div className="d-flex align-items-center justify-content-center">
            <div className="text-center">
                <h1 className="display-1 fw-bold">404</h1>
                <p className="fs-3"> <span className="text-danger">Опа!</span> Страницата не е намерена.</p>
                <p className="lead">
                    Страницата или ресурсът, който се опитвате да достъпите не съществува.
                </p>
                <Button color='primary' onClick={() => navigate(redirectUrl)}>{buttonText}</Button>
            </div>
        </div>
    );
};

export default NotFound;