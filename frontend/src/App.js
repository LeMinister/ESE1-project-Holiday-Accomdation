import React from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Properties from "./pages/Properties";
import ManageBooking from "./pages/ManageBooking";

function App() {

  return (
    <div>

      <h1>Holiday Booking System</h1>

      <Properties />

      <Login />

      <Register />

      <ManageBooking />

    </div>
  );
}

export default App;