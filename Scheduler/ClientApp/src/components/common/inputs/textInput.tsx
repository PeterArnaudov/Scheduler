import React from "react";
import { FormFeedback, FormGroup, Input, Label } from "reactstrap";

interface TextInputProps {
    id: string,
    formData: string | undefined,
    label: string,
    placeholder?: string,
    error: string | undefined,
    onChange: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void
};

const TextInput: React.FC<TextInputProps> = ({ id, formData, label, placeholder, error, onChange }) => {
    return (
        <FormGroup>
            <Label for={id}>
                {label}
            </Label>
            <Input
                className="mb-2"
                id={id}
                name={id}
                placeholder={placeholder}
                type='text'
                onChange={(e) => onChange(e, id)}
                value={formData || ""}
                {...(error ? { invalid: true } : {})}>
            </Input>
            {error &&
                <FormFeedback>
                    {error}
                </FormFeedback>}
        </FormGroup>
    );
};

export default TextInput;