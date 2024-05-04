import React, { FC } from "react";
import { FormFeedback, FormGroup, Input, Label } from "reactstrap";

interface CheckboxInputProps {
    id: string,
    formData: boolean,
    label: string,
    error: string | undefined,
    onChange: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void
};

const CheckboxInput: FC<CheckboxInputProps> = ({ id, formData, label, error, onChange }) => {

    return (
        <FormGroup check>
            <Label for={id} check>
                {label}
            </Label>
            <Input
                id={id}
                name={id}
                type="checkbox"
                onChange={(e) => onChange(e, id)}
                checked={formData}
                {...(error ? { invalid: true } : { valid: true })} />
            {error &&
                <FormFeedback>
                    {error}
                </FormFeedback>}
        </FormGroup>
    );
};

export default CheckboxInput;