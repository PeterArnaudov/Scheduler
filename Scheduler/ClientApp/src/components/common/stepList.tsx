import React, { FC } from "react";
import { Badge, Card, CardBody, CardGroup, CardHeader, CardSubtitle } from "reactstrap";
import { StepListItem } from "../../models/items/stepListItem";

interface StepListProps {
    steps: StepListItem[]
};

const StepList: FC<StepListProps> = ({ steps }) => {
    return (
        <CardGroup>
            {steps?.map((x, index) => (
                <Card key={index} color="light">
                    <CardHeader className="fw-bold">
                        <Badge className="me-2" color="primary">
                            {index + 1}
                        </Badge>
                        {x.title}
                    </CardHeader>
                    <CardBody>
                        <CardSubtitle>
                            {x.description}
                        </CardSubtitle>
                        {x.children}
                    </CardBody>
                </Card>
            ))}
        </CardGroup>
    );
};

export default StepList;