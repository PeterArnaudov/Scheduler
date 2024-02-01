import { FormGroup, Input, Label } from "reactstrap";

const CheckboxFilter = ({ name, label, filterData, setFilterData }) => {
    const handleInputChange = (event) => {
        const { name, checked } = event.target;

        setFilterData((prevFilterData) => ({
            ...prevFilterData,
            [name]: checked,
        }));
    };

    return (
        <FormGroup check inline>
            <Input
                id={name}
                name={name}
                type="checkbox"
                onChange={handleInputChange}
                checked={filterData[name]} />
            <Label
                for={name}
                check>
                {label}
            </Label>
        </FormGroup>
    );
};

export default CheckboxFilter;