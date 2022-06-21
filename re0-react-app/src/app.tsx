import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BasicLayout from "./layouts/BasicLayout";
import Blog from "./pages/Blog";
import "./app.less";

const app = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BasicLayout />}>
          <Route path="/blog" element={<Blog />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default app;
