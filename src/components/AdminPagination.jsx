const AdminPagination = ({ pagination, setPage }) => {
  return (
    <div>
      <button
        value={pagination}
        className="hover cursor-pointer m-3 p-1 bg-primary text-white rounded-lg focus:bg-black"
        onClick={() => setPage(pagination)}
      >
        {pagination}
      </button>
    </div>
  );
};

export default AdminPagination;
