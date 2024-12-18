import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import Overview from "./components/paegs/Overview";
import AddStaff from "./components/paegs/AddStaff";
import Expiery from "./components/paegs/Expiery";
import Medicine from "./components/paegs/Medicine";
import Illnesses from "./components/paegs/Illnesses";
import Quantity from "./components/paegs/Quantity";

const App = () => {
  document.body.style.backgroundColor = "#D0DBD8";

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
        <Route>
          <Route path="/" element={<Overview />} />
          <Route path="/addStaff" element={<AddStaff />} />
          <Route path="/expiery" element={<Expiery />} />
          <Route path="/medicine" element={<Medicine />} />
          <Route path="/illnesses" element={<Illnesses />} />
          <Route path="/Quantity" element={<Quantity />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
