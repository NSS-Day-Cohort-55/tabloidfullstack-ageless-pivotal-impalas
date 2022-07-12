import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import { PostList } from "./Post/PostList";
import { AllCategoriesList } from "./Category/AllCategoriesList";

export default function ApplicationViews({ isLoggedIn }) {
  return (
    <main>
      <Routes>
        <Route path="/">
          <Route
            index
            element={isLoggedIn ? <Hello /> : <Navigate to="/login" />}
          />
          <Route path="posts">
            <Route index element={<PostList />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<p>Whoops, nothing here...</p>} />
          <Route path="categories" element={<AllCategoriesList/>}></Route>
        </Route>
      </Routes>
    </main >
  );
};
