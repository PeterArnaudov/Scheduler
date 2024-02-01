import { FormGroup, Input, Label } from "reactstrap";

const TextFilter = ({ name, label, placeholder, className, filterData, setFilterData }) => {
    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setFilterData((prevFilterData) => ({
            ...prevFilterData,
            [name]: value,
        }));
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
                value={filterData[name]} />
        </FormGroup>
    );
};

export default TextFilter;