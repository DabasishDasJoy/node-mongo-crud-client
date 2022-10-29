import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const Home = () => {
  const users = useLoaderData();
  const [displayUsers, setDisplayUsers] = useState(users);
  console.log("🚀 ~ file: Home.jsx ~ line 6 ~ Home ~ users", users);

  const handleDelete = (user) => {
    const agree = window.confirm(
      `Are you sure you want to delete ${user.name}`
    );
    if (agree) {
      fetch(`http://localhost:5000/users/${user._id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("🚀 ~ file: Home.jsx ~ line 19 ~ .then ~ data", data);
          if (data.deletedCount) {
            alert("Succesfully deleted");
            const remaining = displayUsers.filter(
              (usr) => usr._id !== user._id
            );
            setDisplayUsers(remaining);
          }
        });
    }
  };
  return (
    <div>
      <h1>User: {displayUsers.length}</h1>
      <div>
        {displayUsers.map((user) => (
          <p key={user._id}>
            {user.name} - {user.email}
            <Link to={`/updateUser/${user._id}`}>
              <button>Update</button>
            </Link>
            <button onClick={() => handleDelete(user)}>X</button>
          </p>
        ))}
      </div>
    </div>
  );
};

export default Home;
