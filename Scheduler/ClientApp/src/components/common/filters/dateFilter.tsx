import React, { ChangeEvent } from "react";
import { FormGroup, Input, Label } from "reactstrap";
import { formatDateTimeLocal } from "../../../helpers/formatters/dateFormatter";

interface DateFilterProps {
    name: string,
    label: string,
    className?: string,
    filterData?: { [key: string]: Date },
    setFilterData?: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>
};

const DateFilter: React.FC<DateFilterProps> = ({ name, label, className = "", filterData, setFilterData }) => {
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
            <Label for={name}>{label}</Label>
            <Input
                id={name}
                name={name}
                type="datetime-local"
                onChange={handleInputChange}
                value={filterData && filterData[name] ? formatDateTimeLocal(filterData[name]) : ""}
            />
        </FormGroup>
    );
};

export default DateFilter;
