import { useSelector } from 'react-redux';

const HomeAdmin = () => {
  const adminGlobal = useSelector((state) => state.adminReducer);
  const socket = useSelector((state) => state.socket.instance);

  return (
    <div className="h-full w-full">
      <div className="w-full py-5 px-4 flex flex-col">
        <span className="text-3xl font-bold text-sky-700">Dashboard</span>
        <span className="font-thin text-gray-500">Welcome, {adminGlobal?.name}!</span>
      </div>
      <button
        onClick={() => socket.emit('userNotif', 20)}
        className="h-8 w-24 rounded-lg bg-sky-500 font-bold text-white active:scale-95 transiton"
      >
        Alert User
      </button>
    </div>
  );
};

export default HomeAdmin;
