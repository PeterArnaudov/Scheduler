import React, { ChangeEvent, FC } from "react";
import { FormGroup, Input, Label } from "reactstrap";

interface TextFilterProps {
    name: string,
    label: string,
    placeholder?: string,
    className?: string,
    filterData?: { [key: string]: string | undefined },
    setFilterData?: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>
};

const TextFilter: FC<TextFilterProps> = ({ name, label, placeholder, className, filterData, setFilterData }) => {
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        if (setFilterData) {
            setFilterData((prevFilterData) => ({
                ...prevFilterData,
                [name]: value,
            }));
        }
    };

    return (
        <FormGroup className={className}>
            <Label for={name}>
                {label}
            </Label>
            <Input
                id={name}
                name={name}
                type="text"
                placeholder={placeholder}
                onChange={handleInputChange}
                value={filterData && filterData[name] ? filterData[name] : ""} />
        </FormGroup>
    );
};

export default TextFilter;