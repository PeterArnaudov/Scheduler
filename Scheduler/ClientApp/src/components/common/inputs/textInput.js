import { FormFeedback, FormGroup, Input, Label } from "reactstrap";

const TextInput = ({ id, formData, label, placeholder, error, onChange }) => {
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