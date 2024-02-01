import SummaryComponent from "./summaryComponent";

const Dashboard = () => {
    return (
        <div className="row text-center">
            <SummaryComponent title='Запазени часове (общо)' data={25} />
            <SummaryComponent title='Запазени часове (този месец)' data={25} />
            <SummaryComponent  />
            <SummaryComponent />
            <SummaryComponent />
            <SummaryComponent />
            <SummaryComponent />
            <SummaryComponent />
            <SummaryComponent />
        </div>
    );
};

export default Dashboard;