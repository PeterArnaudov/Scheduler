import React, { useState } from "react";
import { Button, ButtonGroup, Form } from "reactstrap";

const FilterContainer = ({ initialFilterData, updateFilterData, className, children }) => {
    const [filterData, setFilterData] = useState({ ...initialFilterData });

    const childrenWithProps = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { filterData, setFilterData });
        }

        return child;
    });

    const handleSubmit = () => {
        updateFilterData(filterData);
    }

    const clearFilters = () => {
        setFilterData({});
        updateFilterData({});
    }

    return (
        <Form className={className} onSubmit={(e) => e.preventDefault()}>
            {childrenWithProps}
            <ButtonGroup className="gap-1 d-block mt-2">
                <Button
                    color="primary"
                    onClick={handleSubmit}>
                    Филтрирай
                </Button>
                <Button
                    color="secondary"
                    onClick={clearFilters}>
                    Изчисти филтрите
                </Button>
            </ButtonGroup>
        </Form>
    );
};

export default FilterContainer;