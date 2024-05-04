import React, { FC } from "react";
import { FormFeedback, FormGroup, Input, Label } from "reactstrap";
import { formatDateTimeLocal } from "../../../helpers/formatters/dateFormatter";

interface DateTimeInputProps {
    id: string,
    formData: Date,
    label: string,
    error: string | undefined,
    onChange: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void
};

const DateTimeInput: FC<DateTimeInputProps> = ({ id, formData, label, error, onChange }) => {

    return (
        <FormGroup>
            <Label for={id}>
                {label}
            </Label>
            <Input
                id={id}
                name={id}
                type="datetime-local"
                onChange={(e) => onChange(e, id)}
                {...(formData ? { value: formatDateTimeLocal(formData) } : {})}
                {...(error ? { invalid: true } : { valid: true })} />
            {error &&
                <FormFeedback>
                    {error}
                </FormFeedback>}
        </FormGroup>
    );
};

export default DateTimeInput;