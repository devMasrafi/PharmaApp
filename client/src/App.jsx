import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import Overview from "./components/pages/Overview";
import AddStaff from "./components/pages/AddStaff";
import Expiery from "./components/pages/Expiery";
import Medicine from "./components/pages/Medicine";
import Illnesses from "./components/pages/Illnesses";
import Quantity from "./components/pages/Quantity";
import MainLayout from "./components/pages/layouts/MainLayout";

const App = () => {
  document.body.style.backgroundColor = "#D0DBD8";

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
        <Route element={<MainLayout/>}>
          <Route path="/" element={<Overview />} />
          <Route path="/addstaff" element={<AddStaff />} />
          <Route path="/expiery" element={<Expiery />} />
          <Route path="/medicine" element={<Medicine />} />
          <Route path="/illnesses" element={<Illnesses />} />
          <Route path="/quantity" element={<Quantity />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
