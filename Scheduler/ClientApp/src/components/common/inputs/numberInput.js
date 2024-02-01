import { FormFeedback, FormGroup, Input, Label } from "reactstrap";

const NumberInput = ({ id, formData, label, placeholder, error, onChange }) => {
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