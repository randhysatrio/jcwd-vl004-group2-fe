import { API_URL } from "../assets/constants";

const UserTable = ({ user, handleStatusClick }) => {
  let status = user.active;

  return (
    <tr>
      <td className="font-medium text-center py-8">{user.id}</td>
      <td className="font-medium text-center py-8">
        <img
          src={`${API_URL}/${user.profile_picture}`}
          className="w-40 aspect-[3/2] rounded-lg object-cover object-top border border-gray-200"
        />
      </td>
      <td className="font-medium text-center py-8">{user.name}</td>
      <td className="font-medium text-center py-8">{user.email}</td>
      <td className="font-medium text-center py-8">{user.phone_number}</td>
      {status ? (
        <td className="font-medium text-center py-8">Active</td>
      ) : (
        <td className="font-medium text-center py-8">Inactive</td>
      )}
      <td className="flex justify-center items-center text-center py-16">
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
