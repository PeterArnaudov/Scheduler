import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

const NotFound = ({ buttonText, redirectUrl }) => {
    const navigate = useNavigate();

    return (
        <div class="d-flex align-items-center justify-content-center">
            <div class="text-center">
                <h1 class="display-1 fw-bold">404</h1>
                <p class="fs-3"> <span class="text-danger">Опа!</span> Страницата не е намерена.</p>
                <p class="lead">
                    Страницата или ресурсът, който се опитвате да достъпите не съществува.
                </p>
                <Button color='primary' onClick={() => navigate(redirectUrl)}>{buttonText}</Button>
            </div>
        </div>
    );
};

export default NotFound;