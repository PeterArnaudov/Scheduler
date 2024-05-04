import React from "react";
import SummaryComponent from "./summaryComponent";
var Dashboard = function () {
    return (React.createElement("div", { className: "row text-center" },
        React.createElement(SummaryComponent, { title: '\u0417\u0430\u043F\u0430\u0437\u0435\u043D\u0438 \u0447\u0430\u0441\u043E\u0432\u0435 (\u043E\u0431\u0449\u043E)', data: 25 }),
        React.createElement(SummaryComponent, { title: '\u0417\u0430\u043F\u0430\u0437\u0435\u043D\u0438 \u0447\u0430\u0441\u043E\u0432\u0435 (\u0442\u043E\u0437\u0438 \u043C\u0435\u0441\u0435\u0446)', data: 25 })));
};
export default Dashboard;
//# sourceMappingURL=dashboard.js.map