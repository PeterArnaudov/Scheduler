import React from "react";
import { Badge, Card, CardBody, CardGroup, CardHeader, CardSubtitle } from "reactstrap";
;
var StepList = function (_a) {
    var steps = _a.steps;
    return (React.createElement(CardGroup, null, steps === null || steps === void 0 ? void 0 : steps.map(function (x, index) { return (React.createElement(Card, { key: index, color: "light" },
        React.createElement(CardHeader, { className: "fw-bold" },
            React.createElement(Badge, { className: "me-2", color: "primary" }, index + 1),
            x.title),
        React.createElement(CardBody, null,
            React.createElement(CardSubtitle, null, x.description),
            x.children))); })));
};
export default StepList;
//# sourceMappingURL=stepList.js.map