import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import NotFound from "./components/utlis/NotFound";
import Login from "./components/pages/Login";
import Overview from "./components/pages/Overview";
import AddStaff from "./components/pages/AddStaff";

import Medicine from "./components/pages/Medicine";
import Illnesses from "./components/pages/Illnesses";
import Quantity from "./components/pages/Quantity";
import MainLayout from "./components/pages/layouts/MainLayout";
import AuthProtectedUtils from "./components/utlis/AuthProtectedUtils";
import UpdatePrice from "./components/pages/UpdatePrice";
import Profile from "./components/pages/Profile";

const App = () => {
  document.body.style.backgroundColor = "#D0DBD8";

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
        <Route
          element={
            <AuthProtectedUtils>
              <MainLayout />
            </AuthProtectedUtils>
          }
        >
          <Route path="/" element={<Overview />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/addstaff" element={<AddStaff />} />
          <Route path="/updateprice" element={<UpdatePrice />} />
          <Route path="/medicine" element={<Medicine />} />
          <Route path="/illnesses" element={<Illnesses />} />
          <Route path="/quantity" element={<Quantity />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
