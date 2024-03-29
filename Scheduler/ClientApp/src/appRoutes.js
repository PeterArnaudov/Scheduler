import AdminContainer from './components/admin/adminContainer';
import ApiAuthorzationRoutes from './components/api-authorization/apiAuthorizationRoutes';
import ClinicContainer from './components/clinic/clinicContainer';
import NotFound from './components/common/notFound';
import DoctorContainer from './components/doctor/doctorContainer';
import Home from "./components/home";

const AppRoutes = [
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
