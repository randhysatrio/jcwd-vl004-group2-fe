import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import NavbarDashboard from '../components/NavbarDashboard';
import SidebarDashboard from '../components/SidebarDashboard';
import { Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const adminGlobal = useSelector((state) => state.adminReducer);
  const socket = useSelector((state) => state.socket.instance);

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    const userToken = localStorage.getItem('userToken');

    if (userToken) {
      navigate('/', { replace: true });
    } else if (!adminToken) {
      navigate('/admin/login');
    }
  }, []);

  useEffect(() => {
    if (adminGlobal.id) {
      socket?.emit('adminJoin', adminGlobal.id);

      socket?.on('newAdminNotif', () => {
        dispatch({ type: 'ALERT_NEW', payload: 'alert' });
        toast.info('You have 1 new notification(s)', { position: 'top-center', theme: 'colored' });
      });
    }
  }, [socket]);

  return (
    <div className="h-screen flex flex-col">
      <NavbarDashboard />
      <SidebarDashboard />
      <div className="flex h-full pt-16 pl-44 pr-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
