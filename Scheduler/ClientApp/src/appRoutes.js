import { __spreadArray } from "tslib";
import * as React from 'react';
import AdminContainer from './components/admin/adminContainer';
import ApiAuthorzationRoutes from './api-authorization/apiAuthorizationRoutes';
import ClinicContainer from './components/clinic/clinicContainer';
import NotFound from './components/common/notFound';
import DoctorContainer from './components/doctor/doctorContainer';
import Home from "./components/home";
var AppRoutes = __spreadArray([
    {
        index: true,
        element: React.createElement(Home, null)
    },
    {
        path: '/clinics',
        element: React.createElement(ClinicContainer, null)
    },
    {
        path: '/:clinicName/doctors/*',
        element: React.createElement(DoctorContainer, null)
    },
    {
        path: '/admin',
        requireAuth: true,
        element: React.createElement(AdminContainer, null)
    },
    {
        path: '*',
        element: React.createElement(NotFound, { buttonText: '\u041D\u0430\u0447\u0430\u043B\u043E', redirectUrl: '/' })
    }
], ApiAuthorzationRoutes, true);
export default AppRoutes;
//# sourceMappingURL=appRoutes.js.map