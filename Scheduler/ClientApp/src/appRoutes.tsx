import * as React from 'react';
import AdminContainer from './components/admin/adminContainer';
import ApiAuthorzationRoutes from './api-authorization/apiAuthorizationRoutes';
import ClinicContainer from './components/clinic/clinicContainer';
import NotFound from './components/common/notFound';
import DoctorContainer from './components/doctor/doctorContainer';
import Home from "./components/home";

interface Route {
  index?: boolean;
  path?: string;
  requireAuth?: boolean;
  element: JSX.Element;
}

const AppRoutes: Route[] = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/clinics',
    element: <ClinicContainer />
  },
  {
    path: '/:clinicName/doctors/*',
    element: <DoctorContainer />
  },
  {
    path: '/admin',
    requireAuth: true,
    element: <AdminContainer />
  },
  {
    path: '*',
    element: <NotFound buttonText='Начало' redirectUrl='/' />
  },
  ...ApiAuthorzationRoutes,
];

export default AppRoutes;
