import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const HomeAdmin = () => {
  const globalState = useSelector((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem('tokenAdmin');
    if (!token) navigate('/admin/login');
  }, []);

  return (
    <div className="flex justify-between items-center px-5 h-14">
      <h1> Home Admin</h1>
      <div className="flex justify-between items-center w-36">
        {globalState.adminReducer.id ? (
          <>
            <span>Halo {globalState.adminReducer.name}</span>
            <button
              onClick={() => {
                localStorage.removeItem('tokenAdmin');
                localStorage.removeItem('dataAdmin');
                navigate('/admin/login');
              }}
            >
              logout
            </button>
          </>
        ) : (
          <Link to="/admin/login">login</Link>
        )}
      </div>
    </div>
  );
};

export default HomeAdmin;
