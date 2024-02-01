import ReactSelect from "react-select";
import { FormGroup, Label } from "reactstrap";

const SelectInput = ({ id, formData, options, label, placeholder, isMulti, isDisabled, error, onChange }) => {
    var defaultValue = null;

    if (formData) {
        if (Array.isArray(formData)) {
            defaultValue = options.filter(x => formData.includes(x.value));
        }
        else {
            defaultValue = options.filter(x => x.value === formData);
        }
    }

    return (
        <FormGroup>
            <Label for={id}>
                {label}
            </Label>
            <ReactSelect
                isDisabled={isDisabled}
                isMulti={isMulti}
                closeMenuOnSelect={!isMulti}
                id={id}
                name={id}
                options={options}
                placeholder={placeholder}
                {...(defaultValue ? { value: defaultValue } : {})}
                noOptionsMessage={() => "Не са налични опции"}
                onChange={onChange}
            />
            {error &&
                <div class="invalid-feedback d-inline-block">Моля, попълнете продължителност.</div>
            }
        </FormGroup>
    );
};

export default SelectInput;