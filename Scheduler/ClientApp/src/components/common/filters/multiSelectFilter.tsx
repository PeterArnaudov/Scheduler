import React from "react";
import ReactSelect, { ActionMeta, MultiValue } from "react-select";
import { Option } from "../../../models/items/option";

interface MultiSelectFilterProps {
    options: Option[],
    name: string,
    label: string,
    customStyles?: any, // Define the type for customStyles prop
    className?: string,
    setFilterData?: React.Dispatch<React.SetStateAction<MultiValue<Option>>>
};

const MultiSelectFilter: React.FC<MultiSelectFilterProps> = ({ options, name, label, customStyles, className, setFilterData }) => {
    const handleInputChange = (newValue: MultiValue<Option>, actionMeta: ActionMeta<Option>) => {
        if (!newValue) return;

        const values = newValue.map((option) => option.value);

        if (setFilterData) {
            setFilterData((prevFilterData) => ({
                ...prevFilterData,
                [name]: values,
            }));
        }
    };

    return (
        <ReactSelect
            className={className}
            closeMenuOnSelect={false}
            isMulti
            options={options}
            placeholder={label}
            noOptionsMessage={() => "Не са налични опции"}
            onChange={handleInputChange}
            styles={customStyles}
        />
    );
};

export default MultiSelectFilter;
