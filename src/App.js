import React, { useState, useEffect } from "react";
import List from "./component/List";
import Alert from "./component/Alert";
const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("list")));
  } else {
    return [];
  }
};
function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  const [isFavourite, setIsFavourite] = useState(false);
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "danger", "please enter friend's name");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "success", "friend changed");
    } else {
      showAlert(true, "success", "friend added to the list");
      const newItem = {
        id: new Date().getTime().toString(),
        title: name,
        starred: isFavourite,
      };

      setList([...list, newItem]);
      setName("");
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const clearList = () => {
    showAlert(true, "danger", "empty friends");
    setList([]);
  };

  const removeItem = (id) => {
    showAlert(true, "danger", "friend removed");
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);

    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };

  const setFavouriteItem = (id) => {
    setList(
      list.map((item) => {
        if (item.id === id) {
          return { ...item, starred: !isFavourite };
        }
        return item;
      })
    );
    setIsFavourite(!isFavourite);
  };

  const handleSorting = () => {
    if (list.length) {
      const sortedList = list.slice().sort((a, b) => b.starred - a.starred);
      setList(sortedList);
    }
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <section className="section-center">
      <form className="friends-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}

        <h3>Friends List</h3>
        <div className="form-control">
          <input
            type="text"
            className="friends"
            placeholder="Enter your friend's name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>

      {list.length > 0 && (
        <div className="friends-container">
          <div className="search">
            <input
              type="search"
              className="friends"
              placeholder="Search friends"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button type="button" className="sort" onClick={handleSorting}>
            Sort
          </button>
          <List
            searchQuery={query}
            items={list}
            removeItem={removeItem}
            editItem={editItem}
            isFavourite={isFavourite}
            setFavouriteItem={setFavouriteItem}
          />
          <button className="clear-btn" onClick={clearList}>
            clear friends
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
