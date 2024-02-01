import ReactSelect from "react-select";

const MultiSelectFilter = ({ options, name, label, customStyles, className, setFilterData }) => {
    const handleInputChange = (options) => {
        const values = options.map((option) => option.value);

        setFilterData((prevFilterData) => ({
            ...prevFilterData,
            [name]: values,
        }));
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