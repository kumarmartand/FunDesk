import React from 'react';
import { 
  unstable_HistoryRouter as HistoryRouter,
  Routes, Route, Navigate, Outlet
} from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import NotFound from '../Components/ErrorPage/NotFound';
import LogOut from '../Components/LogOut/logOut';
import LandingPage from '../modules/landing/pages/LandingPage';
import SessionMaster from '../modules/master/pages/Session/Session';
import ClassesMaster from '../modules/master/pages/Classes/Class';
import SectionMaster from '../modules/master/pages/Sections/Sections';
import FeeGroupMaster from '../modules/fee/pages/FeeGroup/FeeGroup';
import FeeTypeMaster from '../modules/fee/pages/FeeType/FeeType';
import FeeMaster from '../modules/fee/pages/FeeMaster/FeeMaster';
import FeeDiscountMaster from '../modules/fee/pages/FeeDiscount/FeeDiscount';
import RoutesMaster from '../modules/transport/pages/Route/Routes';
import PickUpPointMaster from '../modules/transport/pages/PickUpPoint/PickUpPoint';
import PickUpPointMapping from '../modules/transport/pages/PickUpPointMapping/PickUpPointMapping';
import VehiclesMaster from '../modules/transport/pages/Vehicle/Vehicles';
import VehicleMappingMaster from '../modules/transport/pages/VehicleMapping/VehicleMapping';
import RoomTypeMaster from '../modules/hostel/pages/RoomType/RoomType';
import HostelMaster from '../modules/hostel/pages/Hostel/Hostel';
import HostelRoomMaster from '../modules/hostel/pages/RoomMapping/RoomMapping';
import HousesMaster from '../modules/master/pages/House/House';
import Student from '../modules/student/Pages/Student';

const LoginPage = React.lazy(() => import('../Components/LoginPage/LoginPage'));

export interface AppRoute {
  path: string;
  index?: boolean;
  children?: AppRoute[];
  element?: React.ReactNode;
  layout?: boolean | string;
  requiredPermissions?: string[] | null;
  hideInNav?: boolean;
}

// Protected Route wrapper that includes MainLayout
export const RequireAuth: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <MainLayout>
      {children || <Outlet />}
    </MainLayout>
  );
};

// Create placeholder components for demonstration
const Dashboard = () => <div style={{ padding: '20px' }}>
  <h2>Dashboard</h2>
  <p>Welcome to the dashboard!</p>
</div>;

const StudentMaster = () => <div style={{ padding: '20px' }}>
  <h2>Student Master</h2>
  <p>Manage student information here.</p>
</div>;

const StudentAttendance = () => <div style={{ padding: '20px' }}>
  <h2>Student Attendance</h2>
  <p>Track student attendance here.</p>
</div>;

const StudentFee = () => <div style={{ padding: '20px' }}>
  <h2>Student Fee</h2>
  <p>Manage student fees here.</p>
</div>;

const Staff = () => <div style={{ padding: '20px' }}>
  <h2>Staff Management</h2>
  <p>Manage staff information here.</p>
</div>;

const Accounts = () => <div style={{ padding: '20px' }}>
  <h2>Accounts</h2>
  <p>Manage accounts here.</p>
</div>;

const AboutUs = () => <div style={{ padding: '20px' }}>
  <h2>About Us</h2>
  <p>Learn more about our institution.</p>
</div>;

const AppRouter: React.FC<{ history: any }> = ({ history }) => {
  return (
    <HistoryRouter history={history}>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogOut />} />
        
        {/* Protected routes with layout */}
        <Route path="/" element={<RequireAuth />}>
          <Route index element={<LandingPage />} />
          <Route path="dashboard" element={<LandingPage />} />

          {/* HR routes */}
          <Route path="fees">
            <Route path="/fees/group" element={<FeeGroupMaster />} />
            <Route path="/fees/type" element={<FeeTypeMaster />} />
            <Route path="/fees/discount" element={<FeeDiscountMaster />} />
            <Route path="/fees/master" element={<FeeMaster />} />
          </Route>
          
          {/* Masters routes */}
          <Route path="masters">
            <Route path="session" element={<SessionMaster />} />
            <Route path="classes" element={<ClassesMaster />} />
            <Route path="section" element={<SectionMaster />} />
            <Route path="houses" element={<HousesMaster />} />
          </Route>
          {/* Transport routes */}
          <Route path="transport">
            <Route path="routes" element={<RoutesMaster />} />
            <Route path="pickup-points" element={<PickUpPointMaster />} />
            <Route path="route-pickup-points" element={<PickUpPointMapping />} />
            <Route path="vehicles" element={<VehiclesMaster />} />
            <Route path="route-vehicles" element={<VehicleMappingMaster />} />
          </Route>
          <Route path="hostel">
            <Route path="room-types" element={<RoomTypeMaster />} />
            <Route path="hostels" element={<HostelMaster />} />
            <Route path="rooms" element={<HostelRoomMaster />} />
          </Route>
          {/* Student routes */}
          <Route path="student" element={<Student />} />
          <Route path="about" element={<AboutUs />} />
        </Route>
        
        {/* Catch all route */}
        <Route path="*" element={<RequireAuth><NotFound /></RequireAuth>} />
      </Routes>
    </HistoryRouter>
  );
};

export default AppRouter;