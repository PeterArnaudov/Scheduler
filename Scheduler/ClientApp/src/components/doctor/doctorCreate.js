import { useState } from "react";
import { Button, Card, CardBody, CardHeader, CardTitle, Form } from "reactstrap";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../common/loader";
import doctorService from "../services/doctorService";
import TextInput from "../common/inputs/textInput";

const DoctorCreate = ({ onDoctorCreate, onCancelClick }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        image: "",
        color: "",
    });
    const [formErrors, setFormErrors] = useState({
        name: "",
        description: "",
        image: "",
    });

    const clearFormData = () => {
        setFormData({
            name: "",
            description: "",
            image: ""
        });
    };

    const handleInputChange = (e, key) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [key]: e.target.value,
        }));

        // Clear validation error when user starts typing.
        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [key]: "",
        }));
    };

    const validateForm = () => {
        const isValidUrl = urlString => {
            var urlPattern = new RegExp('^(https?:\\/\\/)?' + // validate protocol
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
                '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
                '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
                '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
                '(\\#[-a-z\\d_]*)?$', 'i'); // validate fragment locator
            return !!urlPattern.test(urlString);
        }

        const errors = {};

        if (!formData.name.trim()) {
            errors.name = "Моля, попълнете име.";
        }
        if (formData.image.trim() && !isValidUrl(formData.image)) {
            errors.image = "Моля, попълнете валиден URL адрес.";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0; // Form is valid if there are no errors
    };

    const onFormSubmitClick = async () => {
        if (validateForm()) {
            try {
                setIsLoading(true);

                const result = await doctorService.createDoctorAsync(formData);

                if (result.success) {
                    onDoctorCreate(result.data);

                    toast.success(`Успешно създаде ${formData.name}.`, {
                        icon: '✅',
                    });

                    clearFormData();
                }
                else {
                    toast.error(result.message, {
                        icon: '❌',
                    });
                }
            } catch (error) {
                toast.error('Изникна грешка при обработването на резултата.', {
                    icon: '❌',
                });
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <Card>
            {isLoading && <Loader />}
            <CardHeader>
                <CardTitle className="h5">Създаване</CardTitle>
            </CardHeader>
            <CardBody>
                <Form>
                    <TextInput
                        id='name'
                        formData={formData.name}
                        label={'Име'}
                        placeholder={'Въведете име'}
                        error={formErrors.name}
                        onChange={handleInputChange} />
                    <TextInput
                        id='description'
                        formData={formData.description}
                        label={'Описание'}
                        placeholder={'Въведете описание'}
                        error={formErrors.description}
                        onChange={handleInputChange} />
                    <TextInput
                        id='image'
                        formData={formData.image}
                        label={'Снимка (URL)'}
                        placeholder={'Въведете линк към снимка'}
                        error={formErrors.image}
                        onChange={handleInputChange} />
                    <TextInput
                        id='color'
                        formData={formData.color}
                        label={'Цвят'}
                        placeholder={'Въведете цвят'}
                        error={formErrors.color}
                        onChange={handleInputChange} />
                </Form>
                <Button color="success" onClick={onFormSubmitClick}>
                    Създай
                </Button>
                <Button className="ms-2" color="secondary" onClick={onCancelClick}>
                    Откажи
                </Button>
            </CardBody>
        </Card>
    );
};

export default DoctorCreate;