import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import ItemPage from "./pages/ItemPage/ItemPage.jsx";
import AddItem from "./components/AddItem/AddItem.js";
import EditItem from "./components/EditItem/EditItem.js";
import LoginSignup from "./pages/adminPage/Login.jsx";
import CartPage from "./pages/CartPage/CartPage.jsx";
import LoginButton from "./LoginButton.js";
import LogoutButton from "./LogoutButton.js";
import { useAuth0 } from "@auth0/auth0-react";

export const App = () => {
  const [items, setItems] = useState([]);
  // const [user, setUser] = useState(null);

  const [user, setUser] = useState(null, () => {
    const localData = localStorage.getItem("loggedInUser");
    return localData ? JSON.parse(localData) : null;
  });

  const { logout, isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return (
      <>
        <Routes>
          <Route
            path="/"
            element={<Home items={items} setItems={setItems} user={user} />}
          />
          <Route
            path="/:id"
            element={<ItemPage items={items} setItems={setItems} user={user} />}
          />
          <Route
            path="/newItem"
            element={<AddItem items={items} setItems={setItems} />}
          />
          <Route
            path="/editItem/:id"
            element={<EditItem items={items} setItems={setItems} />}
          />
          <Route
            path="/login"
            element={<LoginSignup user={user} setUser={setUser} />}
          />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </>
    );
  }
};
