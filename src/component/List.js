import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

const List = ({
  items,
  removeItem,
  editItem,
  setFavouriteItem,
  searchQuery,
}) => {
  const filteredItems = items.filter((item) =>
    item?.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="friends-list">
      {filteredItems.map((item) => {
        const { id, title, starred } = item;
        return (
          <article className="friends-item" key={id}>
            <p className="title">{title}</p>
            <div className="btn-container">
              {starred ? (
                <button
                  type="button"
                  className="fillStar"
                  onClick={() => setFavouriteItem(id)}
                >
                  <AiFillStar />
                </button>
              ) : (
                <button
                  type="button"
                  className="outLineStar"
                  onClick={() => setFavouriteItem(id)}
                >
                  <AiOutlineStar />
                </button>
              )}
              <button
                type="button"
                className="edit-btn"
                onClick={() => editItem(id)}
              >
                <FaEdit />
              </button>
              <button
                type="button"
                className="delete-btn"
                onClick={() => removeItem(id)}
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
