import React from 'react';
import { Container } from 'reactstrap';
import NavMenu from './navMenu';
var Layout = function (_a) {
    var children = _a.children;
    return (React.createElement("div", null,
        React.createElement(NavMenu, null),
        React.createElement(Container, null, children)));
};
export default Layout;
//# sourceMappingURL=layout.js.map