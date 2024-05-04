import React, { FC } from "react";
import ReactSelect, { ActionMeta, MultiValue, SingleValue } from "react-select";
import { FormGroup, Label } from "reactstrap";
import { Option } from "../../../models/items/option";

interface SelectInputProps {
    id: string,
    formData: any,
    options: Option[],
    label: string,
    placeholder?: string,
    isMulti?: boolean,
    isDisabled?: boolean,
    error?: string,
    onChange: (newValue: SingleValue<Option> | MultiValue<Option>, actionMeta: ActionMeta<Option>) => void
};

const SelectInput: FC<SelectInputProps> = ({ id, formData, options, label, placeholder, isMulti = false, isDisabled = false, error, onChange }) => {
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
                <div className="invalid-feedback d-inline-block">{error}</div>
            }
        </FormGroup>
    );
};

export default SelectInput;