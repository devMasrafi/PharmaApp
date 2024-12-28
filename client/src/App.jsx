import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import MainLayout from "./pages/layouts/MainLayout";
import Login from "./pages/Login";
import NotFound from "./components/utlis/NotFound";
import AuthProtectedUtils from "./components/utlis/AuthProtectedUtils";
import Overview from "./pages/Overview";
import Profile from "./pages/Profile";
import AddStaff from "./pages/AddStaff";
import UpdatePrice from "./pages/UpdatePrice";
import Medicine from "./pages/Medicine";
import Illnesses from "./pages/Illnesses";
import Quantity from "./pages/Quantity";





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
              < MainLayout/>
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
