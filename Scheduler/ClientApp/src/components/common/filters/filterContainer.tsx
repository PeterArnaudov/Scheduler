import React, { useState, ReactNode } from "react";
import { Button, ButtonGroup, Form, FormProps } from "reactstrap";

interface FilterContainerProps extends FormProps {
    initialFilterData: { [key: string]: any };
    updateFilterData: (filterData: any ) => void;
    children: ReactNode | ReactNode[];
}

const FilterContainer: React.FC<FilterContainerProps> = ({ initialFilterData, updateFilterData, className, children }) => {
    const [filterData, setFilterData] = useState({ ...initialFilterData });

    const childrenWithProps = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            const elementProps = {
                filterData, setFilterData
            };

            return React.cloneElement(child, elementProps);
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
