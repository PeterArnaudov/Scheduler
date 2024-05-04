import React, { FC } from "react";
import { FormFeedback, FormGroup, Input, Label } from "reactstrap";

interface NumberInputProps {
    id: string,
    formData: number,
    label: string,
    placeholder?: string,
    error: string | undefined,
    onChange: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void
};

const NumberInput: FC<NumberInputProps> = ({ id, formData, label, placeholder, error, onChange }) => {
    return (
        <FormGroup className="">
            <Label for={id}>
                {label}
            </Label>
            <Input
                className="mb-2"
                id={id}
                name={id}
                placeholder={placeholder}
                type='number'
                onChange={(e) => onChange(e, id)}
                value={formData || ""}
                {...(error ? { invalid: true } : { valid: true })}>
            </Input>
            {error &&
                <FormFeedback>
                    {error}
                </FormFeedback>}
        </FormGroup>
    );
};

export default NumberInput;