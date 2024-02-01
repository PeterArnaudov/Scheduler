import { FormFeedback, FormGroup, Input, Label } from "reactstrap";
import { formatDateTimeLocal } from "../../../helpers/formatters/dateFormatter";

const DateTimeInput = ({ id, formData, label, error, onChange }) => {

    return (
        <FormGroup>
            <Label for={id}>
                {label}
            </Label>
            <Input
                id={id}
                name={id}
                type="datetime-local"
                onChange={onChange}
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