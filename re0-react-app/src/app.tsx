import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BasicLayout from "./layouts/BasicLayout";

const app = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BasicLayout />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default app;
