import { FormFeedback, FormGroup, Input, Label } from "reactstrap";

const CheckboxInput = ({ id, formData, label, error, onChange }) => {

    return (
        <FormGroup check>
            <Label for={id} check>
                {label}
            </Label>
            <Input
                id={id}
                name={id}
                type="checkbox"
                onChange={onChange}
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