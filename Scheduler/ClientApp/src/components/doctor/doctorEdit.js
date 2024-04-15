import { useState } from "react";
import { Button, Card, CardBody, CardHeader, CardTitle, Form } from "reactstrap";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../common/loader";
import doctorService from "../../services/doctorService";
import TextInput from "../common/inputs/textInput";

const DoctorEdit = ({ doctor, setDoctor, setIsEditMode }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: doctor.name,
        description: doctor.description ?? '',
        image: doctor.image ?? '',
        color: doctor.color ?? '',
    });
    const [formErrors, setFormErrors] = useState({
        name: "",
        description: "",
        image: "",
    });

    const toggleIsLoading = () => {
        setIsLoading(!isLoading);
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
                toggleIsLoading();

                formData.id = doctor?.id;
                const result = await doctorService.editDoctorAsync(formData);

                if (result.success) {
                    setDoctor(prevDoctor => ({
                        ...prevDoctor,
                        ...result.data
                    }));

                    setIsEditMode(false);

                    toast.success(`Успешно редактира ${doctor.name}.`, {
                        icon: '✅',
                    });
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
                toggleIsLoading();
            }
        }
    };

    return (
        <Card>
            {isLoading && <Loader />}
            <CardHeader>
                <CardTitle className="h5">Редактиране</CardTitle>
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
                        placeholder={'Въведете цвят (използван в графика)'}
                        error={formErrors.name}
                        onChange={handleInputChange} />
                </Form>
                <Button color="success" onClick={onFormSubmitClick}>
                    Редактирай
                </Button>
                <Button className="ms-2" color="secondary" onClick={() => setIsEditMode(false)}>
                    Откажи
                </Button>
            </CardBody>
        </Card>
    );
};

export default DoctorEdit;