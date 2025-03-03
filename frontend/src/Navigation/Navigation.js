import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TodoPage from "../Todo/TotoPage";
import NotFound from "../NotFound/NotFound";
import Auth from "../Auth/Auth";
import Registration from "../Registration/Registration";

const Navigation = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/tasks" element={<TodoPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default Navigation;
