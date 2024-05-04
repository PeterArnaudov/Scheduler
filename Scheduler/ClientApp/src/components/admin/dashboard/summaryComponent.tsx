import React, { FC } from "react";

interface SummaryComponentProps {
    title: string,
    data: string | number
};

const SummaryComponent: FC<SummaryComponentProps> = ({ title, data }) => {

    return (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card mb-4">
                <div className="card-body">
                    <div className="card-title text-disabled">{title}</div>
                    <div className="fs-4 fw-bolder pb-3">{data}</div>
                </div>
            </div>
        </div>
    )
};

export default SummaryComponent;