import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../assets/constants';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userGlobal = useSelector((state) => state.user);

  return (
    <div className="h-screen">
      {/* silahkan di timpa dgn navbar yg asli.. hanya placeholder utk tes functionality */}
      <div className="h-[80px] w-full px-8 bg-pink-200 flex items-center">
        <div className="h-full w-max mr-auto flex items-center">
          {userGlobal.name ? (
            <span className="text-lg font-bold text-rose-700">Hello, {userGlobal.name}!</span>
          ) : (
            <span className="text-xl font-bold text-rose-600 hover:brightness-110 transition cursor-pointer">Logo</span>
          )}
        </div>
        {userGlobal.name ? (
          <div>
            <button
              className="py-2 px-4 rounded-full text-white font-semibold bg-rose-800 hover:brightness-110 transition"
              onClick={() => {
                window.open(`${API_URL}/auth/logout`, '_self');
                localStorage.removeItem('userToken');
                dispatch({
                  type: 'USER_LOGOUT',
                });
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="h-full w-max flex items-center gap-4">
            <button
              onClick={() => navigate('/login')}
              className="text-lg font-bold text-rose-600 hover:brightness-110 cursor-pointer transition active:scale-95"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/register')}
              className="py-2 px-4 rounded-full bg-pink-400 text-white font-semibold hover:brightness-110 transition active:scale-95"
            >
              Register
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
