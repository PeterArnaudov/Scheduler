import React, { FC, useState } from "react";
import { Button, Card, CardBody, CardHeader, CardTitle, Form } from "reactstrap";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../common/loader";
import doctorService from "../../services/doctorService";
import TextInput from "../common/inputs/textInput";
import { DoctorModel } from "../../models/doctorModel";
import { EditDoctorRequest } from "../../models/requests/editDoctorRequest";
import { handleInputChange } from "../../helpers/utils/inputUtils";

interface DoctorEditProps {
    doctor: DoctorModel,
    setDoctor: React.Dispatch<React.SetStateAction<DoctorModel>>,
    setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>
}

interface FormErrors {
    name?: string,
    description?: string,
    image?: string
    color?: string
}

const DoctorEdit: FC<DoctorEditProps> = ({ doctor, setDoctor, setIsEditMode }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [requestData, setRequestData] = useState<EditDoctorRequest>({
        id: doctor.id,
        name: doctor.name,
        description: doctor.description ?? '',
        image: doctor.image ?? '',
        color: doctor.color ?? '',
    });
    const [formErrors, setFormErrors] = useState<FormErrors>({});

    const toggleIsLoading = () => {
        setIsLoading(!isLoading);
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
                toggleIsLoading();

                requestData.id = doctor?.id;
                const result = await doctorService.editDoctorAsync(requestData);

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
                        placeholder={'Въведете цвят (използван в графика)'}
                        error={formErrors.name}
                        onChange={onInputChange} />
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