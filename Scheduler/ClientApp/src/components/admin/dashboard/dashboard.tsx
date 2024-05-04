import React, { FC } from "react";
import SummaryComponent from "./summaryComponent";

const Dashboard: FC = () => {
    return (
        <div className="row text-center">
            <SummaryComponent title='Запазени часове (общо)' data={25} />
            <SummaryComponent title='Запазени часове (този месец)' data={25} />
        </div>
    );
};

export default Dashboard;