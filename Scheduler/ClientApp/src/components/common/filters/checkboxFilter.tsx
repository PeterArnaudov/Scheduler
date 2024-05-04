import React, { ChangeEvent, FC } from "react";
import { FormGroup, Input, Label } from "reactstrap";

interface CheckboxFilterProps {
    name: string,
    label: string,
    placeholder?: string,
    className?: string,
    filterData?: { [key: string]: boolean },
    setFilterData?: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>
};

const CheckboxFilter: FC<CheckboxFilterProps> = ({ name, label, filterData, setFilterData }) => {
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;

        if (setFilterData) {
            setFilterData((prevFilterData) => ({
                ...prevFilterData,
                [name]: checked,
            }));
        }
    };

    return (
        <FormGroup check inline>
            <Input
                id={name}
                name={name}
                type="checkbox"
                onChange={handleInputChange}
                checked={filterData && filterData[name] ? filterData[name] : false} />
            <Label
                for={name}
                check>
                {label}
            </Label>
        </FormGroup>
    );
};

export default CheckboxFilter;