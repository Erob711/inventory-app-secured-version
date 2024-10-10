//index.js
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider
    domain="dev-57j8ewiwddxcplk2.us.auth0.com"
    clientId="b6aA5Ymdgx4p1pbest4nFeMqCAdzWsz8"
    redirectUri={window.location.origin}
  >
    <div>
      <LoginButton />
      {/* <LogoutButton /> */}
      <Router>
        <App />
      </Router>
    </div>
  </Auth0Provider>
);
