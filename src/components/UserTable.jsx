import { API_URL } from "../assets/constants";
import noAvatar from "../assets/images/noAvatar.png";

const UserTable = ({ user, handleStatusClick }) => {
  let status = user.active;

  return (
    <tr className="border-b border-gray-200">
      <td className="justify-center items-center text-center p-4">{user.id}</td>
      <td className="justify-center items-center text-center p-4">
        <img
          src={
            // user.profile_picture
            //   ? `${API_URL}/${user.profile_picture}`
            //   : { noAvatar }
            noAvatar
          }
          className="w-12 m-auto h-12 rounded-full border border-gray-200"
        />
      </td>
      <td className="justify-center items-center text-center p-4">
        {user.name}
      </td>
      <td className="justify-center items-center text-center p-4">
        {user.email}
      </td>
      <td className="justify-center items-center text-center p-4">
        {user.phone_number}
      </td>
      {status ? (
        <td className="justify-center items-center text-center p-4">
          <button
            type="button"
            className="py-1 px-4 text-white bg-green-500 rounded-xl items-center"
          >
            Active
          </button>
        </td>
      ) : (
        <td className="justify-center items-center text-center p-4">
          <button
            type="button"
            className="py-1 px-3 text-white bg-red-500 rounded-xl items-center"
          >
            Inactive
          </button>
        </td>
      )}
      <td className="justify-center items-center text-center p-4">
        <button
          type="button"
          className="py-2.5 px-6 text-white bg-primary hover:bg-blue-400 rounded-xl items-center"
          onClick={() => handleStatusClick(user.id)}
        >
          Change Status
        </button>
      </td>
    </tr>
  );
};

export default UserTable;
