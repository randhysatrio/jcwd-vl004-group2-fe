import { useState } from "react";

const DropdownCategories = (selected, setSelected, category) => {
  const [isActive, setIsActive] = useState(false);
  //   const [categories, setCategories] = useState([]);

  //   const fetchCategories = async () => {
  //     const res = await axios.get(`http://localhost:5000/category/all`);
  //     setCategories(res.data);
  //   };

  //   useEffect(() => {
  //     fetchCategories();
  //   }, []);

  return (
    <div className="dropdown">
      <div className="dropdown-btn" onClick={(e) => setIsActive(!isActive)}>
        Choose Category
        {/* <span className=""></span> */}
      </div>
      {isActive && (
        <div className="dropdown-content">
          {category.map((option) => (
            <div
              onClick={(e) => {
                setSelected(option);
                setIsActive(false);
              }}
              className="dropdown-items"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownCategories;
