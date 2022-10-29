import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";

const UpdateUser = () => {
  const storedUser = useLoaderData();
  const [user, setUser] = useState(storedUser);
  const hendleUpdate = (e) => {
    e.preventDefault();
    console.log(user);

    fetch(`http://localhost:5000/users/${user._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          alert("updated");
        }
      });
  };

  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newUser = { ...user };
    newUser[field] = value;
    setUser(newUser);
  };
  return (
    <div>
      <h1>Please update: {storedUser.name}</h1>

      <form onSubmit={hendleUpdate}>
        <input
          onBlur={handleOnBlur}
          type="text"
          defaultValue={storedUser.name}
          name="name"
          id=""
          placeholder="Name"
        />
        <input
          onBlur={handleOnBlur}
          type="email"
          name="email"
          defaultValue={storedUser.email}
          id=""
          placeholder="Passwords"
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default UpdateUser;
