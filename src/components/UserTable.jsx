import { API_URL } from "../assets/constants";
import noAvatar from "../assets/images/noAvatar.png";

const UserTable = ({ user, handleStatusClick }) => {
  let status = user.active;

  return (
    <tr className="border-b border-gray-200">
      <td className="font-medium text-center">{user.id}</td>
      <td className="font-medium text-center">
        <img
          src={
            // user.profile_picture
            //   ? `${API_URL}/${user.profile_picture}`
            //   : { noAvatar }
            noAvatar
          }
          className="w-12 m-auto h-12 aspect-[3/2] rounded-full object-cover border border-gray-200"
        />
      </td>
      <td className="font-medium text-center">{user.name}</td>
      <td className="font-medium text-center">{user.email}</td>
      <td className="font-medium text-center">{user.phone_number}</td>
      {status ? (
        <td className="font-medium text-center">Active</td>
      ) : (
        <td className="font-medium text-center">Inactive</td>
      )}
      <td className="flex justify-center items-center text-center py-24">
        <button
          type="button"
          className="py-2.5 px-6 text-white bg-red-500 hover:bg-red-400 rounded-xl items-center"
          onClick={() => handleStatusClick(user.id)}
        >
          Change Status
        </button>
      </td>
    </tr>
  );
};

export default UserTable;
