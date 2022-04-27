import axios from 'axios';
import { useState } from 'react';
import { FiChevronRight, FiMoreHorizontal, FiChevronLeft } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from '../assets/constants';

function CartPagination() {
  const [changePage, setChangePage] = useState(0);

  const userToken = localStorage.getItem('userToken');
  // redux
  const dispatch = useDispatch();
  const cartGlobal = useSelector((state) => state.cart);
  const userGlobal = useSelector((state) => state.user);

  const handleChangePage = async (page) => {
    try {
      const cartData = await axios.get(`${API_URL}/cart/get/${userGlobal.id}?page=${page}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      dispatch({ type: 'CART_LIST', payload: cartData.data });
    } catch (error) {
      alert(error);
    }
  };

  const rendPagination = () => {
    if (cartGlobal.cartList?.length) {
      let hiddenFirst = cartGlobal.active_page > 4;
      let hiddenLast = cartGlobal.active_page < cartGlobal.total_page - 4;
      let minBtn = cartGlobal.total_page <= 10;

      // set number pagination
      let button = [];

      if (minBtn) {
        for (let i = 1; i <= cartGlobal.total_page; i++) {
          if (i === cartGlobal.active_page) {
            button.push(<button className="btn btn-active">{i}</button>);
          } else {
            button.push(
              <button className="btn" onClick={() => handleChangePage(i)}>
                {i}
              </button>
            );
          }
        }
      } else if (hiddenFirst && hiddenLast) {
        button.push(<button className="btn btn-active">{cartGlobal.active_page}</button>);
      } else if (hiddenLast) {
        for (let i = 1; i <= cartGlobal.active_page; i++) {
          if (i === cartGlobal.active_page) {
            button.push(<button className="btn btn-active">{i}</button>);
          } else {
            button.push(
              <button className="btn" onClick={() => handleChangePage(i)}>
                {i}
              </button>
            );
          }
        }
      } else if (hiddenFirst) {
        for (let i = cartGlobal.active_page; i <= cartGlobal.total_page; i++) {
          if (i === cartGlobal.active_page) {
            button.push(<button className="btn btn-active">{i}</button>);
          } else {
            button.push(
              <button className="btn" onClick={() => handleChangePage(i)}>
                {i}
              </button>
            );
          }
        }
      }

      // set button pagination
      return (
        <>
          {/* prev button*/}
          {cartGlobal.active_page > 1 && (
            <div className="btn " onClick={() => handleChangePage(cartGlobal.active_page - 1)}>
              <FiChevronLeft size={20} />
            </div>
          )}
          {/* first number & more */}
          {hiddenFirst ? (
            <>
              {/* first number */}
              <button className="btn" onClick={() => handleChangePage(1)}>
                1
              </button>
              {/* more btn */}
              <div className="dropdown">
                <label tabindex="0" className="btn">
                  <FiMoreHorizontal size={20} />
                </label>
                <div tabindex="0" className="dropdown-content card card-compact w-36 p-2 shadow bg-gray-300 text-primary-content">
                  <div className="card-body">
                    <div className="form-control">
                      <div className="input-group input-group-md">
                        <input
                          type="number"
                          className="input input-bordered input-sm  max-w-xs w-12 text-gray-700"
                          onChange={(e) => setChangePage(parseInt(e.target.value))}
                        />
                        <button
                          className="btn btn-sm"
                          onClick={() => {
                            handleChangePage(changePage);
                          }}
                        >
                          Go
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}

          {/* number list */}
          {button}

          {/* last number & more */}
          {hiddenLast ? (
            <>
              {/* more btn */}
              <div className="dropdown">
                <label tabindex="0" className="btn">
                  <FiMoreHorizontal size={20} />
                </label>
                <div tabindex="0" className="dropdown-content card card-compact w-36 p-2 shadow bg-gray-300 text-primary-content">
                  <div className="card-body">
                    <div className="form-control">
                      <div className="input-group input-group-md">
                        <input
                          type="number"
                          className="input input-bordered input-sm max-w-xs w-12 text-gray-700"
                          onChange={(e) => setChangePage(parseInt(e.target.value))}
                        />
                        <button
                          className="btn btn-sm"
                          onClick={() => {
                            handleChangePage(changePage);
                          }}
                        >
                          Go
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* last btn */}
              <button
                className={cartGlobal.active_page === cartGlobal.total_page ? 'btn btn-active' : 'btn'}
                onClick={() => handleChangePage(cartGlobal.total_page)}
              >
                {cartGlobal.total_page}
              </button>
            </>
          ) : null}
          {/* next button */}
          {cartGlobal.active_page < cartGlobal.total_page && (
            <button className="btn" onClick={() => handleChangePage(cartGlobal.active_page + 1)}>
              <FiChevronRight size={20} />
            </button>
          )}
        </>
      );
    }
  };

  return <div>{cartGlobal.total_page > 1 && <div className="btn-group">{rendPagination()}</div>}</div>;
}

export default CartPagination;
