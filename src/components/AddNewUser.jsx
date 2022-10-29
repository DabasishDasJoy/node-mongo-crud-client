import React, { useState } from "react";

const AddNewUser = () => {
  const [user, setUser] = useState({});
  const hendleSubmit = (e) => {
    e.preventDefault();
    console.log(user);

    fetch("http://localhost:5000/users", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.acknowledged) {
          alert("Success");
          e.target.reset();
        }
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
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
      <form onSubmit={hendleSubmit}>
        <input
          onBlur={handleOnBlur}
          type="text"
          name="name"
          id=""
          placeholder="Name"
        />
        <input
          onBlur={handleOnBlur}
          type="email"
          name="email"
          id=""
          placeholder="Passwords"
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default AddNewUser;
