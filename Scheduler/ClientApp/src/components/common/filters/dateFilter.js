import { FormGroup, Input, Label } from "reactstrap";

const DateFilter = ({ name, label, className, filterData, setFilterData }) => {
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
                type="datetime-local"
                onChange={handleInputChange}
                value={filterData[name] || ''} />
        </FormGroup>
    );
};

export default DateFilter;