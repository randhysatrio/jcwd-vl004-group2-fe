import { useState } from 'react';
import {
  FiChevronLeft,
  FiChevronRight,
  FiMoreHorizontal,
} from 'react-icons/fi';

function CartPagination({
  cart,
  switchPage,
  nextPage,
  prevPage,
  switchPageInput,
}) {
  const [changePage, setChangePage] = useState(0);

  const rendPagination = () => {
    if (cart?.cartList?.length) {
      let hiddenFirst = cart?.active_page > 4;
      let hiddenLast = cart?.active_page < cart?.total_page - 4;
      let minBtn = cart?.total_page <= 10;

      // set number pagination
      let button = [];

      if (minBtn) {
        for (let i = 1; i <= cart?.total_page; i++) {
          if (i === cart?.active_page) {
            button.push(<button className="btn btn-active">{i}</button>);
          } else {
            button.push(
              <button className="btn" onClick={switchPage}>
                {i}
              </button>
            );
          }
        }
      } else if (hiddenFirst && hiddenLast) {
        button.push(
          <button className="btn btn-active">{cart?.active_page}</button>
        );
      } else if (hiddenLast) {
        for (let i = 1; i <= cart?.active_page; i++) {
          if (i === cart?.active_page) {
            button.push(<button className="btn btn-active">{i}</button>);
          } else {
            button.push(
              <button className="btn" onClick={switchPage}>
                {i}
              </button>
            );
          }
        }
      } else if (hiddenFirst) {
        for (let i = cart?.active_page; i <= cart?.total_page; i++) {
          if (i === cart?.active_page) {
            button.push(<button className="btn btn-active">{i}</button>);
          } else {
            button.push(
              <button className="btn" onClick={switchPage}>
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
          {cart?.active_page > 1 && (
            <div className="btn " onClick={prevPage}>
              <FiChevronLeft size={20} />
            </div>
          )}
          {/* first number & more */}
          {hiddenFirst ? (
            <>
              {/* first number */}
              <button className="btn" onClick={switchPage}>
                1
              </button>
              {/* more btn */}
              <div className="dropdown">
                <label tabindex="0" className="btn">
                  <FiMoreHorizontal size={20} />
                </label>
                <div
                  tabindex="0"
                  className="dropdown-content card card-compact w-36 p-2 shadow bg-gray-300 text-primary-content"
                >
                  <div className="card-body">
                    <div className="form-control">
                      <div className="input-group input-group-md">
                        <input
                          type="number"
                          className="input input-bordered input-sm w-full max-w-xs w-12 text-gray-700"
                          onChange={(e) =>
                            setChangePage(parseInt(e.target.value))
                          }
                        />
                        <button
                          value={changePage}
                          className="btn btn-sm"
                          onClick={switchPageInput}
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
                <div
                  tabindex="0"
                  className="dropdown-content card card-compact w-36 p-2 shadow bg-gray-300 text-primary-content"
                >
                  <div className="card-body">
                    <div className="form-control">
                      <div className="input-group input-group-md">
                        <input
                          type="number"
                          className="input input-bordered input-sm w-full max-w-xs w-12 text-gray-700"
                          onChange={(e) =>
                            setChangePage(parseInt(e.target.value))
                          }
                        />
                        <button
                          value={changePage}
                          className="btn btn-sm"
                          onClick={switchPageInput}
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
                className={
                  cart?.active_page === cart?.total_page
                    ? 'btn btn-active'
                    : 'btn'
                }
                onClick={switchPage}
              >
                {cart?.total_page}
              </button>
            </>
          ) : null}
          {/* next button */}
          {cart?.active_page < cart?.total_page && (
            <button className="btn" onClick={nextPage}>
              <FiChevronRight size={20} />
            </button>
          )}
        </>
      );
    }
  };

  return (
    <div>
      {cart?.total_page > 1 && (
        <div className="btn-group">{rendPagination()}</div>
      )}
    </div>
  );
}

export default CartPagination;
