import React, { FC, useState } from "react";
import { Button, Card, CardBody, CardHeader, CardTitle, Form } from "reactstrap";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../common/loader";
import doctorService from "../../services/doctorService";
import TextInput from "../common/inputs/textInput";
import { DoctorModel } from "../../models/doctorModel";
import { CreateDoctorRequest } from "../../models/requests/createDoctorRequest";
import { handleInputChange } from "../../helpers/utils/inputUtils";

interface DoctorCreateProps {
    onDoctorCreate: (doctor: DoctorModel) => void,
    onCancelClick: () => void
}

interface FormErrors {
    name?: string,
    description?: string,
    image?: string
    color?: string
}

const DoctorCreate: FC<DoctorCreateProps> = ({ onDoctorCreate, onCancelClick }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [requestData, setRequestData] = useState<CreateDoctorRequest>({
        name: "",
        description: "",
        image: "",
        color: "",
    });
    const [formErrors, setFormErrors] = useState<FormErrors>({});

    const clearFormData = () => {
        setRequestData({
            name: "",
            description: "",
            image: "",
            color: ""
        });
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        handleInputChange(e, key, setRequestData, setFormErrors);
    };

    const validateForm = () => {
        const isValidUrl = (urlString: string) => {
            var urlPattern = new RegExp('^(https?:\\/\\/)?' + // validate protocol
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
                '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
                '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
                '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
                '(\\#[-a-z\\d_]*)?$', 'i'); // validate fragment locator
            return !!urlPattern.test(urlString);
        }

        const errors: FormErrors = {};

        if (!requestData.name.trim()) {
            errors.name = "Моля, попълнете име.";
        }
        if (requestData.image.trim() && !isValidUrl(requestData.image)) {
            errors.image = "Моля, попълнете валиден URL адрес.";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0; // Form is valid if there are no errors
    };

    const onFormSubmitClick = async () => {
        if (validateForm()) {
            try {
                setIsLoading(true);

                const result = await doctorService.createDoctorAsync(requestData);

                if (result.success) {
                    onDoctorCreate(result.data);
                
                    toast.success(`Успешно създаде ${requestData.name}.`, {
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
                        formData={requestData.name}
                        label={'Име'}
                        placeholder={'Въведете име'}
                        error={formErrors.name}
                        onChange={onInputChange} />
                    <TextInput
                        id='description'
                        formData={requestData.description}
                        label={'Описание'}
                        placeholder={'Въведете описание'}
                        error={formErrors.description}
                        onChange={onInputChange} />
                    <TextInput
                        id='image'
                        formData={requestData.image}
                        label={'Снимка (URL)'}
                        placeholder={'Въведете линк към снимка'}
                        error={formErrors.image}
                        onChange={onInputChange} />
                    <TextInput
                        id='color'
                        formData={requestData.color}
                        label={'Цвят'}
                        placeholder={'Въведете цвят'}
                        error={formErrors.color}
                        onChange={onInputChange} />
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