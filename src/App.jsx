import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AddNewUser from "./components/AddNewUser";
import Home from "./components/Home";
import UpdateUser from "./components/UpdateUser";

function App() {
  const [count, setCount] = useState(0);

  const router = createBrowserRouter([
    {
      path: "/",
      loader: () => {
        return fetch("http://localhost:5000/users");
      },
      element: <Home></Home>,
    },
    {
      path: "/adduser",
      element: <AddNewUser></AddNewUser>,
    },
    {
      path: "/updateUser/:id",
      loader: ({ params }) => {
        return fetch(`http://localhost:5000/users/${params.id}`);
      },
      element: <UpdateUser></UpdateUser>,
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
